import { useEffect, useState } from "react";
import "./App.css";
import Location from "./components/Location/Location";
import {
  getLocationInfo,
  runLocationExtraction,
} from "./utils/getLocationInfo";

function App() {
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [location$, setLocation$] = useState<null | {
  //   city: string;
  //   country: string;
  //   latitude: string;
  //   longitude: string;
  // }>(null);

  // useEffect(() => {
  //   // Listen for messages from the background script
  //   chrome.runtime.onMessage.addListener((message) => {
  //     if (message.locationData) {
  //       setLocation$(message.locationData);
  //     }
  //   });
  // }, []);

  const LocationNew = () => (
    <div
      style={{
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: "10px",
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      {/* <h3>Photo Location</h3>
      {location$ ? (
        <div>
          <p>{`City: ${location$.city}`}</p>
          <p>{`Country: ${location$.country}`}</p>
          <p>{`Latitude: ${location$.latitude}`}</p>
          <p>{`Longitude: ${location$.longitude}`}</p>
        </div>
      ) : (
        <p>Loading location data...</p>
      )} */}
    </div>
  );

  const [location, setLocation] = useState<string>("");
  const [currentUrl, setCurrentUrl] = useState<string>(window.location.href);
  const [infoClicked, setInfoClicked] = useState<boolean>(false); // State to track if the Info button has been clicked

  // Function to update the location
  const updateLocation = () => {
    runLocationExtraction(); // Run the extraction logic
    const newLocation = getLocationInfo(); // Extract the location info
    console.log("======> contentScript.tsx  ---> updateLocation --->  l16");
    setLocation(newLocation); // Update the location state
  };

  useEffect(() => {
    // Function to click the "Info" button (only on the first load)
    const clickInfoButton = () => {
      const infoButton = document.querySelector(
        "button.info"
      ) as HTMLButtonElement | null; // Cast to HTMLButtonElement
      if (infoButton) {
        if (!infoClicked) {
          // Check if it hasn't already been clicked
          infoButton.click(); // Simulate a click on the "Info" button to reveal location info
          console.log("Info button clicked");
          setInfoClicked(true); // Mark that we've clicked the Info button
        } else {
          console.log("Info button already clicked!");
        }
      } else {
        console.log("Info button not found!");
      }
    };
    // Click the Info button only on the first load
    clickInfoButton();

    // Use MutationObserver to monitor DOM changes for location info
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          // Only check for childList mutations
          // Check if the location info becomes available
          const locationElement = document.querySelector(".location-info"); // Adjust selector to target location info
          if (locationElement) {
            updateLocation(); // Update the location once it's available
          }
        }
      }
    });

    // Observe the entire document for changes
    const targetNode =
      document.body.getElementsByClassName("image-and-controls")[0]; // Adjust if you know a more specific container for the location info
    console.log({ targetNode });

    observer.observe(targetNode, {
      childList: true,
      subtree: true,
    });

    // Periodically check for URL changes every second
    const checkUrlChange = setInterval(() => {
      if (window.location.href !== currentUrl) {
        setCurrentUrl(window.location.href); // Update URL state
        updateLocation(); // Extract location for new URL (no need to click Info button again)
      }
    }, 1000); // Adjust the interval time as needed

    // Cleanup the observer and interval on unmount
    return () => {
      clearInterval(checkUrlChange);
      observer.disconnect();
    };
  }, [currentUrl, infoClicked]); // Empty dependency array to run only on mount

  return (
    <>
      <Location location={location} />
      <LocationNew />
    </>
  );
}

export default App;
