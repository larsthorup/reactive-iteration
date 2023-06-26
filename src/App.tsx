import { useState } from "react";
import ProductTableInline from "./ProductTableInline";
import ProductTableSlow from "./ProductTableSlow";

function App() {
  const [tab, setTab] = useState("inline");
  return (
    <>
      <h1>Reactive Iteration - Demo</h1>
      <input
        type="radio"
        name="tab"
        value="inline"
        checked={tab === "inline"}
        onChange={() => setTab("inline")}
      />{" "}
      Inline |
      <input
        type="radio"
        name="tab"
        value="slow"
        checked={tab === "slow"}
        onChange={() => setTab("slow")}
      />{" "}
      Slow |
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {tab === "inline" && (
          <div>
            <h2>Inline</h2>
            <ProductTableInline />
          </div>
        )}
        {tab === "slow" && (
          <div>
            <h2>Slow</h2>
            <ProductTableSlow />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
