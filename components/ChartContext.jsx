import { createContext, useState } from "react";

export const ChartContext = createContext({});

const ChartProvider = ({ children }) => {
  const [contextData, setContextData] = useState({ data: [], xScale: null, yScale: null });
  return (
    <ChartContext.Provider value={[contextData, setContextData]}>
      {children}
    </ChartContext.Provider>
  )
}

export default ChartProvider;