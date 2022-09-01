import { sum } from './images.js';

let currentIndex = 0;

const photos = document.querySelectorAll('.photo')
const counter = document.querySelector('.slider__counter')
const buttons = document.querySelectorAll('.slider__button')
const dotContainer = document.querySelector('.slider__dots');
const individualDots = document.querySelectorAll('.dot__index');

const setCounter = () => {
  counter.innerHTML = `${currentIndex + 1} / ${photos.length}`
};

setCounter();

buttons.forEach(item => {
  item.addEventListener('click', switchPhoto)
})

function switchPhoto() {
  if (this.classList.contains('prev')) {
    currentIndex -= 1
    checkForTurnover()
  } else {
    currentIndex += 1
    checkForTurnover()
  } setActiveElements()
}

const checkForTurnover = () => {
  if (currentIndex > photos.length - 1) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = photos.length - 1
  }
}

function setActiveElements() {
  photos.forEach(item => item.classList.remove('active'))
  photos[currentIndex].classList.toggle('active');
  individualDots.forEach(item => item.classList.remove('active'))
  individualDots[currentIndex].classList.toggle('active');
  setCounter()
}

// Alsó gombok működése

dotContainer.addEventListener('click', function (e) {
  if (e.target.className == 'dot__index') {
    currentIndex = [...individualDots].indexOf(e.target)
    setActiveElements()
  };
}
)

// // 
// const sliderContainer = document.querySelector(".carousel")
// sliderContainer.style.height = "50vh"
