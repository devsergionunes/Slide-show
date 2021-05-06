let totalslider = document.querySelectorAll('.slider-item').length
document.querySelector('.slider-width').style.width = ` calc(100vw * ${totalslider})`
document.querySelector('.slider-controles').style.height = `${document.querySelector('.slider').clientHeight}px`
let currentSlider = 0

function gonext(){
    currentSlider++
    if(currentSlider === totalslider ){
        currentSlider = totalslider - totalslider
    }
    attMargin()
    console.log('next'+ currentSlider)
}
function goprev(){
    currentSlider--
    if(currentSlider === -1 ) {
        currentSlider = totalslider - 1
    }
    attMargin()
    console.log('prev'+ currentSlider)
}
function attMargin(){
    let sliderwidth = document.querySelector('.slider-item').clientWidth
    let newMargin = (currentSlider * sliderwidth )
    document.querySelector('.slider-width').style.marginLeft = `-${newMargin}px`
} 
setInterval(gonext , 5000)

/*
outra logica simples de se usar para atualizar a margem dos sliders é usando 'vw' ao inves de 'px'
function attMargin(){
    document.querySelector('.slider-width').style.marginLeft = `-${currentSlider * 100}vw`
}
*/
