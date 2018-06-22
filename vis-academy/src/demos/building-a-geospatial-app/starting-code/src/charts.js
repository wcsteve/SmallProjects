import React from "react";
import { charts } from "./style";

import { VerticalBarSeries, XAxis, XYPlot, YAxis } from "react-vis";

export default function Charts({ pickups }) {
  return (
    <div style={charts} />
  );
}
