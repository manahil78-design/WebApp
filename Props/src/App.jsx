
import React from "react";
import Card from "./components/Card";
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  return (
    <div className="d-flex justify-content-evenly flex-wrap">
      <Card Dname="Isla Pasion" desc="Celebrated for soft white sands and crystal-clear turquoise waters."></Card>
      <Card Dname="Eagle Beach" desc="Renowned for wide powder-white shorelines and iconic fofoti trees."></Card>
      <Card Dname="Grace Bay" desc="Famed for vibrant barrier reefs and calm, glowing waters."></Card>
      <Card Dname="White heaven Beach" desc="Voted a top U.S. coastal spot, famous for dramatic sea cliffs and resident sea lions."></Card>
      <Card Dname="La Jolla" desc="Framed by striking burnt-orange cliffs and long stretches of sand."></Card>
    </div>
  );
}

export default App;
