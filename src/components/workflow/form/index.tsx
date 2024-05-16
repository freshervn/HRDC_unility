"use client";

const FormWorkflow = ({ updateData = (state: any) => {} }) => {
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <>
      <button
        type="button"
        style={{ margin: "10px" }}
        onClick={() => {
          updateData((prev: any) => ({
            ...prev,
            childs: [
              ...prev.childs,
              {
                id: "step1",
                content: {
                  title: "Step ",
                },
                shape: {
                  type: "circle",
                  x: 50,
                  y: 100,
                  background: getRandomColor(),
                  border_width: "1",
                  border: "black",
                  width: "100",
                  height: "100",
                },
                childs:[]
              },
            ],
          }));
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
      >
        add childs
      </button>
      <button
        type="button"
        style={{ margin: "10px" }}
        onClick={() => {
          updateData((prev: any) => ({
            ...prev,
            childs: [
              {
                ...prev.childs[0],
                childs: [
                  ...prev.childs[0].childs,
                  {
                    id: "step1",
                    content: {
                      title: "Step ",
                    },
                    shape: {
                      type: "circle",
                      x: 50,
                      y: 100,
                      background: getRandomColor(),
                      border_width: "1",
                      border: "black",
                      width: "100",
                      height: "100",
                    },
                  },
                ],
              },
              ...prev.childs.slice(1),
            ],
          }));
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
      >
        add sudchild
      </button>
    </>
  );
};
export default FormWorkflow;
