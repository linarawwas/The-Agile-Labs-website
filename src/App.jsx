// src/App.jsx
import { useState, useEffect, useRef } from "react";

const sections = [
  {
    id: "hero",
    title: "The Agile Labs",
    content: (
      <>
        <h1>The Agile Labs</h1>
        <p className="muted">Product Engineering, for users, with users.</p>
        <div className="divider"></div>
        <p>We design and build digital systems with restraint, precision, and long-term thinking.</p>
      </>
    ),
  },
  {
    id: "perspective",
    title: "OUR PERSPECTIVE",
    content: (
      <>
        <h2>Our Perspective</h2>
        <p>Most software fails through complexity, neglect, and rushed decisions made permanent.</p>
        <p className="muted">Our work prioritizes clarity over speed, structure over novelty, and decisions that still make sense years later.</p>
      </>
    ),
  },
  {
    id: "services",
    title: "WHAT WE DO",
    content: (
      <>
        <h2>What We Do</h2>
        <ul>
          <li>Product architecture & system design</li>
          <li>Full-stack web engineering</li>
          <li>Technical leadership & codebase recovery</li>
          <li>Long-term platform development</li>
        </ul>
        <p className="muted">We work with a limited number of clients at a time. Depth matters more than volume.</p>
      </>
    ),
  },
  {
    id: "working",
    title: "HOW WE WORK",
    content: (
      <>
        <h2>How We Work</h2>
        <p>Small team. Direct communication. Clear ownership.</p>
        <p>We don't outsource judgment, and we don't disappear after delivery.</p>
        <p className="muted">Our clients value calm execution, honest timelines, and software that doesn't require constant rescue.</p>
      </>
    ),
  },
  {
    id: "clients",
    title: "WHO WE WORK WITH",
    content: (
      <>
        <h2>Who We Work With</h2>
        <p>Founders and teams who have outgrown improvisation.</p>
        <p>Organizations that understand software is an asset, not a liability.</p>
        <p className="muted">If you are optimizing for durability, we are aligned.</p>
      </>
    ),
  },
  {
    id: "contact",
    title: "CONTACT",
    content: (
      <>
        <h2>Contact</h2>
        <p>We take on new work selectively.</p>
        <p><a href="mailto:info@theagilelabs.com">info@theagilelabs.com</a></p>
      </>
    ),
  },
  {
    id: "footer",
    title: "FOOTER",
    content: (
      <>
        <p>© The Agile Labs</p>
        <p className="muted">Software, done deliberately.</p>
      </>
    ),
  },
];

export default function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const [selectedSection, setSelectedSection] = useState(null);
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
    if (selectedSection) {
      // Go back to list view
      setSelectedSection(null);
    } else if (currentImageIndex > 1) {
      // If on list view, go to previous image
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

  const handleSectionClick = (sectionId) => {
    setSelectedSection(sectionId);
  };

  // Split sections into two columns
  const leftColumn = sections.slice(0, Math.ceil(sections.length / 2));
  const rightColumn = sections.slice(Math.ceil(sections.length / 2));

  return (
    <main>
      {currentImageIndex === 5 && (
        <>
          {!selectedSection ? (
            <div className="sections-list">
              <div className="sections-column">
                {leftColumn.map((section) => (
                  <a
                    key={section.id}
                    href="#"
                    className="section-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionClick(section.id);
                    }}
                  >
                    {section.title}
                  </a>
                ))}
              </div>
              <div className="sections-column">
                {rightColumn.map((section) => (
                  <a
                    key={section.id}
                    href="#"
                    className="section-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionClick(section.id);
                    }}
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="section-content">
              {sections.find((s) => s.id === selectedSection)?.content}
            </div>
          )}
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
