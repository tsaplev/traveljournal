import BaseLayout from "./base";

export default class PlacesLayout extends BaseLayout {
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
