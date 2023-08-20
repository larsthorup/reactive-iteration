import { useState } from "react";
import ProductTableInline from "./ProductTableInline";
import ProductTableSlow from "./ProductTableSlow";
import ProductTableFast from "./ProductTableFast";
import ProductTableContext from "./ProductTableContext";

function App() {
  const [tab, setTab] = useState("react-context");
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
      <input
        type="radio"
        name="tab"
        value="fast"
        checked={tab === "fast"}
        onChange={() => setTab("fast")}
      />{" "}
      Fast |
      <input
        type="radio"
        name="tab"
        value="react-context"
        checked={tab === "react-context"}
        onChange={() => setTab("react-context")}
      />{" "}
      React Context
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {tab === "inline" && (
          <div>
            <h2>Inlined</h2>
            <ProductTableInline />
          </div>
        )}
        {tab === "slow" && (
          <div>
            <h2>Pass data as prop</h2>
            <ProductTableSlow />
          </div>
        )}
        {tab === "fast" && (
          <div>
            <h2>Pass hook as prop</h2>
            <ProductTableFast />
          </div>
        )}
        {tab === "react-context" && (
          <div>
            <h2>useContextSelector</h2>
            <ProductTableContext />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
