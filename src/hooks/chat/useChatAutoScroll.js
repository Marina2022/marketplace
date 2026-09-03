import {useEffect} from "react";

export const useChatAutoScroll = (containerRef, deps = []) => {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      const distanceFromBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight;

      console.log("distanceFromBottom = ", distanceFromBottom)

      const isAtBottom = distanceFromBottom < 80;

      if (isAtBottom) {
        el.scrollTop = el.scrollHeight;
      }
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, deps);
};