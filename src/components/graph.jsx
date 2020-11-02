import React from "react";
import { useSelector } from "react-redux";

import { getFunc } from "../store/func";
import { getParameters } from "../store/parameters";
import coordinates from "../utils/coordinates";

const COLOR = "#2196F3";
const SVGHEIGHT = 300;
const SVGWIDTH = 300;

//BUILD GRAPH
const Graph = () => {
  const func = useSelector(getFunc);
  const parameters = useSelector(getParameters);
  const data = coordinates(func, parameters);
  const cleanedData = data.filter(
    (point) =>
      (point.y && isFinite(point.y) && !isNaN(point.y)) || point.y === 0
  );
  const len = cleanedData.length;

  if (len === 0) return null;

  // GET MAX & MIN X
  const getMinX = cleanedData[0].x;
  const getMaxX = cleanedData[len - 1].x;

  // GET MAX & MIN Y
  const getMinY = cleanedData.reduce(
    (min, p) => (p.y < min ? p.y : min),
    cleanedData[0].y
  );
  const getMaxY = cleanedData.reduce(
    (max, p) => (p.y > max ? p.y : max),
    cleanedData[0].y
  );

  //GET SCALE
  const scale = (getMaxX - getMinX) / (getMaxY - getMinY);

  // GET SVG COORDINATES
  const getSvgX = (x, length) => {
    return scale < 1
      ? (x / (length - 1)) * SVGWIDTH * scale
      : (x / (length - 1)) * SVGWIDTH;
  };

  const getSvgY = (y, length) => {
    if (scale > 1) {
      return getMaxY !== getMinY
        ? (SVGHEIGHT - ((y - getMinY) / (getMaxY - getMinY)) * SVGHEIGHT) /
            scale
        : (0.5 - y / length) * SVGHEIGHT;
    } else {
      return getMaxY !== getMinY
        ? SVGHEIGHT - ((y - getMinY) / (getMaxY - getMinY)) * SVGHEIGHT
        : (0.5 - y / length) * SVGHEIGHT;
    }
  };

  // BUILD SVG PATH
  const makePath = () => {
    let pathD = "M " + 0 + " " + getSvgY(cleanedData[0].y, len) + " ";

    pathD += cleanedData.map((point, i) => {
      return (
        ((point.y === getMaxY &&
          cleanedData[i - 1]?.y === getMinY &&
          getMaxY !== getMinY) ||
        (point.y === getMinY &&
          cleanedData[i - 1]?.y === getMaxY &&
          getMaxY !== getMinY)
          ? "M "
          : "L ") +
        getSvgX(i, len) +
        " " +
        getSvgY(point.y, len) +
        " "
      );
    });

    return (
      <path className="linechart_path" d={pathD} style={{ stroke: COLOR }} />
    );
  };

  // BUILD GRID AXIS
  const makeAxis = () => {
    const index = cleanedData.findIndex((item) => item.x === 0);

    return (
      <g className="linechart_axis">
        <line
          x1={-10}
          y1={getSvgY(0, len)}
          x2={SVGWIDTH}
          y2={getSvgY(0, len)}
        />
        <line
          x1={getSvgX(index, len)}
          y1={0}
          x2={getSvgX(index, len)}
          y2={SVGHEIGHT + 10}
        />
      </g>
    );
  };

  return (
    <div className="graph">
      <svg viewBox={`-10 -10 ${SVGWIDTH + 20} ${SVGHEIGHT + 20}`}>
        {makePath()}
        {makeAxis()}
      </svg>
    </div>
  );
};

export default Graph;
