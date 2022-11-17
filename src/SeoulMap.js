import React, { useEffect } from "react";
import { geoMercator, geoPath, select } from "d3";
import "./SeoulMap.css";

function SeoulMap() {
  const mapData = require("./seoul_municipalities_geo_simple.json").features;
  const projection = geoMercator();
  const path = geoPath(projection);

  useEffect(() => {
    drawMap("#map-container");
  }, []);

  const drawMap = (target) => {
    const svg = select(target)
      .append("svg")
      .attr("width", 700 + "px")
      .attr("height", 700 + "px")
      .attr("id", "map-svg");

    const cities = svg.append("g").attr("id", "cities");
    cities
      .append("rect")
      .attr("width", 700 + "px")
      .attr("height", 700 + "px")
      .attr("id", "background");

    drawMunicipality(cities);
  };

  const drawMunicipality = (cities) => {
    cities
      .selectAll("path")
      .data(mapData)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("id", function (d) {
        return "path-" + d.properties.SIG_KOR_NM;
      });
  };

  return (
    <>
      <div id="map-container">지도 자리</div>
    </>
  );
}

export default SeoulMap;
