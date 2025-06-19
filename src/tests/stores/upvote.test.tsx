/** biome-ignore-all lint/style/noNonNullAssertion: <to execute the tests> */
import { UpvoteProvider, useUpvotes } from "@/stores/upvote";
import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/hooks/use-debounce", () => ({
  useDebounce: (value: string) => value,
}));

const mockLocalStorage = {
  store: {} as Record<string, string>,
  getItem: (key: string) => mockLocalStorage.store[key] || null,
  setItem: (key: string, value: string) => {
    mockLocalStorage.store[key] = value;
  },
  clear: () => {
    mockLocalStorage.store = {};
  },
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

function Wrapper({ children }: { children: ReactNode }) {
  return <UpvoteProvider>{children}</UpvoteProvider>;
}

describe("Upvote Context", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    vi.clearAllMocks();
  });

  describe("Initialization", () => {
    it("should initialize with default lists from storage", () => {
      const { result } = renderHook(() => useUpvotes(), { wrapper: Wrapper });

      expect(result.current.state.lists).toHaveLength(3);
      expect(result.current.filteredLists).toHaveLength(3);
      expect(result.current.search).toBe("");
    });

    it("should throw error when useUpvotes is used outside provider", () => {
      const consoleSpy = vi.spyOn(console, "error");
      consoleSpy.mockImplementation(() => {});

      expect(() => {
        renderHook(() => useUpvotes());
      }).toThrow("useUpvotes must be used within UpvoteProvider");

      consoleSpy.mockRestore();
    });
  });

  describe("List Management", () => {
    it("should create a new list", () => {
      const { result } = renderHook(() => useUpvotes(), { wrapper: Wrapper });

      const initialCount = result.current.state.lists.length;

      act(() => {
        result.current.createList();
      });

      expect(result.current.state.lists).toHaveLength(initialCount + 1);
      expect(result.current.filteredLists).toHaveLength(initialCount + 1);
    });

    it("should toggle list selection status", () => {
      const { result } = renderHook(() => useUpvotes(), { wrapper: Wrapper });

      const firstList = result.current.state.lists[0];
      const initialStatus = firstList.isSelected;

      act(() => {
        result.current.toggleList(firstList.id);
      });

      expect(result.current.state.lists[0].isSelected).toBe(!initialStatus);
    });

    it("should add upvote to a list", () => {
      const { result } = renderHook(() => useUpvotes(), { wrapper: Wrapper });

      const firstList = result.current.state.lists[0];
      const initialUpvotes = firstList.upvotes.length;

      act(() => {
        result.current.addUpvote(firstList.id);
      });

      expect(result.current.state.lists[0].upvotes).toHaveLength(initialUpvotes + 1);
    });
  });

  describe("Search Functionality", () => {
    it("should update search value", () => {
      const { result } = renderHook(() => useUpvotes(), { wrapper: Wrapper });

      act(() => {
        result.current.setSearch("test search");
      });

      expect(result.current.search).toBe("test search");
    });

    it("should filter lists based on search", () => {
      const { result } = renderHook(() => useUpvotes(), { wrapper: Wrapper });

      act(() => {
        result.current.createList();
      });

      const allLists = result.current.state.lists;
      const lastCreatedId = allLists[allLists.length - 1].id;

      act(() => {
        result.current.setSearch(lastCreatedId);
      });

      expect(result.current.filteredLists).toHaveLength(1);
      expect(result.current.filteredLists[0].id).toBe(lastCreatedId);
    });

    it("should filter lists with partial search", () => {
      const { result } = renderHook(() => useUpvotes(), { wrapper: Wrapper });

      act(() => {
        result.current.createList();
      });

      const allLists = result.current.state.lists;
      const lastCreatedId = allLists[allLists.length - 1].id;
      const partialId = lastCreatedId.substring(0, 8);

      act(() => {
        result.current.setSearch(partialId);
      });

      expect(result.current.filteredLists).toHaveLength(1);
    });

    it("should return no results for non-existent search", () => {
      const { result } = renderHook(() => useUpvotes(), { wrapper: Wrapper });

      act(() => {
        result.current.setSearch("non-existent-id");
      });

      expect(result.current.filteredLists).toHaveLength(0);
    });

    it("should return all lists when search is empty", () => {
      const { result } = renderHook(() => useUpvotes(), { wrapper: Wrapper });

      const initialCount = result.current.filteredLists.length;

      act(() => {
        result.current.setSearch("some-search");
      });

      act(() => {
        result.current.setSearch("");
      });

      expect(result.current.filteredLists).toHaveLength(initialCount);
    });

    it("should be case insensitive", () => {
      const { result } = renderHook(() => useUpvotes(), { wrapper: Wrapper });

      act(() => {
        result.current.createList();
      });

      const allLists = result.current.state.lists;
      const lastCreatedId = allLists[allLists.length - 1].id;
      const upperCasePartial = lastCreatedId.substring(0, 8).toUpperCase();

      act(() => {
        result.current.setSearch(upperCasePartial);
      });

      expect(result.current.filteredLists).toHaveLength(1);
    });
  });

  describe("Data Persistence", () => {
    it("should persist state to localStorage when state changes", () => {
      const { result } = renderHook(() => useUpvotes(), { wrapper: Wrapper });

      act(() => {
        result.current.createList();
      });

      const savedState = mockLocalStorage.store["upvote-lists"];
      expect(savedState).toBeDefined();

      const parsedState = JSON.parse(savedState);
      expect(parsedState.lists).toHaveLength(4);
    });

    it("should load state from localStorage on initialization", () => {
      const mockState = {
        lists: [
          { id: "test-1", isSelected: false, upvotes: [] },
          { id: "test-2", isSelected: true, upvotes: [{ id: "vote-1" }] },
        ],
      };
      mockLocalStorage.setItem("upvote-lists", JSON.stringify(mockState));

      const { result } = renderHook(() => useUpvotes(), { wrapper: Wrapper });

      expect(result.current.state.lists).toHaveLength(2);
      expect(result.current.state.lists[0].isSelected).toBe(false);
      expect(result.current.state.lists[1].isSelected).toBe(true);
      expect(result.current.state.lists[1].upvotes).toHaveLength(1);
    });
  });

  describe("Integration with createList", () => {
    it("should return the created list ID", () => {
      const { result } = renderHook(() => useUpvotes(), { wrapper: Wrapper });

      let createdListId: string;

      act(() => {
        createdListId = result.current.createList();
      });

      expect(createdListId!).toBeDefined();
      expect(typeof createdListId!).toBe("string");
      expect(createdListId!.length).toBeGreaterThan(0);
    });
  });
});

describe("Upvote Context - Real Debounce", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    vi.clearAllMocks();
    vi.doUnmock("@/hooks/use-debounce");
  });

  afterEach(() => {
    vi.doMock("@/hooks/use-debounce", () => ({
      useDebounce: (value: string) => value,
    }));
  });

  it("should handle debounced search", async () => {
    const { result } = renderHook(() => useUpvotes(), { wrapper: Wrapper });

    act(() => {
      result.current.createList();
    });

    const allLists = result.current.state.lists;
    const lastCreatedId = allLists[allLists.length - 1].id;

    act(() => {
      result.current.setSearch(lastCreatedId);
    });

    await waitFor(
      () => {
        expect(result.current.filteredLists).toHaveLength(1);
      },
      { timeout: 500 },
    );
  });
});
