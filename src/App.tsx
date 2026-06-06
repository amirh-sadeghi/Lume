import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import BodyContainer from "./components/BodyContainer/BodyContainer";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <BodyContainer />
      </main>
      <Footer />
    </div>
  );
};

export default App;
