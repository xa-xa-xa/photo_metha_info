chrome.webRequest.onCompleted.addListener(
  function (details) {
    if (details.url.includes("types/locations")) {
      fetch(details.url)
        .then((response) => response.json())
        .then((data) => {
          console.log("Location Data:", data);
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
              locationData: data.location,
            });
          });
        });
    }
  },
  { urls: ["https://www.amazon.com/drive/v1/nodes/*/types/locations*"] }
);
