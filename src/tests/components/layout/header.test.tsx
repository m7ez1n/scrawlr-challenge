import { useUpvotes } from "@/stores/upvote";
import { Header } from "@/ui/layout/header";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/stores/upvote", () => ({
  useUpvotes: vi.fn(),
}));

describe("Header", () => {
  const mockSetSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockUpvoteContext = (search = "") => ({
    search,
    setSearch: mockSetSearch,
    filteredLists: [],
    toggleList: vi.fn(),
    addUpvote: vi.fn(),
    createList: vi.fn(),
    dispatch: vi.fn(),
    state: { lists: [] },
  });

  it("renders logo, search input and github link", () => {
    vi.mocked(useUpvotes).mockReturnValue(mockUpvoteContext());

    render(<Header />);

    expect(screen.getByAltText("Scrawlr Logo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search list by id")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "https://github.com/m7ez1n/scrawlr-challenge");
  });

  it("updates search value when input changes", () => {
    vi.mocked(useUpvotes).mockReturnValue(mockUpvoteContext());

    render(<Header />);

    const searchInput = screen.getByPlaceholderText("Search list by id");
    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(mockSetSearch).toHaveBeenCalledWith("test");
  });

  it("displays current search value", () => {
    vi.mocked(useUpvotes).mockReturnValue(mockUpvoteContext("current search"));

    render(<Header />);

    expect(screen.getByPlaceholderText("Search list by id")).toHaveValue("current search");
  });

  it("has correct layout classes", () => {
    vi.mocked(useUpvotes).mockReturnValue(mockUpvoteContext());

    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("p-3", "bg-white", "border-b", "border-gray-200");

    const container = header.firstChild;
    expect(container).toHaveClass(
      "container",
      "w-full",
      "max-w-4xl",
      "mx-auto",
      "flex",
      "items-center",
      "justify-between",
    );

    const searchInput = screen.getByPlaceholderText("Search list by id");
    expect(searchInput).toHaveClass("w-full", "text-secondary/70", "max-w-52", "sm:max-w-xl");
  });
});
