"use client";

import React, { useState, useRef, useEffect } from "react";
import Modal from "./modal";

interface CalendlyModalWrapperProps {
  children: React.ReactNode;
  calendlyUrl?: string;
  title?: string;
}

const DEFAULT_CALENDLY_URL = "https://calendly.com/p01consulting/30min";

const CalendlyModalWrapper: React.FC<CalendlyModalWrapperProps> = ({
  children,
  calendlyUrl = DEFAULT_CALENDLY_URL,
  title = "Talk to an expert",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    // Inject Calendly script only when modal is open
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [isOpen]);

  return (
    <>
      <span
        style={{ display: "inline-block", cursor: "pointer" }}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        {children}
      </span>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
        <div
          ref={widgetRef}
          className="calendly-inline-widget"
          data-url={calendlyUrl}
          style={{ minWidth: 320, height: 700 }}
        />
      </Modal>
    </>
  );
};

export default CalendlyModalWrapper;
