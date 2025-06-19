import { UpvoteItem } from "@/ui/components/upvote/item";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("UpvoteItem", () => {
  const mockToggleList = vi.fn();

  it("renders with default state", () => {
    render(<UpvoteItem isSelected={false} toggleList={mockToggleList} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("text-secondary", "bg-secondary-foreground");
  });

  it("renders with selected state", () => {
    render(<UpvoteItem isSelected={true} toggleList={mockToggleList} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary-foreground", "text-primary");
  });

  it("calls toggleList when clicked", () => {
    render(<UpvoteItem isSelected={false} toggleList={mockToggleList} />);
    const button = screen.getByRole("button");
    button.click();
    expect(mockToggleList).toHaveBeenCalledTimes(1);
  });

  it("renders with correct icon", () => {
    render(<UpvoteItem isSelected={false} toggleList={mockToggleList} />);
    const icon = screen.getByRole("button").querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("applies hover styles", () => {
    render(<UpvoteItem isSelected={false} toggleList={mockToggleList} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("hover:bg-primary-foreground", "hover:text-primary");
  });

  it("has correct size and variant", () => {
    render(<UpvoteItem isSelected={false} toggleList={mockToggleList} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("size-7");
    expect(button).toHaveClass("border");
  });

  it("has correct default state classes", () => {
    render(<UpvoteItem isSelected={false} toggleList={mockToggleList} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-secondary", "bg-secondary-foreground");
  });

  it("has correct selected state classes", () => {
    render(<UpvoteItem isSelected={true} toggleList={mockToggleList} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary-foreground", "text-primary");
  });
});
