import BaseLayout from "./base";

export default class FlightsLayout extends BaseLayout {
  constructor(style, title, data) {
    super(style, title);
    this.markers = [];
    this.polylines = [];
    this.citiesPoints = data.points;
    this.flightPaths = data.paths;
  }

  render() {
    this.citiesPoints.forEach((point) => {
      this.markers.push(this.map.renderMarker(point.lat, point.lon));
    });
    this.flightPaths.forEach((path) =>
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
