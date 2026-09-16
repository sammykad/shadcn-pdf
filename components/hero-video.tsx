"use client"

import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import HoverVideoPlayer from "./hover-video-player"


export default function HoroVideoDemo() {
    const shouldReduceMotion = useReducedMotion()

    return (
        <div className="flex flex-col gap-12 py-12 w-full h-full items-center justify-center">
            <div className="text-center">
            </div>
            <motion.div
                animate={shouldReduceMotion ? "expanded" : "collapsed"}
                className="flex aspect-video w-full max-w-4xl items-center justify-center"
                initial={false}
                whileHover={shouldReduceMotion ? undefined : "expanded"}
            >
                <motion.div
                    variants={{
                        collapsed: { width: "50%" },
                        expanded: { width: "100%" },
                    }}
                    transition={{
                        type: "spring",
                        duration: 0.42,
                        bounce: 0,
                    }}
                    className={cn(
                        "group relative flex flex-col overflow-hidden rounded-lg transform-gpu",
                        "bg-white shadow-sm ring-1 ring-black/5",
                        "data-dark:bg-stone-800 data-dark:ring-white/15"
                    )}
                >
                    <HoverVideoPlayer
                        videoSrc="https://player.vimeo.com/video/1037289858"
                        thumbnailSrc="/placeholders/newcopy-thumbnail.png"
                        enableControls
                        style={{
                            width: "100%",
                            maxWidth: "100vw",
                            aspectRatio: "16/9",
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
    )
}
