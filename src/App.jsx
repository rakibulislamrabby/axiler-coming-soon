import React, { useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import "./App.css";

const App = () => {
  const globeEl = useRef();
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const animate = () => {
      if (globeEl.current) {
        // Access the globe's Three.js scene and modify its rotation
        globeEl.current.scene().rotation.y += 0.002; // Rotate around Y-axis
      }
      requestAnimationFrame(animate); // Continue the animation
    };

    animate(); // Start the animation

    return () => cancelAnimationFrame(animate); // Cleanup on component unmount
  }, []);

  return (
    <div className="App">
      {/* Background Globe */}
      <div className="absolute inset-0 z-0">
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          width={window.innerWidth}
          height={window.innerHeight}
          pointsData={markers}
          pointAltitude="size"
          pointColor="color"
        />
      </div>

      {/* Foreground Content */}
      <div className="text-white h-screen relative overflow-hidden z-10">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/src/assets/Axiler-Logo-02.png"
              alt="Logo"
              className="h-16 "
            />
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex items-center justify-center h-screen text-center max-w-lg mx-auto z-20">
          <div>
            <h1
              className="text-7xl md:text-6xl  font-extrabold tracking-widest animate-bounce"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Coming Soon
            </h1>
            <p className="mt-4 text-lg md:text-xl px-5 lg:px-0 text-gray-400">
              We are on a mission to shape the future of digital security with
              our unparalleled expertise and experience in cyber security
              solutions.
            </p>
            {/* Subscribe Form */}
            <div className="mt-10">
              <input
                id="email-input"
                type="email"
                placeholder="Enter your email"
                className="p-3 w-2/3 max-w-md rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-blue-100 text-gray-900 border border-blue-400"
              />
              <button
                id="notify-me"
                className="mt-4 px-6 py-3 ml-2 rounded-lg bg-blue-500 text-white font-bold shadow-md hover:shadow-lg hover:bg-blue-800 transition pulse"
              >
                Notify Me
              </button>
            </div>
          </div>
        </div>

        <footer className="absolute inset-x-0 bottom-4 text-center text-sm mx-auto text-gray-500 z-20">
          &copy; 2024 Axiler. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default App;
