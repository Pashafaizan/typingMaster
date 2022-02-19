import "./App.css";
import Section from "./components/Section/Section";
import Header from "./components/Header/Header";
import { paragraphTable } from "./data";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function App() {
  return (
    <>
      <Header />
      <Section para={paragraphTable[randomIntFromInterval(0,paragraphTable.length-1)]}/>
    </>
  );
}

export default App;
