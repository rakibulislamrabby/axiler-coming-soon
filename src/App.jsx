import React, { useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import JSConfetti from "js-confetti"; // Import JSConfetti
import "./App.css";

const App = () => {
  const globeEl = useRef();
  const [markers, setMarkers] = useState([]);

  // State to store dynamic window size for globe resizing
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Ref for the button and input field
  const notifyButtonRef = useRef(null);
  const emailInputRef = useRef(null); // Ref for the email input field

  useEffect(() => {
    // Update window size when the browser window is resized
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const test=10;

  useEffect(() => {
    const animate = () => {
      if (globeEl.current) {
        globeEl.current.scene().rotation.y += 0.002;
      }
      requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animate);
  }, []);

  // Initialize JSConfetti
  const jsConfetti = new JSConfetti();

  const handleButtonClick = () => {
    // Trigger the confetti effect
    jsConfetti.addConfetti({}).then(() => jsConfetti.addConfetti());

    // Clear the email input field
    if (emailInputRef.current) {
      emailInputRef.current.value = ""; // Reset the input value
    }
  };

  return (
    <div className="App">
      {/* Background Globe */}
      <div className="absolute inset-0 z-0">
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          width={windowSize.width} // Dynamically set width
          height={windowSize.height} // Dynamically set height
          pointsData={markers}
          pointAltitude="size"
          pointColor="color"
        />
      </div>

      {/* Foreground Content */}
      <div className="text-white h-screen relative overflow-hidden z-10">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-20 bg-opacity-75 backdrop-blur-md">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/src/assets/Axiler-Logo-02.png"
              alt="Logo"
              className="h-12 md:h-16"
            />
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex items-center justify-center h-screen text-center px-6 md:px-8 max-w-[700px] mx-auto z-20">
          <div>
            <h1
              className="text-6xl md:text-6xl lg:text-7xl font-extrabold tracking-widest"
              style={{
                fontFamily: "'Poppins', sans-serif",
                background:
                  "linear-gradient(to right, #00FF87, #00BFFF, #8A2BE2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Coming Soon
            </h1>

            <div className="max-w-[500px] mx-auto">
              <p className="mt-4 text-base md:text-lg lg:text-xl px-5 lg:px-0 text-center text-gray-200">
                We are on a mission to shape the future of digital security with
                our unparalleled expertise and experience in cyber security
                solutions.
              </p>
              {/* Subscribe Form */}
              <div className="mt-10 flex flex-col items-center sm:flex-row">
                <input
                  id="email-input"
                  ref={emailInputRef} // Assign the ref to the input
                  type="email"
                  placeholder="Enter your email"
                  className="p-3 w-full sm:w-2/3 max-w-md rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-blue-100 text-gray-900 border border-blue-400"
                />
                <button
                  id="notify-me"
                  ref={notifyButtonRef} // Ref for the button
                  onClick={handleButtonClick} // On click, trigger confetti and reset input
                  className="mt-4 sm:mt-0 sm:ml-2 px-6 py-3 rounded-lg bg-blue-500 text-white font-bold shadow-md hover:shadow-lg hover:bg-blue-800 transition pulse"
                >
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>

        <footer className="absolute inset-x-0 bottom-4 text-center text-xs sm:text-sm mx-auto text-gray-500 z-20">
          &copy; 2024 Axiler. All rights reserved.
        </footer>
      </div>

      {/* Confetti Canvas (it won't be visible but it's used by JSConfetti) */}
      <canvas style={{ display: "none" }}></canvas>
    </div>
  );
};

export default App;
