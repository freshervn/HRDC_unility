import { Node } from "reactflow";

const CreatorPanel = ({
  generateNewNode,
}: {
  generateNewNode: (node: Node) => void;
}) => {
  const prefix: Node = {
    id: "" + Date.now() + Math.random(),
    position: {
      x: 200,
      y: 200,
    },
    data: { label: "" + Date.now() + Math.random(), fields: [] },
  };
  return (
    <div className="flex gap-4 justify-center align-middle bg-white p-3 rounded-md">
      <p className="text-2xl m-auto">New</p>
      <button
        onClick={() => {
          generateNewNode({
            ...prefix,
            type: "circle",
            className:
              "rounded-full border-indigo-600 p-3 flex justify-center align-middle border-2 bg-white",
            style: {
              width: 100,
              height: 100,
            },
          });
        }}
        className="pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32px"
          height="32px"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        onClick={() => {
          generateNewNode({
            ...prefix,
            type: "square",
            className:
              "rounded-10 border-yellow-600 p-3 flex justify-center align-middle border-2 bg-white",
            style: {
              width: 100,
              height: 100,
            },
          });
        }}
        className="pointer-events-auto rounded-md bg-yellow-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-yellow-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32px"
          height="32px"
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="2"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        onClick={() => {
          generateNewNode({
            ...prefix,
            type: "diamond",
            className:
              "rounded-10 p-[3px] flex justify-center align-middle  bg-red-600 clip-diamond",
            style: {
              width: 100,
              height: 100,
            },
          });
        }}
        className="pointer-events-auto rounded-md bg-red-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-red-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32px"
          height="32px"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4.26244 14.2628C3.47041 13.4707 3.07439 13.0747 2.92601 12.618C2.7955 12.2164 2.7955 11.7837 2.92601 11.382C3.07439 10.9253 3.47041 10.5293 4.26244 9.73727L9.73703 4.26268C10.5291 3.47065 10.9251 3.07463 11.3817 2.92626C11.7834 2.79574 12.2161 2.79574 12.6178 2.92626C13.0745 3.07463 13.4705 3.47065 14.2625 4.26268L19.7371 9.73727C20.5291 10.5293 20.9251 10.9253 21.0735 11.382C21.204 11.7837 21.204 12.2164 21.0735 12.618C20.9251 13.0747 20.5291 13.4707 19.7371 14.2628L14.2625 19.7373C13.4705 20.5294 13.0745 20.9254 12.6178 21.0738C12.2161 21.2043 11.7834 21.2043 11.3817 21.0738C10.9251 20.9254 10.5291 20.5294 9.73703 19.7373L4.26244 14.2628Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
export default CreatorPanel;
