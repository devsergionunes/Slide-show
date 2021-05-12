let widthNavegador = document.body.clientWidth
let totalslider = document.querySelectorAll('.slider-item').length
let widthSlider = document.querySelector('.slider-width')
widthSlider.style.width = `${(totalslider * widthNavegador)}px`
let currentSlider = 0
for (let i = 1; i < totalslider; i++) {
    if (i === 1) {
        document.querySelector('.sliders-pointers').innerHTML += '<div class="pointer active"></div>'
    }
    document.querySelector('.sliders-pointers').innerHTML += '<div class="pointer"></div>'
}
const pointers = document.querySelectorAll('.sliders-pointers .pointer')
function selctSlider(index) {
    index !== undefined ? currentSlider = index : currentSlider = currentSlider
    pointers.forEach((item) => {
        item.classList.remove('active')
    })
    document.querySelector('.slider-width').style.marginLeft = `-${(currentSlider * widthNavegador)}px`
    pointers[currentSlider].classList.add('active')
    currentSlider++
    if (currentSlider === totalslider) {
        currentSlider = 0
    }
}
window.onload = function () {
    pointers.forEach((item, index) => {
        item.addEventListener('click', () => {
            selctSlider(index)
        })
    })
    setInterval(selctSlider, 5000)
}