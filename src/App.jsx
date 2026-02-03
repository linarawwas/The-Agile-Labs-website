// src/App.jsx
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const lastWheelTime = useRef(0);
  const isChanging = useRef(false);
  const parallaxIntensity = 2; // Adjust this value to control parallax strength (higher = more movement)

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

    const handleMouseMove = (e) => {
      // Calculate mouse position relative to viewport center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate offset from center (ranges from -1 to 1)
      const offsetX = (e.clientX - centerX) / centerX;
      const offsetY = (e.clientY - centerY) / centerY;
      
      // Apply parallax effect with intensity
      const moveX = offsetX * parallaxIntensity;
      const moveY = offsetY * parallaxIntensity;
      
      // Update background position (50% is center, we shift from there)
      const bgX = 50 + moveX;
      const bgY = 50 + moveY;
      
      document.body.style.backgroundPosition = `${bgX}% ${bgY}%`;
    };

    // Add wheel event listener with passive: false to allow preventDefault
    window.addEventListener("wheel", handleWheel, { passive: false });
    // Add mousemove event listener for parallax effect
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main>
    </main>
  );
}
