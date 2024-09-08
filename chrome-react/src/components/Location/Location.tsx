type LocationProps = {
  location: string;
};

function Location({ location }: LocationProps) {
  // Define a common style object for all text
  const textStyle = {
    color: "white", // White text color
    fontFamily: "Arial, sans-serif", // Arial font
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)", // Subtle black shadow
  };

  // Split the location into parts, assuming the last part is the country
  const locationParts = location ? location.split(",") : [];
  console.log({ locationParts });

  const lastPart = locationParts.pop(); // Get the country (last part)
  const remainingParts = locationParts.join(","); // Get the rest of the location
  console.log({ remainingParts });

  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        backgroundColor: "transparent", // Transparent background
        padding: "10px",
        zIndex: 1000,
        border: "none", // Remove any borders
        borderRadius: "0px", // No border radius
      }}
    >
      <h6 style={{ ...textStyle, marginBottom: "0" }}>Photo Location</h6>
      <p style={textStyle}>
        {remainingParts || "---"}
        <br />
        <strong>{lastPart}</strong> {/* Bold country name */}
      </p>
    </div>
  );
}

export default Location;
