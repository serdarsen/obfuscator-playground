import { createRoot } from "react-dom/client";
import greet from "./greet";

const App = () => {

    greet();

    return <h1>Obfuscator Playground! {" "} {new Date().toLocaleString()}</h1>
};

const appRootElement = document.getElementById("app-root");
if(appRootElement){
    const appRoot = createRoot(appRootElement);
    appRoot.render(<App />);
}