import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Responsive, WidthProvider } from "react-grid-layout";
import Widget from "./Widget";
import { RiDragMove2Fill } from "react-icons/ri";
import exportToPdf from "./exportToPdf";
import useSaveLayoutOnChange from "./useSaveLayoutOnChange";

const ResponsiveGridLayout = WidthProvider(Responsive);


function Grid() {

  const default_Layout = {
    widgets: [{ id: 1 }],
    widgetSequence: 1,
    layouts: {}
  };

  // const [layoutState, setLayoutState] = useState(default_Layout)
  const [layoutState, setLayoutState] = useSaveLayoutOnChange(default_Layout)

  function addWidget() {
    setLayoutState(prevState => ({
      ...prevState,
      widgets: [...prevState.widgets, { id: prevState.widgetSequence + 1 }],
      widgetSequence: prevState.widgetSequence + 1
    }));
  }

  function removeWidget(id) {
    setLayoutState(prevState => ({
      ...prevState,
      widgets: prevState.widgets.filter((item) => item.id !== id),
    }));
  }

  function onLayoutChange(layout, layouts) {
    window.dispatchEvent(new Event("resize"));
    setLayoutState(prevState => ({
      ...prevState,
      layouts: layouts
    }));
  }


  const config = {
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    maxH: 1,
    maxW: 2
  };



  return (
    <div>
      <div className="toolBar">
        <Button color="primary" size="sm" onClick={addWidget}>
          Add Chart Widget
        </Button>
        <Button color="primary" size="sm" onClick={exportToPdf}>
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
        layouts={layoutState.layouts}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
      >
        {

          layoutState.widgets?.map(item => (
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
                    onClick={() => removeWidget(item.id)}
                  >
                    X
                  </Button>
                </div>
                <Widget></Widget>
              </div>
            </div>
          ))

        }
      </ResponsiveGridLayout>
    </div>
  );

}



export default Grid;
