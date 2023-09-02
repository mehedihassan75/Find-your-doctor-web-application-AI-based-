import HomePage from "./pages/HomePage";
import ContextAPI from "./ContextAPI";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Doctor from "./component/Doctor";
import User from "./component/User";
import Hospital from "./component/Hospital";

function App() {
  return (
    <ContextAPI>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/user" element={<User />} />
          <Route path="/hospital" element={<Hospital />} />
        </Routes>
      </BrowserRouter>
    </ContextAPI>
  );
}

export default App;

//lets start framer motion......
