import { Fragment, useContext, useEffect } from "react";
import { ChartContext } from "./ChartContext";

const SvgContainer = ({ margin, size, data, children }) => {
  const [contextData, setContextData] = useContext(ChartContext);

  useEffect(() => {
    setContextData(state => ({ ...state, data, size, margin }));
  }, [data, size, margin]);

  return (
    <Fragment>
      {contextData.data.length && (<svg width={size.svgWidth} height={size.svgHeight}>
        {children}
      </svg>)}
    </Fragment>
  )
}

export default SvgContainer;