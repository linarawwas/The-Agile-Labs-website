// src/App.jsx
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const lastWheelTime = useRef(0);

  const updateBackgroundImage = (index) => {
    document.body.style.backgroundImage = `url("/src/assets/${index}.png")`;
  };

  useEffect(() => {
    // Initialize background image
    updateBackgroundImage(1);

    const handleWheel = (e) => {
      // Prevent default scrolling
      e.preventDefault();

      const now = Date.now();
      // Throttle wheel events to prevent too rapid changes
      if (now - lastWheelTime.current < 300) {
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
          // Immediate change, no transition
          updateBackgroundImage(newIndex);
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

  const handlePrevious = () => {
    if (currentImageIndex > 1) {
      const newIndex = currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
      updateBackgroundImage(newIndex);
    }
  };

  const handleNext = () => {
    if (currentImageIndex < 10) {
      const newIndex = currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
      updateBackgroundImage(newIndex);
    }
  };

  return (
    <main>
      {currentImageIndex === 5 && (
        <>
          <h1 style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            The Agile Labs
          </h1>
          <div className="navigation-bar">
            <button className="nav-button previous" onClick={handlePrevious}>
              <span className="arrow">←</span> previous
            </button>
            <button className="nav-button next" onClick={handleNext}>
              next <span className="arrow">→</span>
            </button>
          </div>
        </>
      )}
    </main>
  );
}
