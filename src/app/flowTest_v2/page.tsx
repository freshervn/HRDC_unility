"use client";
import dynamic from "next/dynamic";
const FlowComponent = dynamic(() => import("./Flow"), {
  ssr: false,
});
export default function App() {
  return (
    <>      
      <FlowComponent />
    </>
  );
}
