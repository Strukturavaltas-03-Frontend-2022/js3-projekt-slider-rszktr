import { photoStorage, sliderHeight, slideshowTime } from './config.js';

const photoContainer = document.querySelector('.slider ul')
const dotContainer = document.querySelector('.slider__dots')
const counter = document.querySelector('.slider__counter')
const buttons = document.querySelectorAll('.slider__button')
const info = document.querySelector('.photo__info')


// Slider generálásának alap lépései
const addPhotoToSlider = (source, text) => {
  const photoListElement = document.createElement("li")
  photoListElement.classList.add('photo');

  const photoElement = new Image()
  photoElement.src = source;
  photoElement.alt = text;

  photoContainer.appendChild(photoListElement).appendChild(photoElement)
};

const addDotToSlider = () => {
  const dotElement = document.createElement('div')
  dotElement.classList.add('dot__index')
  dotContainer.appendChild(dotElement)
};


// Slider generálása
for (let i = 0; i < photoStorage.length; i++) {
  addPhotoToSlider(photoStorage[i].src, photoStorage[i].alt);
  addDotToSlider()
};

const firstPhoto = document.querySelector('.photo');
firstPhoto.classList.add('active');

const firstDot = document.querySelector('.dot__index');
firstDot.classList.add('active');

const sliderContainer = document.querySelector(".slider__container");
sliderContainer.style.height = sliderHeight;

let currentIndex = 0;


// Frissen generált elemek összegyűjtése
const photos = document.querySelectorAll('.photo');
const individualDots = document.querySelectorAll('.dot__index');


// Számláló és felirat megjelenítése
const setCounter = () => {
  counter.innerHTML = `${currentIndex + 1} / ${photos.length}`
};
setCounter();

const setInfo = () => {
  info.innerHTML = photoStorage[currentIndex].alt
};
setInfo();


// Automatikus váltás, paraméteres időintervallummal 
const slideshow = () => {
  currentIndex += 1
  checkForTurnover()
  setActiveElements()
};

let slideshowTimer = setInterval(slideshow, slideshowTime);

const resetTimer = () => {
  clearInterval(slideshowTimer);
  slideshowTimer = setInterval(slideshow, slideshowTime)
}

// Manuális váltás
buttons.forEach(item => {
  item.addEventListener('click', switchPhoto)
});

function switchPhoto() {
  if (this.classList.contains('prev')) {
    currentIndex -= 1;
    checkForTurnover()
  } else {
    currentIndex += 1;
    checkForTurnover()
  }
  setActiveElements();
};

const checkForTurnover = () => {
  if (currentIndex > photos.length - 1) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = photos.length - 1
  }
};

const changeActiveStatus = (nodeList) => {
  nodeList.forEach(item => item.classList.remove('active'));
  nodeList[currentIndex].classList.toggle('active')
};

function setActiveElements() {
  changeActiveStatus(photos);
  changeActiveStatus(individualDots);
  setCounter();
  setInfo()
  resetTimer();
};

// Alsó gombok működése
dotContainer.addEventListener('click', function (e) {
  if (e.target.className == 'dot__index') {
    currentIndex = [...individualDots].indexOf(e.target)
    setActiveElements()
  }
});