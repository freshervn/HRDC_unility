import Image from "next/image";
import { useState } from "react";
import { Handle, Position } from "reactflow";

function Organization({ data, ...rest }: { data: any }) {
  const [visible, setVisible] = useState(false);
  const { openEdited, onCollapse, onExpand } = data;
  const [isExpand, setIsExpand] = useState(true);

  return (
    <div
      onMouseEnter={() => {
        setVisible(true);
      }}
      onMouseLeave={() => {
        setVisible(false);
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className={`${!visible && "opacity-0"}`}
      />
      <div className="h-[200px] w-[323.6px] rounded-[10px] border-indigo-600 p-3 text-center border-2 bg-white">
        <Image
          src="/avatar.jpg"
          alt="blank_avatar"
          width={100}
          height={100}
          priority
          className="rounded-full object-cover w-[100px] h-[100px] m-auto mb-4"
        />
        <div>
          <h4 className="text-lg font-semibold mb-0">
            {data.name ?? "Họ và Tên"}
          </h4>
          <p className="text-xs font-normal italic">
            {data.role ?? "Phòng ban"}
          </p>
        </div>
        <button
          className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-100 absolute top-0 right-0"
          onClick={() => {
            openEdited({ ...data, ...rest });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-100 absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-[-100%]"
          onClick={() => {
            isExpand && onCollapse({ ...data, ...rest });
            !isExpand && onExpand({ ...data, ...rest });
            setIsExpand((prev) => !prev);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            className={`${!isExpand && "rotate-180"} duration-500`}
          >
            <path d="M6 7L12 13L18 7" stroke="#33363F" strokeWidth="2" />
            <path d="M17 18L7 18" stroke="#33363F" strokeWidth="2" />
          </svg>
        </button>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className={`${!visible && "opacity-0"}`}
      />
    </div>
  );
}
export { Organization };
