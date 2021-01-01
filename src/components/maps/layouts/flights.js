const BaseLayout = require("./base");

class FlightsLayout extends BaseLayout {
  constructor(style, title, data) {
    super(style, title);
    this.markers = [];
    this.polylines = [];
    this.airportsPoint = data.points;
    this.flightsPath = data.paths;
  }

  render() {
    this.airportsPoint.forEach((point) => {
      this.markers.push(this.map.renderMarker(point[0], point[1]));
    });

    this.flightsPath.forEach((path) =>
      this.polylines.push(
        this.map.renderPolyline(
          [
            { lat: parseFloat(path[0]), lng: parseFloat(path[1]) },
            { lat: parseFloat(path[2]), lng: parseFloat(path[3]) },
          ],
          path[4]
        )
      )
    );
  }

  unmount() {
    ["markers", "polylines"].forEach((item) =>
      this[item].forEach((marker) => marker.setMap(null))
    );
  }
}

module.exports = FlightsLayout;
