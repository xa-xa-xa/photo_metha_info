import { useEffect, useState } from "react";
import {
  getLocationInfo,
  runLocationExtraction,
} from "../utils/getLocationInfo";

// Custom hook for location extraction
export const useLocationExtraction = (): string => {
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    // Run the location extraction logic
    runLocationExtraction();

    const timeoutId = setTimeout(() => {
      const newLocation = getLocationInfo();
      console.log(
        "======> useLocationExtraction ---> updateLocation ---> getLocationInfo() "
      );
      setLocation(newLocation);
    }, 1500); // Adjust timing as necessary

    return () => clearTimeout(timeoutId);
  }, []); // Run only once when the component mounts

  return location; // Return the location
};
