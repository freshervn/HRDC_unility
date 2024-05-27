import { create } from "zustand";
import {} from "reactflow";

type RFState = {};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useFlow = create<RFState>((set, get) => ({}));

export default useFlow;
