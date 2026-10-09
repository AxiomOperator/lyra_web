import { useEffect } from "react";

/** The page's title and description (for tabs, shares and search). */
export function usePage(title: string, description: string) {
  useEffect(() => {
    document.title = title === "lyra" ? "lyra · your own AI assistant, on your own hardware" : `${title} · lyra`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
}
