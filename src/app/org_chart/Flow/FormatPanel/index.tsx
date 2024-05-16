import ImportData, { usePopup } from "./ImportData";
import { getEdges, getNodes } from "./services";

const FormatPanel = ({
  clearNode,
  onLayout,
  nodes,
  edges,
  setNodes,
  setEdges,
  openEdited,
  onExpand,
  onCollapse,
}: {
  clearNode: () => void;
  onLayout: (nodes: any, edges: any) => void;
  nodes: any;
  edges: any;
  setNodes: any;
  setEdges: any;
  openEdited: (nodes: any) => void;
  onExpand: (nodes: any) => void;
  onCollapse: (nodes: any) => void;
}) => {
  const { closePopup, isOpen = false, openPopup } = usePopup();
  return (
    <>
      <div className="flex gap-4 justify-center align-middle bg-white p-3 rounded-md">
        <button
          onClick={clearNode}
          className="pointer-events-auto rounded-md bg-red-400 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-red-500"
        >
          Clear
        </button>
        <button
          onClick={() => {
            onLayout(nodes, edges);
          }}
          className="pointer-events-auto rounded-md bg-yellow-500 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-yellow-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20 20C20.5523 20 21 19.5523 21 19C21 18.4477 20.5523 18 20 18C19.4477 18 19 18.4477 19 19C19 19.5523 19.4477 20 20 20ZM17 19C17 17.6938 17.8348 16.5825 19 16.1707V16C19 14.3431 17.6569 13 16 13C14.8744 13 13.8357 12.6281 13 12.0004L13 16.1707C14.1652 16.5825 15 17.6938 15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19C9 17.6938 9.83481 16.5825 11 16.1707L11 12.0004C10.1643 12.6281 9.12561 13 8 13C6.34315 13 5 14.3431 5 16V16.1707C6.16519 16.5825 7 17.6938 7 19C7 20.6569 5.65685 22 4 22C2.34315 22 1 20.6569 1 19C1 17.6938 1.83481 16.5825 3 16.1707V16C3 13.2386 5.23858 11 8 11C9.65685 11 11 9.65685 11 8V7.82929C9.83481 7.41746 9 6.30622 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5C15 6.30622 14.1652 7.41746 13 7.82929V8C13 9.65685 14.3431 11 16 11C18.7614 11 21 13.2386 21 16V16.1707C22.1652 16.5825 23 17.6938 23 19C23 20.6569 21.6569 22 20 22C18.3431 22 17 20.6569 17 19ZM12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6ZM4 18C3.44772 18 3 18.4477 3 19C3 19.5523 3.44772 20 4 20C4.55228 20 5 19.5523 5 19C5 18.4477 4.55228 18 4 18ZM13 19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19C11 18.4477 11.4477 18 12 18C12.5523 18 13 18.4477 13 19Z"
              fill="white"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            alert(JSON.stringify(nodes) + JSON.stringify(edges));
            console.log(nodes, edges);
          }}
          className="pointer-events-auto rounded-md bg-green-500 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-green-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="32px"
            height="32px"
            viewBox="0 0 512 512"
            version="1.1"
          >
            <title>export</title>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="Combined-Shape"
                fill="white"
                transform="translate(64.000000, 48.915055)"
              >
                <path d="M170.666667,36.418278 L170.666667,79.0849447 L42.6666667,79.0849447 L42.6666667,356.418278 L341.333333,356.418278 L341.333333,228.418278 L384,228.418278 L384,399.084945 L0,399.084945 L0,36.418278 L170.666667,36.418278 Z M313.751611,0 L414.169889,100.418278 L313.751611,200.836556 L283.581722,170.666667 L332.485,121.751 L277.333333,121.751611 C243.249474,121.751611 215.388568,148.395237 213.441977,181.991125 L213.333333,185.751611 L213.333333,292.418278 L170.666667,292.418278 L170.666667,185.751611 C170.666667,128.391511 215.942543,81.6061582 272.706355,79.1834943 L277.333333,79.0849447 L332.484,79.084 L283.581722,30.1698893 L313.751611,0 Z"></path>
              </g>
            </g>
          </svg>
        </button>
        <button
          onClick={() => {
            openPopup();
          }}
          className="pointer-events-auto rounded-md bg-violet-500 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-violet-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="32px"
            height="32px"
            viewBox="0 0 512 512"
            version="1.1"
          >
            <title>import</title>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="Combined-Shape"
                fill="white"
                transform="translate(42.666667, 85.333333)"
              >
                <path d="M405.333333,-1.42108547e-14 L405.333333,362.666667 L21.3333333,362.666667 L21.3333333,85.3333333 L64,85.3333333 L64,320 L362.666667,320 L362.666667,42.6666667 L277.333333,42.6666667 L277.333333,-1.42108547e-14 L405.333333,-1.42108547e-14 Z M128,-1.42108547e-14 C185.3601,-1.42108547e-14 232.145453,45.2758765 234.568117,102.039688 L234.666667,106.666667 L234.666,183.152 L283.581722,134.248389 L313.751611,164.418278 L213.333333,264.836556 L112.915055,164.418278 L143.084945,134.248389 L192,183.152 L192,106.666667 C192,72.5828078 165.356374,44.7219012 131.760486,42.7753108 L128,42.6666667 L7.10542736e-15,42.6666667 L7.10542736e-15,-1.42108547e-14 L128,-1.42108547e-14 Z"></path>
              </g>
            </g>
          </svg>
        </button>
      </div>
      <ImportData
        isOpen={isOpen}
        closePopup={closePopup}
        onSave={(data) => {
          const newEdges = getEdges(JSON.parse(data));
          const newNodes = getNodes(JSON.parse(data)).map((node: any) => ({
            ...node,
            data: {
              ...node.data,
              openEdited: openEdited,
              onCollapse: onCollapse,
              onExpand: onExpand,
            },
          }));
          setNodes([...newNodes]);
          // setEdges([...newEdges]);
          onLayout(newNodes, newEdges);
        }}
      />
    </>
  );
};
export default FormatPanel;
