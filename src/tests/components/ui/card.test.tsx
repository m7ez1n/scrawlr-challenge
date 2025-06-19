import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/components/card";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Card Components", () => {
  describe("Card", () => {
    it("renders with default props", () => {
      render(<Card>Card Content</Card>);
      const card = screen.getByText("Card Content");
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass("bg-card", "rounded-xl", "border");
    });

    it("applies custom className", () => {
      render(<Card className="custom-class">Custom Card</Card>);
      expect(screen.getByText("Custom Card")).toHaveClass("custom-class");
    });
  });

  describe("CardHeader", () => {
    it("renders with default props", () => {
      render(
        <Card>
          <CardHeader>Header Content</CardHeader>
        </Card>,
      );
      const header = screen.getByText("Header Content");
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass("px-6");
    });

    it("applies custom className", () => {
      render(
        <Card>
          <CardHeader className="custom-header">Custom Header</CardHeader>
        </Card>,
      );
      expect(screen.getByText("Custom Header")).toHaveClass("custom-header");
    });
  });

  describe("CardTitle", () => {
    it("renders with default props", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
        </Card>,
      );
      const title = screen.getByText("Card Title");
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass("font-semibold");
    });

    it("applies custom className", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle className="custom-title">Custom Title</CardTitle>
          </CardHeader>
        </Card>,
      );
      expect(screen.getByText("Custom Title")).toHaveClass("custom-title");
    });
  });

  describe("CardDescription", () => {
    it("renders with default props", () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
        </Card>,
      );
      const description = screen.getByText("Card Description");
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass("text-muted-foreground", "text-sm");
    });

    it("applies custom className", () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription className="custom-desc">Custom Description</CardDescription>
          </CardHeader>
        </Card>,
      );
      expect(screen.getByText("Custom Description")).toHaveClass("custom-desc");
    });
  });

  describe("CardContent", () => {
    it("renders with default props", () => {
      render(
        <Card>
          <CardContent>Card Content</CardContent>
        </Card>,
      );
      const content = screen.getByText("Card Content");
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass("px-6");
    });

    it("applies custom className", () => {
      render(
        <Card>
          <CardContent className="custom-content">Custom Content</CardContent>
        </Card>,
      );
      expect(screen.getByText("Custom Content")).toHaveClass("custom-content");
    });
  });

  it("renders complete card structure", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test Content</CardContent>
      </Card>,
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
