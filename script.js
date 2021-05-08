let totalslider = document.querySelectorAll('.slider-item').length
document.querySelector('.slider-width').style.width = ` calc(100vw * ${totalslider})`
let currentSlider = 0

for(let i = 0 ; i < totalslider ; i++){
        document.querySelector('.sliders-pointers').innerHTML += `<div class="pointer" id="bannerSlider${i}" onclick="gonext(${i})" ></div>`
}
console.log( 1 == 1 ? 'sim' : 'nao')
// funçao que recebe o valor do click para percorrer o slide de fomra manual
function gonext(n){
    currentSlider = n
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
// funcao que auomatiza o slider
function attMargin(){
    currentSlider++
    for(let i = 0 ; i < totalslider ; i++){
        document.getElementById(`bannerSlider${i}`).style.backgroundColor = 'transparent'
    }
    if(currentSlider === totalslider) {
        currentSlider = 0
        document.getElementById(`bannerSlider${currentSlider}`).style.backgroundColor = 'rgb(4, 101, 192)'
    }
    document.getElementById(`bannerSlider${currentSlider}`).style.backgroundColor = 'rgb(4, 101 , 192)'
    let sliderwidth = document.querySelector('.slider-item').clientWidth
    let newMargin = (currentSlider * sliderwidth )
    document.querySelector('.slider-width').style.marginLeft = `-${newMargin}px`
} 
setInterval( attMargin , 5000)

/*
outra logica simples de se usar para atualizar a margem dos sliders é usando 'vw' ao inves de 'px'
function attMargin(){
    document.querySelector('.slider-width').style.marginLeft = `-${currentSlider * 100}vw`
}
*/
