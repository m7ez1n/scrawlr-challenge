import { uuid } from "@/lib/uuid";
import type { UpvoteAction, UpvoteList, UpvoteState } from "./types";

const STORAGE_KEY = "upvote-lists";

function createDefaultState(): UpvoteList[] {
  return [
    { id: uuid(), isSelected: false, upvotes: [{ id: uuid() }, { id: uuid() }, { id: uuid() }] },
    { id: uuid(), isSelected: true, upvotes: [{ id: uuid() }, { id: uuid() }] },
    {
      id: uuid(),
      isSelected: false,
      upvotes: [{ id: uuid() }, { id: uuid() }, { id: uuid() }, { id: uuid() }, { id: uuid() }],
    },
  ];
}

function validateState(state: unknown): state is UpvoteState {
  if (!state || typeof state !== "object") {
    return false;
  }

  if (!("lists" in state) || !Array.isArray((state as UpvoteState).lists)) {
    return false;
  }

  const lists = (state as UpvoteState).lists;
  return lists.every(
    (list) =>
      typeof list === "object" &&
      typeof list.id === "string" &&
      typeof list.isSelected === "boolean" &&
      Array.isArray(list.upvotes) &&
      list.upvotes.every((upvote) => typeof upvote === "object" && typeof upvote.id === "string"),
  );
}

export function loadFromStorage(): UpvoteState {
  try {
    if (typeof localStorage === "undefined") {
      return { lists: createDefaultState() };
    }

    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return { lists: createDefaultState() };
    }

    const parsed = JSON.parse(stored);

    if (!validateState(parsed)) {
      return { lists: createDefaultState() };
    }

    return parsed;
  } catch {
    return { lists: [] };
  }
}

export function saveToStorage(state: UpvoteState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save upvote state:", error);
  }
}

export function upvoteReducer(state: UpvoteState, action: UpvoteAction): UpvoteState {
  switch (action.type) {
    case "TOGGLE_LIST": {
      const { listId } = action.payload;

      return {
        ...state,
        lists: state.lists.map((list) => (list.id === listId ? { ...list, isSelected: !list.isSelected } : list)),
      };
    }

    case "ADD_UPVOTE": {
      const { listId } = action.payload;

      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === listId ? { ...list, upvotes: [...list.upvotes, { id: uuid() }] } : list,
        ),
      };
    }

    case "CREATE_LIST": {
      const { listId = uuid() } = action.payload;

      return {
        ...state,
        lists: [...state.lists, { id: listId, isSelected: false, upvotes: [] }],
      };
    }

    case "LOAD_FROM_STORAGE": {
      return action.payload.data;
    }

    case "RESET_ALL": {
      return { lists: createDefaultState() };
    }

    default:
      return state;
  }
}
