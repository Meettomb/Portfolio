import { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useAnimate,
} from "motion/react";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const isHoveringRef = useRef(false);
  const [scope, animate] = useAnimate();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Faster, snappier physics: higher stiffness, lower damping/mass
  const springConfig = { stiffness: 500, damping: 28, mass: 0.1 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target.closest(
        "a, button, input, textarea, [data-cursor='hover']"
      );

      const shouldHover = !!target;
      // Only trigger a re-render when the hover state actually changes
      if (isHoveringRef.current !== shouldHover) {
        isHoveringRef.current = shouldHover;
        setIsHovering(shouldHover);
      }
    };

    const handleMouseDown = () => {
      animate(
        scope.current,
        { scale: 0.75 },
        { duration: 0.1 }
      );
    };

    const handleMouseUp = () => {
      animate(
        scope.current,
        { scale: isHoveringRef.current ? 1.5 : 1 },
        { type: "spring", stiffness: 400, damping: 20 }
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, animate, scope]);

  return (
    <motion.div
      ref={scope}
      className="custom-cursor"
      style={{
        x: springX,
        y: springY,
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering
          ? "rgba(252, 163, 17, 0.45)"
          : "rgba(252, 163, 17, 0.08)",
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 25,
      }}
    />
  );
};

export default CustomCursor;