const BaseLayout = require("./base");

class CitiesLayout extends BaseLayout {
  constructor(style, title, data) {
    super(style, title);
    this.markers = [];
    this.points = Object.values(data);
  }

  render() {
    this.points.forEach((chunk) => {
      chunk.forEach((point) =>
        this.markers.push(this.map.renderMarker(point.lat, point.lon))
      );
    });
  }

  unmount() {
    this.markers.forEach((marker) => marker.setMap(null));
  }
}

module.exports = CitiesLayout;
