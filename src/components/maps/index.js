export default class GoogleMaps {
  constructor(element, config) {
    this.map = new google.maps.Map(element, config);
    this.Marker = google.maps.Marker;
    this.Position = google.maps.LatLng;
    this.Polyline = google.maps.Polyline;
    this.Point = google.maps.Point;
    this.MapType = google.maps.StyledMapType;
  }

  createSelector(name, title, style) {
    this.map.mapTypes.set(name, new this.MapType(style, { name: title }));
  }

  get selector() {
    return this.map.getMapTypeId();
  }

  onSelect(callback) {
    this.map.addListener("maptypeid_changed", callback);
  }

  renderMarker(lat, lng) {
    return new this.Marker({
      map: this.map,
      position: new this.Position(lat, lng),
      icon: { url: "assets/mapmarker.png", anchor: new this.Point(6, 23) },
    });
  }

  renderPolyline(path, color) {
    return new this.Polyline({
      map: this.map,
      path,
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 0.9,
      strokeWeight: 2,
    });
  }

  renderGeoJSON(paths, callback) {
    const data = this.map.data.addGeoJson(paths);
    this.map.data.setStyle(callback);
    return data;
  }

  removeGeoJSON(paths) {
    paths.map((path) => this.map.data.remove(path));
  }
}
