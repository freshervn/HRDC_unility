"use client";
import dynamic from "next/dynamic";

const FlowComponent = dynamic(() => import("./Flow"), {
  ssr: false,
});

function App() {
  return (
    <>
      <FlowComponent />
    </>
  );
}

export default App;
