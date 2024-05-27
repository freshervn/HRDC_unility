// src/components/Autocomplete.tsx
import React, { useEffect, useState } from "react";
import { Node } from "reactflow";

const Autocomplete: React.FC<{
  initSuggestions: any[];
  search: (node: Node) => void;
}> = ({ initSuggestions = [], search }) => {
  const [inputValue, setInputValue] = useState("");
  const [openSuggestion, setOpenSuggestion] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(initSuggestions);
  useEffect(() => {
    const matches = initSuggestions.filter((node) => {
      return String(node.data?.fields?.[0])?.includes(inputValue);
    });
    setSuggestions(matches);
  }, [initSuggestions, inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <>
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            setOpenSuggestion(true);
          }}
          onBlur={() => {
            setOpenSuggestion(false);
          }}
          onKeyUpCapture={(e: any) => {
            if (e.key === "Enter" && e?.target?.value) {
              search(
                initSuggestions.find((node) => {
                  return node.data?.fields?.[0] === inputValue;
                })
              );
            }
          }}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        {suggestions.length > 0 && (
          <ul
            className={`absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg ${
              openSuggestion ? "opacity-1" : "opacity-0"
            }`}
          >
            {suggestions.map((item: any) => (
              <li
                key={item.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setInputValue(item.data?.fields?.[0] || "");
                  search(
                    initSuggestions.find((node) => {
                      return node.data?.fields?.[0] === item.data?.fields?.[0];
                    })
                  );
                }}
              >
                {item.data?.fields?.[0] || item.id}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Autocomplete;
