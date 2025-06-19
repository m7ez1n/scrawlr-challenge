import { EmptyState } from "@/ui/components/empty-state";
import { render, screen } from "@testing-library/react";
import { AlertCircle, FileText, Search } from "lucide-react";
import { describe, expect, it } from "vitest";

describe("EmptyState", () => {
  it("renders with basic props", () => {
    render(
      <EmptyState
        title="No items found"
        description="Try adjusting your search or filter to find what you're looking for."
      />,
    );

    expect(screen.getByText("No items found")).toBeInTheDocument();
    expect(
      screen.getByText("Try adjusting your search or filter to find what you're looking for."),
    ).toBeInTheDocument();
  });

  it("renders with single icon", () => {
    render(
      <EmptyState
        title="No items found"
        description="Try adjusting your search or filter to find what you're looking for."
        icons={[Search]}
      />,
    );

    const iconContainer = document.querySelector("svg");
    expect(iconContainer).toBeInTheDocument();
    expect(iconContainer).toHaveClass("w-6", "h-6", "text-muted-foreground");
  });

  it("renders with three icons", () => {
    render(
      <EmptyState
        title="No items found"
        description="Try adjusting your search or filter to find what you're looking for."
        icons={[Search, FileText, AlertCircle]}
      />,
    );

    const icons = document.querySelectorAll("svg");
    expect(icons).toHaveLength(3);

    const iconContainers = document.querySelectorAll(".bg-background.size-12");
    expect(iconContainers).toHaveLength(3);

    expect(iconContainers[0]).toHaveClass("-rotate-6", "left-2.5", "top-1.5");
    expect(iconContainers[1]).toHaveClass("z-10");
    expect(iconContainers[2]).toHaveClass("rotate-6", "right-2.5", "top-1.5");
  });

  it("applies custom className", () => {
    render(<EmptyState title="No items found" description="Description" className="custom-class" />);

    const container = screen.getByText("No items found").parentElement;
    expect(container).toHaveClass("custom-class");
  });

  it("applies hover animations", () => {
    render(<EmptyState title="No items found" description="Description" icons={[Search, FileText, AlertCircle]} />);

    const iconContainers = document.querySelectorAll(".bg-background.size-12");

    expect(iconContainers[0]).toHaveClass(
      "group-hover:-translate-x-5",
      "group-hover:-rotate-12",
      "group-hover:-translate-y-0.5",
    );

    expect(iconContainers[1]).toHaveClass("group-hover:-translate-y-0.5");

    expect(iconContainers[2]).toHaveClass(
      "group-hover:translate-x-5",
      "group-hover:rotate-12",
      "group-hover:-translate-y-0.5",
    );
  });

  it("renders with correct base styles", () => {
    render(<EmptyState title="No items found" description="Description" />);

    const container = screen.getByText("No items found").parentElement;
    expect(container).toHaveClass(
      "bg-card",
      "border-border",
      "border-2",
      "border-dashed",
      "rounded-xl",
      "p-14",
      "w-full",
    );
  });

  it("renders description with whitespace preserved", () => {
    const description = "Line 1\nLine 2";
    render(<EmptyState title="No items found" description={description} />);

    const descriptionElement = screen.getByText(/Line 1/i);
    expect(descriptionElement).toHaveClass("whitespace-pre-line");
    expect(descriptionElement.textContent).toBe(description);
  });
});
