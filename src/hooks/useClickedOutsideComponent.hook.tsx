import { useEffect, useState } from "react";

export function useClickedOutsideComponent(ref: any) {
  const [clickedOutside, setClickedOutside] = useState(false);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        setClickedOutside(true);
      }
    }

    // Bind the event listener
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref])

  return clickedOutside;
}