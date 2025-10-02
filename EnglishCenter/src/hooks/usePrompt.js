import { useCallback } from "react";
import { useBlocker } from "./useBlocker";

export function usePrompt(message, when = true) {
  const blocker = useCallback(
    (tx) => {
      if (window.confirm(message)) {
        tx.retry();
      }
      // Nếu không, không làm gì, navigation sẽ bị chặn
    },
    [message]
  );

  useBlocker(blocker, when);
}
