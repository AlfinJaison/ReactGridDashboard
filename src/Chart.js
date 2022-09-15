import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

require("highcharts/modules/exporting")(Highcharts);

class Charts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: props.data
    };
  }

  render() {
    return (
      <div>
        <HighchartsReact
          constructorType={"chart"}
          highcharts={Highcharts}
          options={this.state.options}
          containerProps={{ className: "chartContainer" }}
        />
      </div>
    );
  }
}

export default Charts;
