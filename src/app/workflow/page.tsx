"use client";
import Canva from "@/components/workflow/canva";
import FormWorkflow from "@/components/workflow/form";
import { useState } from "react";
const Workflow = () => {
  const [data, setData] = useState<{
    content: any;
    shape: any;
    childs:any[]
  }>({
    content: {
      title: "Step 1",
    },
    shape: {
      type: "circle",
      x: "200",
      y: "200",
      background: "red",
      border_width: "1",
      border: "black",
      width: "100",
      height: "100",
    },
    childs:[]
  });
  return (
    <main className="bg-white min-h-screen">
      <div
        className="w-full h-[400px] overflow-hidden"
        onMouseEnter={() => {
          document.body.style.overflow = "hidden";
        }}
        onMouseLeave={() => {
          document.body.style.overflow = "auto";
        }}
      >
        <Canva data={data} />
      </div>
      <div className="w-full border-t-2 border-black grid grid-cols-3 gap-4 p-2">
        <div>
          <FormWorkflow
            updateData={(prev: any) => {
              setData(prev);
            }}
          />
        </div>
        {/* <div className="">
          {data.map((data, index) => (
            <label
              className=" block border-2 border-[blue] p-3 rounded-md mb-3"
              key={index}
            >
              <input
                onChange={(e) => {
                  // setData((prev) => {
                  //   prev[index].content.title = e.target.value;
                  //   return [...prev];
                  // });
                }}
                type="text"
                placeholder="title"
                className="border-none outline-none"
              />
            </label>
          ))}
        </div>
        <div className="">
          {data.map((data, index) => (
            <label
              className=" block border-2 border-[blue] p-3 rounded-md mb-3"
              key={index}
            >
              <select
                name="shape"
                id=""
                className="w-full border-none outline-none"
                onChange={(e) => {
                  // setData((prev) => {
                  //   prev[index].shape.type = e.target.value;
                  //   return [...prev];
                  // });
                }}
              >
                <option value="circle">circle</option>
                <option value="square">square</option>
              </select>
            </label>
          ))}
        </div> */}
      </div>
    </main>
  );
};
export default Workflow;
