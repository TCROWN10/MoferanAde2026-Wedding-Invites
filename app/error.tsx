"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const message =
    error?.message && error.message !== "[object Event]"
      ? error.message
      : "Something went wrong. Please refresh the page.";

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <p className="text-lg font-semibold text-foreground">Something went wrong</p>
      <p className="max-w-md text-sm text-text-muted">{message}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-full border border-[#046c4e] bg-[#f7e7ce] px-6 py-2 text-sm font-semibold text-foreground hover:bg-[#efd9b0]"
      >
        Try again
      </button>
    </div>
  );
}
