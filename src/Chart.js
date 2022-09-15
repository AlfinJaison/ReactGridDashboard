import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

require("highcharts/modules/exporting")(Highcharts);

function Charts({ data }) {

  const [options, setOptions] = useState(data)

  return (
    <div>
      <HighchartsReact
        constructorType={"chart"}
        highcharts={Highcharts}
        options={options}
        containerProps={{ className: "chartContainer" }}
      />
    </div>
  );

}


export default Charts;
