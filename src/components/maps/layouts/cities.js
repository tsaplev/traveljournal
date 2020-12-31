const BaseLayout = require("./base");

class CitiesLayout extends BaseLayout {
  constructor(style, title, data) {
    super(style, title);
    this.markers = [];
    this.points = Object.values(data);
  }

  render() {
    this.points.forEach((point) => {
      const [lat, lon] = point;
      this.markers.push(this.map.renderMarker(lat, lon));
    });
  }

  unmount() {
    this.markers.forEach((marker) => marker.setMap(null));
  }
}

module.exports = CitiesLayout;
