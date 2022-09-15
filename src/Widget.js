import React from "react";
import Charts from "./Chart";
import { Input, Spinner, Card, Button, CardTitle } from "reactstrap";

class Widget extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: false,
      url: "",
      chartType: "line"
    };

    this.fetchFile = this.fetchFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  fetchFile() {
    this.setState((prevState) => ({
      data: prevState.data,
      loading: true
    }));

    const url = this.state.url;
    const chartType = this.state.chartType;
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          result.chart = { type: chartType };
          console.log(result);
          this.setState({
            data: result,
            loading: false
          });
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  }

  render() {
    if (this.state.loading)
      return (
        <div style={{ height: "300px", lineHeight: "300px" }}>
          <Spinner color="secondary" />
        </div>
      );

    if (this.state.data.length < 1)
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
            <Input id="input1" name="url" onChange={this.handleChange}></Input>
            <br />
            <label>Select chart type</label>
            <select
              id="select1"
              className="form-control"
              name="chartType"
              onChange={this.handleChange}
            >
              <option value="line">Line</option>
              <option value="scatter">Scatter</option>
              <option value="column">Column</option>
            </select>
            <br />
            <Button color="primary" onClick={this.fetchFile}>
              Convert
            </Button>
          </Card>
        </div>
      );

    return <Charts data={this.state.data}></Charts>;
  }
}

export default Widget;
