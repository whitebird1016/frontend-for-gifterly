import { BrowserRouter as Router } from "react-router-dom";
import Views from "./views";
import { AuthContextProvider } from "./Context/AuthContext";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Views />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
