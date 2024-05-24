"use client";
import dynamic from "next/dynamic";
const FlowComponent = dynamic(() => import("./Flow"), {
  ssr: false,
});
export default function App() {
  return (
    <>
      <h1>hello world</h1>
      <FlowComponent />
    </>
  );
}
