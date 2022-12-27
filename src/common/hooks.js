import { useRef, useEffect, useState } from "react";

export function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  return isMounted;
}

export function useToggle(initalState = false) {
  const [isOpen, setIsOpen] = useState(initalState);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  return [isOpen, toggleOpen];
}
