import { useState, useCallback } from "react";

const useBoolean = () => {
  const [isOpen, setOpen] = useState(false);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
};

export default useBoolean;
