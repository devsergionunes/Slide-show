let totalslider = document.querySelectorAll('.slider-item').length
document.querySelector('.slider-width').style.width = ` calc(100vw * ${totalslider})`
let currentSlider = 0

for(let i = 0 ; i < totalslider ; i++){
        document.querySelector('.sliders-pointers').innerHTML += `<div class="pointer" id="bannerSlider${i}" onclick="gonext(${i})" ></div>`
}
// funçao que recebe o valor do click para percorrer o slide de fomra manual ou o valor se auto incrementa por conta da funçao setInterval
function gonext(n){
    n !== undefined ? currentSlider = n : currentSlider++
    for(let i = 0 ; i < totalslider ; i++){
        document.getElementById(`bannerSlider${i}`).style.backgroundColor = 'transparent'
    }
    if(currentSlider === totalslider) {
        currentSlider = 0
        document.getElementById(`bannerSlider${currentSlider}`).style.backgroundColor = 'rgb(4, 101, 192)'
    }
    document.getElementById(`bannerSlider${currentSlider}`).style.backgroundColor = 'rgb(4, 101 , 192)'
    document.querySelector('.slider-width').style.marginLeft = `-${currentSlider * 100}vw`
} 
setInterval( gonext , 5000)

/*
outra logica simples de se usar para atualizar a margem dos sliders é usando 'px' ao inves de 'vw'
function attMargin(){
    let sliderwidth = document.querySelector('.slider-item').clientWidth
    let newMargin = (currentSlider * sliderwidth )
    document.querySelector('.slider-width').style.marginLeft = `-${newMargin}px`
}
*/
