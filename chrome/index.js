async function sayHello() {
  let [tab] = await chrome.tabs.query({ active: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      alert("Hellow from my extension!");
    },
  });
}

document.getElementById("myButton").addEventListener("click", sayHello);
