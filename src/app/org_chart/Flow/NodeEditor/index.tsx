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
  const [formData, setFormData] = useState({
    name: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
              <div className="mb-4">
                <label className="flex justify-between text-sm font-medium text-gray-700">
                  <span>Họ và Tên</span>
                </label>
                <input
                  type={"text"}
                  name={`name`}
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="flex justify-between text-sm font-medium text-gray-700">
                  <span>Chức vụ</span>
                </label>
                <input
                  type={"text"}
                  name={`role`}
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              </div>
            </form>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  onSave(data.id, { ...data.data, ...formData });
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
