import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//Components
import NavBar from "./components/navbar";
import Login from "./components/login";
import HomePage from "./components/home";
import SignUp from "./components/sign-up";
import Footer from "./components/footer";

//React-router
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/sign-up" exact element={<SignUp />} />
      </Routes>
      {/* <HomePage /> */}

      <Footer />
    </div>
  );
}

export default App;
