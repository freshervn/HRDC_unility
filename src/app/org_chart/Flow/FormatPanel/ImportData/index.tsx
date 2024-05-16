import React, { useState } from "react";

const usePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return { isOpen, openPopup, closePopup };
};

export { usePopup };
const ImportData = ({
  isOpen = false,
  closePopup = () => {},
  onSave,
}: {
  isOpen: boolean;
  closePopup: () => void;
  onSave: (input: string) => void;
}) => {
  const [formData, setFormData] = useState("");
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            {/* Popup content goes here */}
            <h2 className="text-lg font-semibold mb-4 min-w-[400px] text-center uppercase">
              Import Data
            </h2>
            <form>
              <div className="mb-4">
                <textarea
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  rows={4}
                  value={formData}
                  onChange={(e) => {
                    setFormData(e.target.value);
                  }}
                  placeholder="Enter your text here..."
                ></textarea>
              </div>
            </form>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  onSave(formData);
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

export default ImportData;
