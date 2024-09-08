// Function to extract the location from the page and clean up the text
export const getLocationInfo = (): string => {
  const locationElement = document.querySelector(".location-info");

  if (locationElement) {
    const locationText =
      locationElement.textContent?.trim() || "Location not found";

    const cleanLocation = locationText
      .replace(/^Location\s*/, "") // Remove the "Location" at the beginning
      .split("©")[0] // Extract everything before the © sign
      .trim();

    console.log("👉 Clean Location found:", cleanLocation);

    return cleanLocation;
  }

  return "Location not found";
};

// Function to trigger the "Information" button click
export const triggerInfoButtonClick = (): void => {
  // Cast the selected element as HTMLButtonElement
  const infoButton = document.querySelector(
    "button.info"
  ) as HTMLButtonElement | null;

  if (infoButton) {
    infoButton.click();
    console.log("Info button clicked");
  } else {
    console.log("Info button not found");
  }
};

// Main function to run the extraction after clicking the button
export const runLocationExtraction = (): void => {
  // First click the information button
  triggerInfoButtonClick();

  // Wait for a short period to allow the location data to load
  setTimeout(() => {
    const location = getLocationInfo();
    console.log(
      "======> getLocationInfo.tsx ---> runLocationExtraction ---> updateLocation --->  l44"
    );
    console.log("Final Location Info:", location);
    // Optionally update your UI here
  }, 1000); // Adjust the timeout duration if necessary
};
