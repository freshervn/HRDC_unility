import React, { memo, useState } from "react";

const usePopup = () => {
  const [popupData, setPopupData] = useState({ id: 0 });
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = (node: any) => {
    setIsOpen(true);
    setPopupData(node);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return { isOpen, openPopup, closePopup, popupData };
};

export { usePopup };
const Popup = ({
  isOpen = false,
  closePopup = () => {},
  data = {},
  onSave,
}: {
  isOpen: boolean;
  closePopup: () => void;
  data: any;
  onSave: (id: string, data: any) => void;
}) => {
  const [fields, setFields] = useState(data?.data?.fields ?? []);  

  const handleAddField = () => {
    const newFieldId = fields.length + 1;
    setFields([...fields, { id: newFieldId, name: "", type: "text" }]);
  };

  const handleRemoveField = (id: string) => {
    setFields(fields.filter((field: any) => field.id !== id));
  };

  const handleFieldChange = (id: string, e: any) => {
    const updatedFields = fields.map((field: any) =>
      field.id === id ? { ...field, value: e.target.value } : field
    );
    setFields(updatedFields);
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            {/* Popup content goes here */}
            <h2 className="text-lg font-semibold mb-4 min-w-[400px] text-center uppercase">
              {data.type}
            </h2>
            <form>
              {fields?.map((field: any) => (
                <div key={field.id} className="mb-4">
                  <label
                    htmlFor={`field-${field.id}`}
                    className="flex justify-between text-sm font-medium text-gray-700"
                  >
                    <span>Field {field.id}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveField(field.id)}
                      className="px-1 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M8.00386 9.41816C7.61333 9.02763 7.61334 8.39447 8.00386 8.00395C8.39438 7.61342 9.02755 7.61342 9.41807 8.00395L12.0057 10.5916L14.5907 8.00657C14.9813 7.61605 15.6144 7.61605 16.0049 8.00657C16.3955 8.3971 16.3955 9.03026 16.0049 9.42079L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.0039C15.6133 16.3945 14.9802 16.3945 14.5896 16.0039L12.0057 13.42L9.42097 16.0048C9.03045 16.3953 8.39728 16.3953 8.00676 16.0048C7.61624 15.6142 7.61624 14.9811 8.00676 14.5905L10.5915 12.0058L8.00386 9.41816Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </label>
                  <input
                    type={field.type}
                    name={`field-${field.id}`}
                    id={`field-${field.id}`}
                    value={field.value}
                    onChange={(e) => handleFieldChange(field.id, e)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddField}
                className="mt-2 px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
              >
                Add Field{" "}
                <svg
                  className=" inline-block ml-2 mb-[3px]"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="18px"
                  height="18px"
                  viewBox="0 0 32 32"
                  version="1.1"
                >
                  <title>plus-circle</title>
                  <desc>Created with Sketch Beta.</desc>
                  <defs></defs>
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="Icon-Set"
                      transform="translate(-464.000000, -1087.000000)"
                      fill="white"
                    >
                      <path
                        d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z"
                        id="plus-circle"
                      ></path>
                    </g>
                  </g>
                </svg>
              </button>
            </form>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  onSave(data.id, { ...data.data, fields: fields });
                  closePopup();
                }}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={closePopup}
                className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
