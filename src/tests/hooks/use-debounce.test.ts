import { useDebounce } from "@/hooks/use-debounce";
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("should debounce value updates", () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: "initial", delay: 500 },
    });

    rerender({ value: "updated", delay: 500 });
    expect(result.current).toBe("initial");
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe("updated");
  });

  it("should handle multiple rapid updates", () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: "initial", delay: 500 },
    });

    rerender({ value: "update1", delay: 500 });
    rerender({ value: "update2", delay: 500 });
    rerender({ value: "update3", delay: 500 });
    expect(result.current).toBe("initial");
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("update3");
  });

  it("should cleanup timeout on unmount", () => {
    const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");
    const { unmount } = renderHook(() => useDebounce("test", 500));

    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it("should handle different delay values", () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: "initial", delay: 1000 },
    });

    rerender({ value: "updated", delay: 2000 });

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe("updated");
  });
});
