import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import lottieJson from "./../assets/preloader.json";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Clean up timer
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Add or remove 'loading' class from body based on isLoading state
    if (isLoading) {
      document.body.classList.add("loading");
    } else {
      document.body.classList.remove("loading");
    }
  }, [isLoading]);
  return (
    <main className="preloader">
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={{ width: 400, height: 400 }}
      />
    </main>
  );
};

export default Preloader;
