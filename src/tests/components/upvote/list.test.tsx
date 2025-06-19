import { useUpvotes } from "@/stores/upvote";
import type { UpvoteList as UpvoteListType } from "@/stores/upvote/types";
import { UpvoteList } from "@/ui/components/upvote/list";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/stores/upvote", () => ({
  useUpvotes: vi.fn(),
}));

describe("UpvoteList", () => {
  const mockToggleList = vi.fn();
  const mockAddUpvote = vi.fn();
  const mockCreateList = vi.fn();
  const mockDispatch = vi.fn();
  const mockSetSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockUpvoteContext = (filteredLists: UpvoteListType[]) => ({
    filteredLists,
    toggleList: mockToggleList,
    addUpvote: mockAddUpvote,
    createList: mockCreateList,
    dispatch: mockDispatch,
    state: { lists: filteredLists },
    search: "",
    setSearch: mockSetSearch,
  });

  it("renders empty state when no lists are available", () => {
    vi.mocked(useUpvotes).mockReturnValue(mockUpvoteContext([]));

    render(<UpvoteList />);

    expect(screen.getByText("No lists found")).toBeInTheDocument();
    expect(
      screen.getByText("Try adjusting your search or filter to find what you're looking for."),
    ).toBeInTheDocument();
  });

  it("renders list with upvotes", () => {
    const mockLists = [
      {
        id: "1",
        isSelected: false,
        upvotes: [{ id: "1" }, { id: "2" }],
      },
    ];

    vi.mocked(useUpvotes).mockReturnValue(mockUpvoteContext(mockLists));

    render(<UpvoteList />);

    expect(screen.getByText("Upvotes list")).toBeInTheDocument();
    expect(screen.getByText(/List with id:/i)).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText(/Quantity:/i)).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders empty upvotes message when list has no upvotes", () => {
    const mockLists = [
      {
        id: "1",
        isSelected: false,
        upvotes: [],
      },
    ];

    vi.mocked(useUpvotes).mockReturnValue(mockUpvoteContext(mockLists));

    render(<UpvoteList />);

    expect(screen.getByText("No upvotes yet")).toBeInTheDocument();
    expect(screen.getByText("Click + to add one")).toBeInTheDocument();
  });

  it("calls createList when Add list button is clicked", () => {
    const mockLists = [
      {
        id: "1",
        isSelected: false,
        upvotes: [],
      },
    ];

    vi.mocked(useUpvotes).mockReturnValue(mockUpvoteContext(mockLists));

    render(<UpvoteList />);
    fireEvent.click(screen.getByRole("button", { name: "Add list" }));
    expect(mockCreateList).toHaveBeenCalledTimes(1);
  });

  it("calls dispatch with RESET_ALL when reset button is clicked", () => {
    const mockLists = [
      {
        id: "1",
        isSelected: false,
        upvotes: [],
      },
    ];

    vi.mocked(useUpvotes).mockReturnValue(mockUpvoteContext(mockLists));

    render(<UpvoteList />);
    fireEvent.click(screen.getByRole("button", { name: "Reset all lists" }));
    expect(mockDispatch).toHaveBeenCalledWith({ type: "RESET_ALL" });
  });

  it("calls addUpvote when plus button is clicked", () => {
    const mockLists = [
      {
        id: "1",
        isSelected: false,
        upvotes: [],
      },
    ];

    vi.mocked(useUpvotes).mockReturnValue(mockUpvoteContext(mockLists));

    render(<UpvoteList />);
    fireEvent.click(screen.getByRole("button", { name: "Add upvote" }));
    expect(mockAddUpvote).toHaveBeenCalledWith("1");
  });

  it("renders multiple lists correctly", () => {
    const mockLists = [
      {
        id: "1",
        isSelected: false,
        upvotes: [{ id: "1" }],
      },
      {
        id: "2",
        isSelected: true,
        upvotes: [{ id: "2" }, { id: "3" }],
      },
    ];

    vi.mocked(useUpvotes).mockReturnValue(mockUpvoteContext(mockLists));

    render(<UpvoteList />);

    const listElements = screen.getAllByText(/List with id:/i);
    expect(listElements).toHaveLength(2);

    const quantityElements = screen.getAllByText(/Quantity:/i);
    expect(quantityElements).toHaveLength(2);

    expect(listElements[0]).toHaveTextContent("1");
    expect(listElements[1]).toHaveTextContent("2");

    expect(quantityElements[0]).toHaveTextContent("1");
    expect(quantityElements[1]).toHaveTextContent("2");
  });

  it("has correct layout classes", () => {
    const mockLists = [
      {
        id: "1",
        isSelected: false,
        upvotes: [],
      },
    ];

    vi.mocked(useUpvotes).mockReturnValue(mockUpvoteContext(mockLists));

    render(<UpvoteList />);

    const card = screen.getByText("Upvotes list").closest(".h-\\[calc\\(100vh-8rem\\)\\]");
    expect(card).toHaveClass("flex", "flex-col");

    const content = screen.getByText(/List with id:/i).closest(".flex-1");
    expect(content).toHaveClass("overflow-y-auto");
  });
});
