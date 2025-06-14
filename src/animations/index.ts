export default class Animation {
  protected element: HTMLElement
  private observerOptions: IntersectionObserverInit = {}
  private observer: IntersectionObserver = new IntersectionObserver(() => {})
  private onResize: () => void = () => {}

  constructor(options: { element: HTMLElement }) {
    this.element = options.element

    this.createObserver()
    this.addEventListener()
  }

  createObserver() {
    this.observerOptions = {
      rootMargin: this.element.getAttribute('data-root-margin') || '0px 0px 0px 0px',
      threshold: parseFloat(this.element.getAttribute('data-threshold') || '0'),
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateIn()
        } else {
          this.animateOut()
        }
      })
    }, this.observerOptions)

    this.observer.observe(this.element)
  }

  animateIn() {}
  animateOut() {}

  addEventListener() {
    this.onResize = this.onResize.bind(this)
    window.addEventListener('resize', this.onResize)
  }
}
