export type Upvote = {
  id: string;
};

export type UpvoteList = {
  id: string;
  isSelected: boolean;
  upvotes: Upvote[];
};

export type UpvoteState = {
  lists: UpvoteList[];
};

export type UpvoteAction =
  | { type: "TOGGLE_LIST"; payload: { listId: string } }
  | { type: "ADD_UPVOTE"; payload: { listId: string } }
  | { type: "CREATE_LIST"; payload: { listId?: string } }
  | { type: "LOAD_FROM_STORAGE"; payload: { data: UpvoteState } }
  | { type: "RESET_ALL" };

export type UpvoteProviderProps = {
  children: React.ReactNode;
  reducer?: (state: UpvoteState, action: UpvoteAction) => UpvoteState;
};

export interface UpvoteContextValue {
  state: UpvoteState;
  dispatch: React.Dispatch<UpvoteAction>;
  toggleList: (listId: string) => void;
  addUpvote: (listId: string) => void;
  createList: () => string;
  search: string;
  setSearch: (search: string) => void;
  filteredLists: UpvoteList[];
}
