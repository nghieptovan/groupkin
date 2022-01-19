class ScreenSize {
  constructor() {

  }

  componentDidMount() {
    window.addEventListener('resize', this.isMobile);
    this.isMobile();
  }

  get isMobile() {
    if (window.innerWidth < 768) {
      return true;
    }
    return false;
  }

  get isBiggerThan1366() {
    if (window.innerWidth > 1365) {
      return true;
    }
    return false;
  }

}

export default new ScreenSize()