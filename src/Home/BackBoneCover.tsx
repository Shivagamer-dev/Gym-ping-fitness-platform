import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BetaSignupPopup from "./BetaSignupPopup";
import BG from '../assets/images/Bg.png';

export default function BackBoneCover() {
    const { scrollYProgress } = useScroll();
    const [isPopupOpen, setIsPopupOpen] = useState(false);



    // More dramatic and faster transform values - condensed scroll range for visibility
    const x1 = useTransform(scrollYProgress, [0, 0.3, 0.6], ['-80%', '-50%', '0%']);
    const x2 = useTransform(scrollYProgress, [0, 0.3, 0.6], ['80%', '50%', '0%']);
    const y3 = useTransform(scrollYProgress, [0, 0.2, 0.5], ['-80%', '-60%', '0%']);
    const y4 = useTransform(scrollYProgress, [0, 0.2, 0.5], ['80%', '60%', '0%']);
    const x5 = useTransform(scrollYProgress, [0, 0.4, 0.7], ['-100%', '-75%', '0%']);
    const x6 = useTransform(scrollYProgress, [0, 0.4, 0.7], ['80%', '75%', '0%']);

    // Additional animations for more visual impact
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.3], [0.3, 0.8, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const textY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-950 overflow-hidden">
            {/* Background Image */}
            <motion.img
                src={BG}
                alt="Back&Bone Cover"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.2 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* Enhanced Neon Lines with faster, more visible scroll animations */}
            <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-[4px] w-1/2 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 shadow-[0_0_20px_rgba(236,72,153,0.8)]"
                style={{ x: x1, opacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 h-[4px] w-1/2 bg-gradient-to-r from-green-500 via-lime-500 to-orange-500 shadow-[0_0_20px_rgba(34,197,94,0.8)]"
                style={{ x: x2, opacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
            />

            {/* Vertical lines with enhanced glow */}
            <motion.div
                className="absolute top-0 left-1/3 w-[4px] h-1/2 bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 shadow-[0_0_20px_rgba(168,85,247,0.8)]"
                style={{ y: y3, opacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
            />
            <motion.div
                className="absolute bottom-0 right-1/3 w-[4px] h-1/2 bg-gradient-to-b from-green-400 via-teal-500 to-cyan-500 shadow-[0_0_20px_rgba(20,184,166,0.8)]"
                style={{ y: y4, opacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
            />

            {/* Additional accent lines for more dramatic effect */}
            <motion.div
                className="absolute bottom-1/4 left-0 h-[4px] w-1/3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 shadow-[0_0_20px_rgba(251,191,36,0.8)]"
                style={{ x: x5, opacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.div
                className="absolute top-1/4 right-0 h-[4px] w-1/3 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 shadow-[0_0_20px_rgba(99,102,241,0.8)]"
                style={{ x: x6, opacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.6 }}
            />

            {/* Corner accent lines for extra visual impact */}
            <motion.div
                className="absolute top-0 left-0 w-32 h-[3px] bg-gradient-to-r from-transparent to-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.6)]"
                style={{ x: x1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-32 h-[3px] bg-gradient-to-l from-transparent to-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                style={{ x: x2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
            />

            {/* Text with enhanced scroll interaction */}
            <motion.div
                className="relative z-10 text-center px-4"
                style={{ y: textY, scale }}
            >
                <motion.h1
                    className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white drop-shadow-lg"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                >
                    Back&Bone
                </motion.h1>

                <motion.p
                    className="text-2xl md:text-4xl text-gray-300 mt-6"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                >
                    Your personal coach, Upgraded!
                </motion.p>

                {/* Buttons with enhanced hover effects */}
                <motion.div
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 1 }}
                >
                    <motion.button
                        onClick={() => setIsPopupOpen(true)}
                        className="px-10 py-5 rounded-3xl bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold text-2xl shadow-lg hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-300"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(236,72,153,0.7)" }}
                        whileTap={{ scale: 0.95 }}
                        aria-haspopup="dialog"
                        aria-expanded={isPopupOpen}
                    >
                        Signup for Beta
                    </motion.button>
                    <motion.button
                        onClick={() => {
                            document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-10 py-5 rounded-3xl border border-gray-400 text-gray-200 font-semibold text-2xl hover:bg-gray-800 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Know More
                    </motion.button>
                </motion.div>
            </motion.div>
            {isPopupOpen && <BetaSignupPopup onClose={() => setIsPopupOpen(false)} />}
        </div>
    );
}
