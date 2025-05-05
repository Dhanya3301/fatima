"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface UnrollingLetterProps {
  className?: string
}

export function UnrollingLetter2({ className }: UnrollingLetterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleLetter = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={cn("relative w-full max-w-md mx-auto", className)}>
      <div
        className="relative cursor-pointer perspective-1000"
        onClick={toggleLetter}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggleLetter()
          }
        }}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close letter" : "Open letter"}
      >
        {/* The scroll container */}
        <div
          className={cn(
            "relative transition-all duration-1000 ease-out",
            isOpen ? "h-auto min-h-[400px]" : "h-[150px]",
          )}
        >
          {/* Top roll */}
          <motion.div
            className="absolute top-0 left-0 w-full h-16 bg-amber-100 rounded-t-lg border-2 border-amber-200 shadow-md z-20 origin-bottom"
            initial={false}
            animate={{
              rotateX: isOpen ? -180 : 0,
              y: isOpen ? -16 : 0,
              opacity: isOpen ? 0 : 1,
              scale: isOpen ? 0.9 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 20,
            }}
          >
            {/* Wax seal on top roll */}
            <motion.div
              className="absolute top-3/4 z-40 left-1/2 transform -translate-x-1/2 -translate-y-1/4"
              animate={{
                scale: isOpen ? 0.8 : 1,
                opacity: isOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-md">
                <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center text-amber-100 font-serif text-xs">
                  Seal
                </div>
              </div>
            </motion.div>

            {/* Roll details */}
            <div className="absolute top-0 left-0 w-full h-4 bg-amber-200/50 rounded-t-lg"></div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-amber-800/10"></div>
          </motion.div>

          {/* Bottom roll */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-16 bg-amber-100 rounded-b-lg border-2 border-amber-200 shadow-md z-20 origin-top"
            initial={false}
            animate={{
              rotateX: isOpen ? 180 : 0,
              y: isOpen ? 16 : 0,
              opacity: isOpen ? 0 : 1,
              scale: isOpen ? 0.9 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 20,
            }}
          >
            {/* Roll details */}
            <div className="absolute bottom-0 left-0 w-full h-4 bg-amber-200/50 rounded-b-lg"></div>
            <div className="absolute top-0 left-0 w-full h-2 bg-amber-800/10"></div>
          </motion.div>

          {/* Middle section (the actual letter) */}
          <motion.div
            className={cn(
              "relative bg-amber-100 rounded-lg border-2 border-amber-200 shadow-lg z-10",
              "overflow-hidden",
            )}
            initial={false}
            animate={{
              height: isOpen ? "auto" : "118px",
              opacity: 1,
            }}
            transition={{
              height: {
                type: "spring",
                stiffness: 70,
                damping: 20,
                delay: isOpen ? 0.2 : 0,
              },
            }}
          >
            {/* Paper texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-50/30 to-amber-200/30 pointer-events-none"></div>

            {/* Letter content with staggered reveal */}
            <motion.div
              className="p-6 pt-20 pb-20 text-amber-900 font-serif relative"
              initial={false}
              animate={{
                opacity: isOpen ? 1 : 0,
              }}
              transition={{
                opacity: {
                  duration: 0.5,
                  delay: isOpen ? 0.4 : 0,
                },
              }}
            >
              
                <motion.p
                  
                  className="mb-3 last:mb-0 p-[20px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    y: isOpen ? 0 : 20,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: isOpen ? 0.5 * 0.1 : 0,
                  }}
                >
                  My Fatini, <br /> <br />

Happy Birthday, my love. <br /><br />

On this special day, I want to wrap you in words I&apos;ve been holding quietly in my heart. Thank you—for your laughter that made ordinary days shine, for your patience that softened my storms, and for the way you loved me without ever needing to try. You became my safest space, my home, and my favorite person. <br /><br />

Being with you has been the most beautiful chapter of my life. Even as we stand at the edge of what can&apos;t be changed, I want you to know this: I am endlessly grateful for you. <br /><br />

I wish I could give you a forever, but even if we can&apos;t walk the same road ahead, know that you&apos;ll always be a part of me. You made me better, kinder, more alive. <br /><br />

So today, I celebrate you. The amazing soul you are, the light you bring to everyone. <br /><br />

Happy Birthday, Teni. <br /> <br />
This isn&apos;t goodbye—it&apos;s just a quiet thank you, whispered with all the love I have.
Wherever life takes you, may it be kind. You deserve nothing less. <br /> <br />

“Some souls meet, not to walk together, but to show each other what love feels like—before life asks them to let go.” <br /><br />

Always yours, <br />
Devam
                </motion.p>
              
            </motion.div>

            {/* Curl shadows when closed */}
            <motion.div
              className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-amber-800/20 to-transparent pointer-events-none"
              animate={{ opacity: isOpen ? 0 : 0.7 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-amber-800/20 to-transparent pointer-events-none"
              animate={{ opacity: isOpen ? 0 : 0.7 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
