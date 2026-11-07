
import React, { createContext, useContext } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ShrinkHeaderContext = createContext(null);

export const useCondenseProgress = () => {
    const context = useContext(ShrinkHeaderContext);

    if (!context) {
        throw new Error(
            "useCondenseProgress must be used inside ShrinkHeader"
        );
    }

    return context;
};

export const ShrinkHeader = ({ children }) => {
    const { scrollY } = useScroll();

    // Progress: 0 at top, 1 after scrolling 100px
    const condense = useTransform(
        scrollY,
        [0, 100],
        [0, 1],
        { clamp: true }
    );

    const height = useTransform(
        condense,
        [0, 1],
        ["90px", "65px"]
    );

    const background = useTransform(
        condense,
        [0, 1],
        [
            "rgba(15, 15, 15, 0)",
            "rgba(15, 15, 15, 0.85)"
        ]
    );

    const boxShadow = useTransform(
        condense,
        [0, 1],
        [
            "0px 0px 0px rgba(0,0,0,0)",
            "0px 8px 30px rgba(0,0,0,0.15)"
        ]
    );

    return (
        <ShrinkHeaderContext.Provider value={condense}>
            <motion.header
                className="shrink-header"
                style={{
                    height,
                    background,
                    boxShadow,
                    backdropFilter: "blur(16px)",
                }}
            >
                {children}
            </motion.header>
        </ShrinkHeaderContext.Provider>
    );
};

export const ShrinkHeaderFill = () => {
    return <div className="shrink-header-fill" />;
};

export const ShrinkHeaderRow = ({ children }) => {
    return (
        <div className="shrink-header-row">
            {children}
        </div>
    );
};
