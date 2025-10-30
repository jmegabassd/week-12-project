"use client"

import { motion, Variants } from "motion/react"
import motioncss from "@/styles/motion.module.css";

export default function MotionPage() {
    const dotVariants = {
        pulse: {
            scale: [1, 1.5, 1],
            transition: {
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    }

    return (
        <motion.div
            animate="pulse"
            transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
            className={motioncss.container}
        >
            <motion.div className={motioncss.dot} variants={dotVariants} />
            <motion.div className={motioncss.dot} variants={dotVariants} />
            <motion.div className={motioncss.dot} variants={dotVariants} />
        </motion.div>
    )
}