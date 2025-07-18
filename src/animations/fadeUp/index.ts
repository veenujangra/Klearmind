import Animation from '..'
import gsap from 'gsap'

export default class FadeUp extends Animation {
  settings: { delay: string; duration: string; ease: string }
  tl: any

  constructor(options: { element: HTMLElement }) {
    super(options)
    this.element = options.element
    this.settings = {
      delay: this.element.getAttribute('data-delay') || '0',
      duration: this.element.getAttribute('data-duration') || '0.63',
      ease: this.element.getAttribute('data-ease') || 'power1.in',
    }

    this.create()
  }

  create() {
    // Initialize any properties or elements specific to the fade-up animation
    this.setProperties()
  }

  setProperties() {
    // Set initial properties for the fade-up animation
    gsap.set(this.element, {
      opacity: 0,
      y: 20,
    })
  }

  animateIn() {
    if (this.tl) {
      this.tl.kill()
    }
    if (!this.element || this.element.classList.contains('is-animated')) return
    this.tl = gsap.timeline({})

    // Animation logic for when the element comes into view
    this.tl.to(this.element, {
      duration: this.settings.duration,
      opacity: 1,
      y: 0,
      ease: this.settings.ease,
      delay: parseFloat(this.settings.delay),
      onComplete: () => {
        this.element.classList.add('is-animated')
      },
    })
  }

  animateOut() {
    // Animation logic for when the element goes out of view
    // this.tl.to(this.element, {
    //   autoAlpha: 0,
    //   y: -20,
    //   duration: 0.63,
    //   ease: 'power1.out',
    // })
  }
}
