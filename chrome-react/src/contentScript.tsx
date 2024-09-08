import { createRoot } from "react-dom/client";
import App from "./App";

// Inject React component into the page
const appContainer = document.createElement("div");
appContainer.id = "chrome-extension-root";
document.body.appendChild(appContainer);

const root = createRoot(appContainer);
root.render(<App />);
