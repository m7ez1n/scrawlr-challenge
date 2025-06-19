import { useDebounce } from "@/hooks/use-debounce";
import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { loadFromStorage, saveToStorage, upvoteReducer } from "./reducer";
import type { UpvoteContextValue, UpvoteProviderProps } from "./types";

const UpvoteContext = createContext<UpvoteContextValue | null>(null);

export function UpvoteProvider({ children, reducer = upvoteReducer }: UpvoteProviderProps) {
  const [state, dispatch] = useReducer(reducer, undefined, loadFromStorage);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  function toggleList(listId: string) {
    dispatch({ type: "TOGGLE_LIST", payload: { listId } });
  }

  function addUpvote(listId: string) {
    dispatch({ type: "ADD_UPVOTE", payload: { listId } });
  }

  function createList() {
    const listId = crypto.randomUUID();
    dispatch({ type: "CREATE_LIST", payload: { listId } });

    return listId;
  }

  const filteredLists = useMemo(() => {
    if (!debouncedSearch) {
      return state.lists;
    }

    const searchLower = debouncedSearch.toLowerCase();
    return state.lists.filter((list) => list.id.toLowerCase().includes(searchLower));
  }, [state.lists, debouncedSearch]);

  const value: UpvoteContextValue = {
    state,
    dispatch,
    toggleList,
    addUpvote,
    createList,
    search,
    setSearch,
    filteredLists,
  };

  return <UpvoteContext.Provider value={value}>{children}</UpvoteContext.Provider>;
}

export function useUpvotes() {
  const context = useContext(UpvoteContext);

  if (!context) {
    throw new Error("useUpvotes must be used within UpvoteProvider");
  }

  return context;
}
