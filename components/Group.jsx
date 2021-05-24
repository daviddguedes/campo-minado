import { useContext } from "react";
import { ChartContext } from "./ChartContext";

const Group = ({ children }) => {
  const [contextData, setContextData] = useContext(ChartContext);

  const { margin } = contextData;

  return (
    <g transform={`translate(${margin.left},${margin.top})`}>
      {children}
    </g>
  )
}

export default Group;