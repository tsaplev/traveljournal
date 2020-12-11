export default class App {
  constructor(map, layouts) {
    this.map = map;
    this.layouts = layouts;

    this.generateSelectors();
    this.setActionForSelectors();
    this.render();
  }

  generateSelectors() {
    Object.entries(this.layouts).forEach(([layoutType, layoutInstance]) => {
      Object.defineProperty(layoutInstance, "map", { value: this.map });
      const { title, style } = layoutInstance;
      this.map.createSelector(layoutType, title, style);
    });
  }

  setActionForSelectors() {
    this.map.onSelect(() => {
      Object.entries(this.layouts).forEach(([layoutType, layoutInstance]) => {
        if (this.map.selector !== layoutType) {
          layoutInstance.unmount();
        }
      });
      this.layouts[this.map.selector].render();
    });
  }

  render() {
    const [layout] = Object.values(this.layouts);
    layout.render();
  }
}
