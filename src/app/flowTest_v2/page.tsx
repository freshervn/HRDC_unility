"use client";
import dynamic from "next/dynamic";
import { ReactFlowProvider } from "reactflow";
const FlowComponent = dynamic(() => import("./Flow"), {
  ssr: false,
});
export default function App() {
  return (
    <>
      <div className="w-screen h-screen">
        <ReactFlowProvider>
          <FlowComponent />
        </ReactFlowProvider>
      </div>
    </>
  );
}
