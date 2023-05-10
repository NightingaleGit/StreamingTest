import React, { useEffect, useRef, MutableRefObject } from "react";
import { createPortal } from "react-dom";
import { WithChildrenProps } from "../types/WithChildrenProps";

const Modal: React.FC<WithChildrenProps> = (props: WithChildrenProps) => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (!modalRoot || !elRef.current) {
      return;
    }
    modalRoot.appendChild(elRef.current);
    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(
    <div
      className="
        fixed
        inset-0
        z-10 
        flex 
        items-center
        justify-center
        bg-black
        empty:hidden"
    >
      <div
        className="min-h-[400px]
          min-w-[400px]
          max-w-lg
          rounded-3xl
          bg-white
          text-center"
      >
        {props.children}
      </div>
    </div>,
    elRef.current
  );
};

export default Modal;
