import React, { useState } from "react";
import Charts from "./Chart";
import { Input, Spinner, Card, Button, CardTitle } from "reactstrap";

function Widget() {

  const [chartState, setChartState] = useState({
    data: undefined,
    url: "",
    chartType: "line"
  })

  const [loading, setLoading] = useState(false)


  function handleChange(e) {
    const {name,value} = e.target
    setChartState(prevState => ({
      ...prevState,
      [name]:value
    }));
  }

  function fetchFile() {
    setLoading(true)

    const url = chartState.url;
    const chartType = chartState.chartType;

    fetch(url)
      .then(res => res.json())
      .then(

        result => {
          result.chart = { type: chartType };
          console.log(result);
          setChartState(prevState => ({
            ...prevState,
            data: result
          }));

          setLoading(false)
        },

        (error) => {
          console.log(error);
          alert(error);

          setLoading(false)
        }

      );
  }

  
    if (loading)
      return (
        <div style={{ height: "300px", lineHeight: "300px" }}>
          <Spinner color="secondary" />
        </div>
      );

    if (!chartState.data)
      return (
        <div
          style={{
            height: "300px",
            width: "100%"
          }}
        >
          <br />
          <Card body>
            <CardTitle>Enter URL to fetch JSON data</CardTitle>
            <Input id="input1" name="url" onChange={handleChange}></Input>
            <br />
            <label>Select chart type</label>
            <select
              id="select1"
              className="form-control"
              name="chartType"
              onChange={handleChange}
            >
              <option value="line">Line</option>
              <option value="scatter">Scatter</option>
              <option value="column">Column</option>
            </select>
            <br />
            <Button color="primary" onClick={fetchFile}>
              Convert
            </Button>
          </Card>
        </div>
      );

    return <Charts data={chartState.data}></Charts>;
  
}

export default Widget;
