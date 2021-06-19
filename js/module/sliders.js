import Debounce from './debounce.js';

class Slide {
  constructor(slidecontent, slides) {
    this.wrapper = document.querySelector(slidecontent);
    this.slide = document.querySelector(slides);

    // obejto responsavel por quardar as posiçoes de moventaçao do cursor
    this.distancia = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
      finalMovement: 0,
    };

    // evento criado para observar quando tiver mudança de slide e
    // atualizar os pointers conforme mudança
    this.changeEventTolltip = new Event('changedtooltip');
  }

  // move o slide conforme posiçao atualizada do cursor
  moveSlide(distX) {
    this.distancia.finalMovement = distX;
    this.slide.style.transform = `translate3d(${-distX}px , 0 , 0)`;
  }

  // atualiza a posiçao do cursor do mouser
  updatePosition(clientX) {
    this.distancia.movement = (this.distancia.startX - clientX) * 2;
    return this.distancia.movement + this.distancia.finalPosition;
  }

  eventup(event) {
    this.slide.style.transition = ' transform .5s';
    const eventType = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
    this.distancia.finalPosition = this.distancia.finalMovement;
    this.wrapper.removeEventListener(eventType, this.eventmove);
    this.navSlideActive();
    this.distancia.movement = 0;
  }

  eventmove(event) {
    let move;
    if (event.type === 'mousemove') {
      move = this.updatePosition(event.clientX);
    } else {
      move = this.updatePosition(event.changedTouches[0].clientX);
    }
    this.moveSlide(move);
  }

  eventdown(event) {
    this.slide.style.transition = '';
    let eventType = '';
    if (event.type === 'mousedown') {
      event.preventDefault();
      this.distancia.startX = event.clientX;
      eventType = 'mousemove';
    } else {
      this.distancia.startX = event.changedTouches[0].clientX;
      eventType = 'touchmove';
    }
    this.wrapper.addEventListener(eventType, this.eventmove);
  }

  // eventos de mouser e touch
  addEvents() {
    this.wrapper.addEventListener('mousedown', this.eventdown);
    this.wrapper.addEventListener('touchstart', this.eventdown);
    this.wrapper.addEventListener('mouseup', this.eventup);
    this.wrapper.addEventListener('touchend', this.eventup);
    window.addEventListener('resize', this.onResize);
  }

  // metodo responsavel por amarrar o this ao objeto
  eventThisBind() {
    this.eventdown = this.eventdown.bind(this);
    this.eventmove = this.eventmove.bind(this);
    this.eventup = this.eventup.bind(this);
    this.navSlideNext = this.navSlideNext.bind(this);
    this.navSlidePrev = this.navSlidePrev.bind(this);
    this.onResize = Debounce(this.onResize.bind(this));
  }

  // configuraçao geral de navegaçao dos slides
  positionConfig() {
    this.slideArrey = Array.from(this.slide.children).map((element) => {
      const position = this.positionSlide(element);
      return { element, position };
    });
  }

  positionSlide(element) {
    this.margin = (window.innerWidth - element.offsetWidth) / 2;
    return (element.offsetLeft - this.margin);
  }

  selectSlide(index) {
    const last = this.slideArrey.length - 1;
    this.index = {
      prev: index === 0 ? undefined : index - 1,
      active: index,
      next: index === last ? undefined : index + 1,
    };
    return this.index;
  }

  navSlide(index) {
    this.slideArrey.forEach((el) => el.element.classList.remove('active'));
    const activeSlide = this.slideArrey[index];
    activeSlide.element.classList.add('active');
    this.moveSlide(activeSlide.position);
    this.selectSlide(index);
    this.distancia.finalPosition = activeSlide.position;
    this.wrapper.dispatchEvent(this.changeEventTolltip);
  }

  navSlideNext() {
    this.navSlide(this.index.next);
  }

  navSlidePrev() {
    this.navSlide(this.index.prev);
  }

  navSlideActive() {
    if (this.distancia.movement > 120 && this.index.next !== undefined) this.navSlideNext();
    else if (this.distancia.movement < -120 && this.index.prev !== undefined) this.navSlidePrev();
    else this.navSlide(this.index.active);
  }

  // metodo resposavel por centralizar a imagem quando ouver resize
  onResize() {
    setTimeout(() => {
      this.positionConfig();
      this.navSlide(this.index.active);
    }, 1000);
  }

  // metodo renponsavel por iniciar a class
  init(index) {
    this.eventThisBind();
    this.addEvents();
    this.positionConfig();
    this.navSlide(index);
    return this;
  }
}

export default class SlideControls extends Slide {
  // seleciona os botões e add o evento aos mesmo
  nextPrevButtons(btnPrev, BtnNext) {
    this.btnPrev = document.querySelector(btnPrev);
    this.btnNext = document.querySelector(BtnNext);
    this.addEventButtons();
  }

  // configuraçao das tooltips por imagens
  creatTooltip(options) {
    let toolpits;
    if (options) {
      toolpits = options;
    } else {
      toolpits = document.createElement('ul');
      toolpits.dataset.tooltip = 'slide';
      this.slideArrey.forEach((item) => {
        toolpits.innerHTML += `<li>${item.element.innerHTML}</li>`;
      });
    }
    return toolpits;
  }

  eventTooltip() {
    this.arrayLi = [...this.tooltip.children];
    this.arrayLi.forEach((tooltip, index) => {
      tooltip.addEventListener('click', () => {
        this.navSlide(index);
        this.tooltipActive();
      });
    });
  }

  tooltipActive(index = this.index.active) {
    this.arrayLi.forEach((el) => el.classList.remove('active'));
    this.arrayLi[index].classList.add('active');
  }

  inserteTooltipBody() {
    this.wrapper.appendChild(this.tooltip);
  }

  // add os eventos aos botões
  addEventButtons() {
    this.btnPrev.addEventListener('click', this.navSlidePrev);
    this.btnNext.addEventListener('click', this.navSlideNext);
  }

  // evento responsavel por cuidar a mudança dos slides e atualiza as tooltips
  eventupdatetooltp() {
    this.wrapper.addEventListener('changedtooltip', () => {
      Debounce(this.tooltipActive());
    });
  }

  // inicia as funcionalidades com index padrao ou que sera passado
  initSlideControls(index = 4) {
    this.init(index);
    this.eventupdatetooltp();
    this.tooltip = this.creatTooltip();
    this.inserteTooltipBody();
    this.eventTooltip();
    this.tooltipActive(this.index.active);
    return this;
  }
}
