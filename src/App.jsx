import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Enter_Form from "./components/Enter_Form";
import Edit_Form from "./components/Edit_Form";
import { useState } from "react";

function App() {
  const [details, setdetails] = useState([]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Enter_Form details={details} setdetails={setdetails} />}
          />
          <Route
            path="/EditForm/:id"
            element={<Edit_Form details={details} setdetails={setdetails} />}
          />
        </Routes>
      </BrowserRouter>

      {/* <Enter_Form details={details} setdetails={setdetails} /> */}
    </div>
  );
}

export default App;
