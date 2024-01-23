"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  useEffect(() => {
    if (dialogRef.current?.open) {
      document.body.classList.add("overflow-y-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-y-hidden");
    };
  }, [dialogRef.current?.open]);

  function onDismiss() {
    router.back();
  }

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onDismiss();
    }
  };

  return createPortal(
    <div
      onClick={handleOutsideClick}
      className="absolute top-0 right-0 left-0 bottom-0 bg-[rgba(0, 0, 0, 0.7)] z-50"
    >
      <dialog
        ref={dialogRef}
        onClose={onDismiss}
        className="rounded-lg fixed bg-white outline-none"
      >
        {children}
      </dialog>
    </div>,
    document.getElementById("modal-root")!
  );
}
