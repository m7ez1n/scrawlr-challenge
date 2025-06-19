import { Input } from "@/ui/components/input";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Input", () => {
  it("renders with default props", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("bg-background", "border-border", "rounded-md");
  });

  it("applies custom className", () => {
    render(<Input className="custom-class" placeholder="Custom input" />);
    expect(screen.getByPlaceholderText("Custom input")).toHaveClass("custom-class");
  });

  it("handles different input types", () => {
    const { rerender } = render(<Input type="text" placeholder="Text input" />);
    expect(screen.getByPlaceholderText("Text input")).toHaveAttribute("type", "text");

    rerender(<Input type="email" placeholder="Email input" />);
    expect(screen.getByPlaceholderText("Email input")).toHaveAttribute("type", "email");

    rerender(<Input type="password" placeholder="Password input" />);
    expect(screen.getByPlaceholderText("Password input")).toHaveAttribute("type", "password");
  });

  it("handles disabled state", () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText("Disabled input");
    expect(input).toBeDisabled();
    expect(input).toHaveClass("disabled:opacity-50", "disabled:cursor-not-allowed");
  });

  it("handles aria-invalid state", () => {
    render(<Input aria-invalid="true" placeholder="Invalid input" />);
    const input = screen.getByPlaceholderText("Invalid input");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveClass("aria-invalid:border-destructive");
  });

  it("forwards additional props", () => {
    render(<Input data-testid="test-input" name="test" required placeholder="Test input" />);
    const input = screen.getByTestId("test-input");
    expect(input).toHaveAttribute("name", "test");
    expect(input).toHaveAttribute("required");
  });

  it("handles focus styles", () => {
    render(<Input placeholder="Focus test" />);
    const input = screen.getByPlaceholderText("Focus test");
    expect(input).toHaveClass("focus-visible:border-accent-foreground", "focus-visible:ring-accent-foreground/50");
  });
});
