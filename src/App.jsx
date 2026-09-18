import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./App.css";

const items = [
  {
    image: "https://picsum.photos/id/1015/900/1200",
    label: "Music Vibes"
  },
  {
    image: "https://picsum.photos/id/1018/900/1200",
    label: "Ganna Songs"
  },
  {
    image: "https://picsum.photos/id/1039/900/1200",
    label: "Melody"
  },
  {
    image: "https://picsum.photos/id/1043/900/1200",
    label: "Music Folder"
  },
  {
    image: "https://picsum.photos/id/1044/900/1200",
    label: "Favorites"
  }
];

function App() {
  const [active, setActive] = useState(2);

  const galleryRef = useRef(null);
  const panelsRef = useRef([]);
  const imagesRef = useRef([]);

  useEffect(() => {
    const gallery = galleryRef.current;

    if (!gallery) return;

    const updateGallery = () => {
      const panels = panelsRef.current;

      panels.forEach((panel, index) => {
        if (!panel) return;

        const isActive = index === active;

        gsap.to(panel, {
          flexGrow: isActive ? 3.8 : 1,
          rotateY: isActive
            ? 0
            : index < active
            ? 8
            : -8,
          duration: 0.6,
          ease: "power3.out"
        });

        gsap.to(imagesRef.current[index], {
          scale: isActive ? 1.08 : 1,
          filter: isActive
            ? "grayscale(0%) brightness(1)"
            : "grayscale(100%) brightness(0.65)",
          duration: 0.6,
          ease: "power3.out"
        });
      });
    };

    updateGallery();

    window.addEventListener("resize", updateGallery);

    return () => {
      window.removeEventListener("resize", updateGallery);
    };
  }, [active]);

  return (
    <div className="app">


      <div
        ref={galleryRef}
        className="accordion-gallery"
      >
        {items.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              panelsRef.current[index] = el;
            }}
            className={`music-card ${
              active === index ? "active" : ""
            }`}
            onMouseEnter={() => setActive(index)}
            onClick={() => setActive(index)}
          >

            <div className="image-wrapper">

              <img
                ref={(el) => {
                  imagesRef.current[index] = el;
                }}
                src={item.image}
                alt={item.label}
              />

              <div className="image-overlay"></div>

            </div>

            <div className="music-info">

              <span className="music-line"></span>

              <span className="music-name">
                {item.label}
              </span>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default App;