import { loadFromStorage, saveToStorage, upvoteReducer } from "@/stores/upvote/reducer";
import type { UpvoteAction, UpvoteState } from "@/stores/upvote/types";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("upvoteReducer", () => {
  let initialState: UpvoteState;

  beforeEach(() => {
    initialState = {
      lists: [
        { id: "1", isSelected: false, upvotes: [{ id: "u1" }, { id: "u2" }] },
        { id: "2", isSelected: true, upvotes: [{ id: "u3" }] },
      ],
    };
  });

  describe("TOGGLE_LIST", () => {
    it("should toggle list selection", () => {
      const action: UpvoteAction = { type: "TOGGLE_LIST", payload: { listId: "1" } };
      const newState = upvoteReducer(initialState, action);

      expect(newState.lists[0].isSelected).toBe(true);
      expect(newState.lists[1].isSelected).toBe(true);
    });

    it("should not change any selection if listId is null", () => {
      const action = { type: "TOGGLE_LIST", payload: { listId: null } } as unknown as UpvoteAction;
      const newState = upvoteReducer(initialState, action);

      expect(newState.lists[0].isSelected).toBe(false);
      expect(newState.lists[1].isSelected).toBe(true);
    });

    it("should not change any selection if listId is undefined", () => {
      const action = { type: "TOGGLE_LIST", payload: {} } as unknown as UpvoteAction;
      const newState = upvoteReducer(initialState, action);

      expect(newState.lists[0].isSelected).toBe(false);
      expect(newState.lists[1].isSelected).toBe(true);
    });

    it("should not change any selection if listId does not exist", () => {
      const action: UpvoteAction = { type: "TOGGLE_LIST", payload: { listId: "999" } };
      const newState = upvoteReducer(initialState, action);

      expect(newState.lists[0].isSelected).toBe(false);
      expect(newState.lists[1].isSelected).toBe(true);
    });
  });

  describe("ADD_UPVOTE", () => {
    it("should add upvote to specified list", () => {
      const action: UpvoteAction = { type: "ADD_UPVOTE", payload: { listId: "1" } };
      const newState = upvoteReducer(initialState, action);

      expect(newState.lists[0].upvotes).toHaveLength(3);
      expect(newState.lists[1].upvotes).toHaveLength(1);
    });

    it("should not add upvote if listId is null", () => {
      const action = { type: "ADD_UPVOTE", payload: { listId: null } } as unknown as UpvoteAction;
      const newState = upvoteReducer(initialState, action);

      expect(newState.lists[0].upvotes).toHaveLength(2);
      expect(newState.lists[1].upvotes).toHaveLength(1);
    });

    it("should not add upvote if listId is undefined", () => {
      const action = { type: "ADD_UPVOTE", payload: {} } as unknown as UpvoteAction;
      const newState = upvoteReducer(initialState, action);

      expect(newState.lists[0].upvotes).toHaveLength(2);
      expect(newState.lists[1].upvotes).toHaveLength(1);
    });

    it("should not add upvote if listId does not exist", () => {
      const action: UpvoteAction = { type: "ADD_UPVOTE", payload: { listId: "999" } };
      const newState = upvoteReducer(initialState, action);

      expect(newState.lists[0].upvotes).toHaveLength(2);
      expect(newState.lists[1].upvotes).toHaveLength(1);
    });
  });

  describe("CREATE_LIST", () => {
    it("should create new list with provided id", () => {
      const action: UpvoteAction = { type: "CREATE_LIST", payload: { listId: "new-list" } };
      const newState = upvoteReducer(initialState, action);

      expect(newState.lists).toHaveLength(3);
      expect(newState.lists[2]).toEqual({
        id: "new-list",
        isSelected: false,
        upvotes: [],
      });
    });

    it("should create new list with generated id if not provided", () => {
      const action: UpvoteAction = { type: "CREATE_LIST", payload: {} };
      const newState = upvoteReducer(initialState, action);

      expect(newState.lists).toHaveLength(3);
      expect(newState.lists[2].id).toBeDefined();
      expect(newState.lists[2].upvotes).toHaveLength(0);
    });

    it("should create new list with id null if listId is null", () => {
      const action = { type: "CREATE_LIST", payload: { listId: null } } as unknown as UpvoteAction;
      const newState = upvoteReducer(initialState, action);

      expect(newState.lists).toHaveLength(3);
      expect(newState.lists[2].id).toBeNull();
    });

    it("should create new list with empty id if listId is empty string", () => {
      const action = { type: "CREATE_LIST", payload: { listId: "" } } as unknown as UpvoteAction;
      const newState = upvoteReducer(initialState, action);

      expect(newState.lists).toHaveLength(3);
      expect(newState.lists[2].id).toBe("");
    });

    it("should allow duplicate list ids when listId already exists", () => {
      const action: UpvoteAction = { type: "CREATE_LIST", payload: { listId: "1" } };
      const newState = upvoteReducer(initialState, action);

      expect(newState.lists).toHaveLength(3);
      const duplicateLists = newState.lists.filter((list) => list.id === "1");
      expect(duplicateLists).toHaveLength(2);
    });
  });

  describe("LOAD_FROM_STORAGE", () => {
    it("should load state from storage", () => {
      const newData: UpvoteState = {
        lists: [{ id: "loaded", isSelected: true, upvotes: [] }],
      };
      const action: UpvoteAction = { type: "LOAD_FROM_STORAGE", payload: { data: newData } };
      const newState = upvoteReducer(initialState, action);

      expect(newState).toEqual(newData);
    });
  });

  describe("RESET_ALL", () => {
    it("should reset to default state", () => {
      const action: UpvoteAction = { type: "RESET_ALL" };
      const newState = upvoteReducer(initialState, action);

      expect(newState.lists).toHaveLength(3);
      expect(newState.lists[1].isSelected).toBe(true);
    });
  });
});

describe("Storage functions", () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, "getItem");
    vi.spyOn(Storage.prototype, "setItem");
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("loadFromStorage", () => {
    it("should return default state when storage is empty", () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      const state = loadFromStorage();

      expect(state.lists).toHaveLength(3);
      expect(state.lists[1].isSelected).toBe(true);
    });

    it("should return default state when storage has invalid data", () => {
      vi.mocked(localStorage.getItem).mockReturnValue("invalid-json");
      const state = loadFromStorage();

      expect(state.lists).toHaveLength(0);
    });

    it("should return stored state when valid", () => {
      const validState = {
        lists: [{ id: "1", isSelected: true, upvotes: [] }],
      };
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(validState));
      const state = loadFromStorage();

      expect(state).toEqual(validState);
    });
  });

  describe("saveToStorage", () => {
    it("should save state to storage", () => {
      const state: UpvoteState = {
        lists: [{ id: "1", isSelected: true, upvotes: [] }],
      };
      saveToStorage(state);

      expect(localStorage.setItem).toHaveBeenCalledWith("upvote-lists", JSON.stringify(state));
    });

    it("should handle storage errors", () => {
      vi.mocked(localStorage.setItem).mockImplementation(() => {
        throw new Error("Storage error");
      });

      const state: UpvoteState = {
        lists: [{ id: "1", isSelected: true, upvotes: [] }],
      };
      saveToStorage(state);

      expect(console.error).toHaveBeenCalled();
    });
  });
});
