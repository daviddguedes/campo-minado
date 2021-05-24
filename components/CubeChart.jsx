import ChartProvider from "./ChartContext";
import SvgContainer from "./SvgContainer";

const CubeChart = ({ margin, size, data, children }) => {
  return (
    <ChartProvider>
      <SvgContainer margin={margin} size={size} data={data}>
        {children}
      </SvgContainer>
    </ChartProvider>
  )
}

export default CubeChart;