import { useEffect, useState } from "react";
import {
  getLocationInfo,
  runLocationExtraction,
} from "../utils/getLocationInfo";

// Custom hook for location extraction and URL change detection
export const useLocationExtraction = (): string => {
  const [location, setLocation] = useState<string>("");
  const [currentUrl, setCurrentUrl] = useState<string>(window.location.href);

  // Function to update the location when URL changes
  const updateLocation = () => {
    runLocationExtraction(); // Run the extraction logic
    const newLocation = getLocationInfo();
    console.log(
      "======> useLocationExtraction.tsx ---> updateLocation ---> getLocationInfo() l15"
    );
    setLocation(newLocation); // Update the location state
  };

  useEffect(() => {
    // Initial run to extract location on first load
    updateLocation();

    // Create a MutationObserver to listen for DOM changes that may indicate a URL change
    const observer = new MutationObserver(() => {
      if (window.location.href !== currentUrl) {
        setCurrentUrl(window.location.href); // Update URL state
        updateLocation(); // Extract new location when URL changes
      }
    });

    // Observe changes in the DOM to detect URL changes
    observer.observe(document, { childList: true, subtree: true });

    return () => {
      observer.disconnect(); // Clean up the observer on unmount
    };
  }, [currentUrl]); // Re-run the effect when `currentUrl` changes

  return location; // Return the current location
};
