import SlideControls from './module/sliders.js'

const slide = new SlideControls('.slide-wrapper', '.slide')
slide.initSlideControls()
slide.nextPrevButtons('.buttons .btn-prev', '.buttons .btn-next')
