const btnNextStep = document.querySelector('.btn-next-step');
const bg = document.querySelector('.bg-slider');
const track = document.querySelector('.all-item-slider');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.btn-slider-next');
const prevButton = document.querySelector('.btn-slider-prev');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);
const slideSize = slides[0].getBoundingClientRect();
const slideWidth = slideSize.width;
const allSlides = Array.prototype.slice.call(document.getElementsByClassName('item-slider'));


// slides[0].style.left = 0;
// slides[1].style.left = slideWidth + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';  0 2 4 6 8

const soluong = slides.length;

const setSlidePosition = (slide, index) => {
  //slide.style.transform = (100/soluong) * index + '%';
  slide.style.left = (100 / soluong) * index + '%';
}
// slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {

  let index = allSlides.indexOf(targetSlide);

  track.style.transform = 'translateX(-' + (100 / soluong) * index + '%)';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');


  //console.log(targetSlide.dataset.color);
  bg.style.backgroundColor = '#' + targetSlide.dataset.color;

}

const changeButton = (btnNextStep, slides, targetIndex) => {
  //console.log(targetIndex);
  //console.log(slides.length);
  if (targetIndex === slides.length - 1) {
    //console.log('last slide');
    btnNextStep.querySelector('span').innerHTML = 'Bắt đầu!';
    btnNextStep.classList.remove('btn-next-step');
    btnNextStep.classList.add('start');
    btnNextStep.removeEventListener('click', nextBtnHandle);
  } else if (targetIndex < slides.length - 1) {
    //console.log('prev slide');
    btnNextStep.querySelector('span').innerHTML = 'Tiếp theo';
    btnNextStep.classList.remove('start');
    btnNextStep.classList.add('btn-next-step');
    btnNextStep.addEventListener('click', nextBtnHandle);
  }
}


const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  if (typeof (targetDot) !== 'undefined') {
    targetDot.classList.add('current-slide');
  }
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
}

function nextBtnHandle(e) {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);

  changeButton(btnNextStep, slides, nextIndex);
  updateTransformNext(nextSlide, nextIndex, slides);
}

btnNextStep.addEventListener('click', nextBtnHandle);

const updateTransformNext = (nextSlide, targetIndex, slides) => {
  nextSlide.querySelector('.photos').style.transform = 'translateX(0)';
  let next = nextSlide.nextElementSibling;
  if (next) {
    next.querySelector('.photos').style.transform = 'translateX(100%)';
  }
  if (targetIndex == slides.length - 1) {
    let prev = nextSlide.previousElementSibling;
    if (prev) {
      prev.querySelector('.photos').style.transform = 'translateX(-100%)';
    }
  }
}
const updateTransformPrev = (prevSlide, targetIndex) => {

  prevSlide.querySelector('.photos').style.transform = 'translateX(0)';

  let prev = prevSlide.previousElementSibling;
  if (prev) {
    prev.querySelector('.photos').style.transform = 'translateX(-100%)';
  }

  if (targetIndex == 0) {
    let next = prevSlide.nextElementSibling;
    if (next) {
      next.querySelector('.photos').style.transform = 'translateX(100%)';
    }
  }
}

//click right,move slide to right
nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);

  changeButton(btnNextStep, slides, nextIndex);

  updateTransformNext(nextSlide, nextIndex, slides);

})
//click left,move slide to left
prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);
  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);

  changeButton(btnNextStep, slides, prevIndex);

  updateTransformPrev(prevSlide, prevIndex);
})

//click nav indicators,move to slide
dotsNav.addEventListener('click', e => {
  const targetDot = e.target.closest('button');
  if (!targetDot) return;
  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];
  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);

  changeButton(btnNextStep, slides, targetIndex);

  updateTransformNext(targetSlide, targetIndex, slides);
  updateTransformPrev(targetSlide, targetIndex);
});


document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt, targetIndex) {
  return evt.touches || // browser API
    evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt, targetIndex) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
};

function handleTouchMove(evt, targetIndex) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      const currentSlide = track.querySelector('.current-slide');
      const nextSlide = currentSlide.nextElementSibling;
      if (nextSlide) {
        nextButton.click();
      }

    } else {
      const currentSlide = track.querySelector('.current-slide');
      const prevSlide = currentSlide.previousElementSibling;
      if (prevSlide) {
        prevButton.click();
      }

    }
  } else {
    if (yDiff > 0) {
      /* up swipe */
    } else {
      /* down swipe */
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
};