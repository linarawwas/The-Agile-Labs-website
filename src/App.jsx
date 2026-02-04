// src/App.jsx
import { useState, useEffect, useRef } from "react";

const sections = [
  {
    id: "hero",
    title: "The Agile Labs",
    content: (
      <>
        <h1>The Agile Labs</h1>
        <p >This is the place for creating dangerously, experimenting with new projects that align with my interests, thus called "Labs", and they're "Agile" because I like to execute with flexibility and implement Agile development methods.</p>
  </>
    ),
  },
  {
    id: "perspective",
    title: "Perspective",
    content: (
      <>
        <h2>Perspective</h2>
        <p>I'm a graduate of both Physics and Islamic Studies, and I got into software engineering right after graduating from physics in 2021. I yet have to explore deeper and more useful intersections of all of the fields I am into, and I know my journey is going to be a long and interesting one but more importantly, deeply fulfilling. </p>
      </>
    ),
  },
  {
    id: "services",
    title: "What I Do",
    content: (
      <>
        <h2>What I Do</h2>
        <ul>
          <li>Software Architecture & Design</li>
          <li>Full-stack Web and Mobile Development</li>
          <li>Artistic Projects & Blogging</li>
        </ul>
      </>
    ),
  },
  {
    id: "working",
    title: "How I Work",
    content: (
      <>
        <h2>How I Work</h2>
        <p>I work on my own, & I'm looking for collaborators who are interested in working on projects that align with my interests.</p>
     </>
    ),
  },
  {
    id: "clients",
    title: "Collaborators",
    content: (
      <>
        <h2>Collaborators</h2>
        <p>I'm trying to create a career out of the intersection of my interests, if you think you want someone like me on your team, I'd love to hear from you.</p>
     </>)
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <>
        <h2>Contact</h2>
        <p>I take human connections seriously, and I'd love to know like minded people.</p>
        <p><a href="mailto:info@theagilelabs.com">info@theagilelabs.com</a></p>
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
