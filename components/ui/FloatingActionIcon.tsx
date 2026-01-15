"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "./modal";
import { AnimatePresence, motion } from "framer-motion";
 
import ContactForm from "./ContactForm";
 

const ICON_SIZE = 64;
const GLOW_COLOR = "rgba(66,133,244,0.6)";

const FloatingActionIcon: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  

  const handleClick = () => {
    setShowModal(true);
    console.log("Floating icon clicked! Execute custom function.");
  };
  

  

  
  
  

  

  
  

  return (
    <>
      <div className="fixed bottom-0 right-0 z-50" style={{ marginBottom: 40, marginRight: 20 }}>
        <div className="relative">
          <motion.button
            type="button"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            onClick={handleClick}
            className="relative cursor-pointer rounded-full shadow-lg outline-none focus:ring-2 focus:ring-dark/20"
            aria-label="Submit an inquiry"
            aria-describedby="fab-tip"
            title="Submit an inquiry"
            initial={false}
            animate={mounted ? { y: [0, -6, 0] } : undefined}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.08 }}
          >
            {mounted && (
              <>
                <motion.span
                  aria-hidden="true"
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    top: -10,
                    left: -10,
                    width: ICON_SIZE + 20,
                    height: ICON_SIZE + 20,
                    zIndex: -1,
                    background:
                      "radial-gradient(closest-side, rgba(66,133,244,0.35), transparent 70%)",
                    filter: "blur(14px)",
                  }}
                  initial={false}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.85, 0.4, 0.85] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.span
                  aria-hidden="true"
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    top: -2,
                    left: -2,
                    width: ICON_SIZE + 4,
                    height: ICON_SIZE + 4,
                    zIndex: -2,
                    boxShadow: `0 0 18px ${GLOW_COLOR}, 0 0 35px rgba(66,133,244,0.45)`,
                    borderRadius: "50%",
                  }}
                  initial={false}
                  animate={{
                    boxShadow: [
                      `0 0 14px ${GLOW_COLOR}, 0 0 28px rgba(66,133,244,0.35)`,
                      `0 0 22px ${GLOW_COLOR}, 0 0 44px rgba(66,133,244,0.55)`,
                      `0 0 14px ${GLOW_COLOR}, 0 0 28px rgba(66,133,244,0.35)`,
                    ],
                  }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                />
              </>
            )}
            <Image
              src="/platform.png"
              alt="Custom Floating Action Icon"
              width={ICON_SIZE}
              height={ICON_SIZE}
              className="rounded-full"
            />
          </motion.button>

          <AnimatePresence initial={false}>
            {hovered && (
              <motion.div
                id="fab-tip"
                role="tooltip"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.15 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-dark text-white text-xs px-3 py-1.5 rounded-md shadow-lg pointer-events-none"
              >
                Submit an inquiry
                <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-dark" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Submit an Inquiry"
      >
        <AnimatePresence>
          <div>
            <ContactForm variant="modal" context="fab_modal" />
          </div>
        </AnimatePresence>
      </Modal>
    </>
  );
};

export default FloatingActionIcon;
