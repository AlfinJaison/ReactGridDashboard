import React from "react";
import { Button } from "reactstrap";
import { Responsive, WidthProvider } from "react-grid-layout";
import Widget from "./Widget";
import { RiDragMove2Fill } from "react-icons/ri";
import exportToPdf from "./exportToPdf";

const ResponsiveGridLayout = WidthProvider(Responsive);
const default_Layout = {
  widgets: [{ id: 1 }],
  widgetSequence: 1,
  layouts: {}
};
const originalLayouts = getFromLS("Layout") || default_Layout;

class Grid extends React.Component {
  constructor() {
    super();
    this.state = originalLayouts;

    this.addWidget = this.addWidget.bind(this);
    this.removeWidget = this.removeWidget.bind(this);
  }

  exportPdf() {
    exportToPdf();
  }

  addWidget() {
    this.setState((prevState) => ({
      widgets: [...prevState.widgets, { id: prevState.widgetSequence + 1 }],
      widgetSequence: prevState.widgetSequence + 1
    }));
  }

  removeWidget(id) {
    this.setState((prevState) => ({
      widgets: prevState.widgets.filter((item) => item.id !== id),
      //do not decrement sequence, since each new widget must
      //have unique value
      widgetSequence: prevState.widgetSequence
    }));
  }

  onLayoutChange(layout, layouts) {
    window.dispatchEvent(new Event("resize"));
    this.setState({
      layouts: layouts
    });
    saveToLS("Layout", this.state);
  }

  render() {
    const config = {
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      maxH: 1,
      maxW: 2
    };
    const layouts = this.state.widgets.map((item) => (
      <div className="widget" key={item.id} data-grid={config}>
        <div style={{ width: "100%", height: "100%" }}>
          <div className="widgetHeader">
            <div className="dragHandle">
              <RiDragMove2Fill className="dragIcon"></RiDragMove2Fill>
            </div>
            <Button
              className="closeBtn"
              color="danger"
              size="sm"
              onClick={() => this.removeWidget(item.id)}
            >
              X
            </Button>
          </div>
          <Widget></Widget>
        </div>
      </div>
    ));

    return (
      <div>
        <div className="toolBar">
          <Button color="primary" size="sm" onClick={this.addWidget}>
            Add Chart Widget
          </Button>
          <Button color="primary" size="sm" onClick={this.exportPdf}>
            Export to PDF
          </Button>
        </div>
        <br />
        <ResponsiveGridLayout
          className="layout"
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 4, md: 3, sm: 2, xs: 1, xxs: 1 }}
          rowHeight={370}
          draggableHandle={".dragHandle"}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          {layouts}
        </ResponsiveGridLayout>
      </div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rdv_layout")) || {};
    } catch (e) {
      console.log(e);
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rdv_layout",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

export default Grid;
