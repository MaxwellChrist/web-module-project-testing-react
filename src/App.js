import React from "react";
import Display from "./components/Display";

export default function App() {
  const testFunction = (data)=> {
    console.log(data);
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Integration Testing Challenge</a>
      </nav>
      <div className="App">
        <Display displayFun={displayFunc}/>
      </div>
    </div>
  );
}
