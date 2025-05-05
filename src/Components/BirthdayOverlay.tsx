"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConfettiAnimation from "./ConfettiAnimation";

const BirthdayOverlay = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <ConfettiAnimation />
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-6xl font-bold text-white italic"
            >
              Happy Birthday Fatini🩶
            </motion.h1>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BirthdayOverlay; 