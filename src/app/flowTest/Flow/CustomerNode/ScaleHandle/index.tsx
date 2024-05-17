import { ReactElement, useState } from "react";

const ScaleHandle = ({ children }: { children: ReactElement }) => {
  const [size, seSize] = useState({
    width: 100,
    height: 100,
  });
  return (
    <>
      <div className={`w-[${size.width}] h-[${size.height}] border p-5`}>
        {children}
      </div>
    </>
  );
};
export default ScaleHandle;
