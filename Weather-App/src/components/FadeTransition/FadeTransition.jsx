import { AnimatePresence, easeInOut, motion } from "motion/react";

export const FadeTransition = ({ children, uniqueKey }) => {
    return (
        <AnimatePresence mode='wait'>
            <motion.div
                key={uniqueKey}
                transition={{
                    duration: 0.3,
                    ease: easeInOut,
                }}

                initial={{
                    opacity: 0,

                }}

                animate={{
                    opacity: 1,
                }}

                exit={{
                    opacity: 0,
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}