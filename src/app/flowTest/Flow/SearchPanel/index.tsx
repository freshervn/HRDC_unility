import Autocomplete from "@/components/workflow/Autocomplete";
import { useCallback, useRef } from "react";
import { useReactFlow, Node } from "reactflow";

const SearchPanel = () => {
  const clickPoint = useRef<HTMLDivElement>(null);
  const { setCenter, getNodes } = useReactFlow();
  const nodes = getNodes();
  const handleTransform = useCallback(
    (node: Node) => {
      setCenter(node.position.x, node.position.y, {
        duration: 1,
        zoom: 1,
      });
    },
    [setCenter]
  );

  return (
    <div className="items-center px-4 flex justify-center">
      <div className="relative mr-3">
        <Autocomplete initSuggestions={nodes} search={handleTransform}/>      
      </div>
    </div>
  );
};

export default SearchPanel;
