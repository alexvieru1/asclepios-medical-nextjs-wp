"use client";
import React from "react";
import { motion } from "motion/react";
import { VideoText } from "./ui/video-text";

export function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-[300px] lg:h-[500px] w-full overflow-hidden">
        <VideoText src="https://complexvrajamarii.ro/wp-content/uploads/2026/01/hero-section.webm">
          ASCLEPIOS
        </VideoText>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: 1,
          y: 0,
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          backgroundPosition: { duration: 8, repeat: Infinity, ease: "linear" },
        }}
        className="relative inline-block mx-auto text-lg md:text-4xl font-medium tracking-wide text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #475569, #10b981, #14b8a6, #475569)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        Medical Center
        <motion.span
          className="absolute inset-x-0 -bottom-1 mx-auto h-[2px] w-full rounded-full bg-emerald-500/70"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.75, duration: 0.5, ease: "easeOut" }}
          style={{ transformOrigin: "center" }}
        />
      </motion.p>
    </div>
  );
}
