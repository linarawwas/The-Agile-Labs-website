// src/App.jsx
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const lastWheelTime = useRef(0);
  const isChanging = useRef(false);

  useEffect(() => {
    // Initialize background image
    document.body.style.backgroundImage = `url("/src/assets/1.png")`;

    const handleWheel = (e) => {
      // Prevent default scrolling
      e.preventDefault();

      const now = Date.now();
      // Throttle wheel events to prevent too rapid changes
      if (now - lastWheelTime.current < 300 || isChanging.current) {
        return;
      }

      lastWheelTime.current = now;

      setCurrentImageIndex((prevIndex) => {
        let newIndex = prevIndex;

        // Scroll down - increment image
        if (e.deltaY > 0 && prevIndex < 10) {
          newIndex = prevIndex + 1;
        }
        // Scroll up - decrement image
        else if (e.deltaY < 0 && prevIndex > 1) {
          newIndex = prevIndex - 1;
        }

        if (newIndex !== prevIndex) {
          isChanging.current = true;
          document.body.style.backgroundImage = `url("/src/assets/${newIndex}.png")`;
          
          // Reset the changing flag after transition
          setTimeout(() => {
            isChanging.current = false;
          }, 300);
        }

        return newIndex;
      });
    };

    // Add wheel event listener with passive: false to allow preventDefault
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <main>
    </main>
  );
}
