let active = false;

document.querySelector('.slider__control').addEventListener('mousedown', function () {
  active = true;
  document.querySelector('.slider__control').classList.add('slider__control--scrolling');
});
document.body.addEventListener('mouseup', function () {
  active = false;
  document.querySelector('.slider__control').classList.remove('slider__control--scrolling');
});
document.body.addEventListener('mouseleave', function () {
  active = false;
  document.querySelector('.slider__control').classList.remove('slider__control--scrolling');
});

document.body.addEventListener('mousemove', function (e) {
  if (!active) return;
  let x = e.pageX;
  x -= document.querySelector('.slider').getBoundingClientRect().left;
  scrollIt(x);
});

function scrollIt(x) {
  let transform = Math.max(0, (Math.min(x, document.querySelector('.slider').offsetWidth)));
  document.querySelector('.slider__slide--after').style.width = transform + "px";
  document.querySelector('.slider__control').style.left = transform - 18 + "px";
}

document.querySelector('.slider__control').addEventListener('touchstart', function () {
  active = true;
  document.querySelector('.slider__control').classList.add('slider__control--scrolling');
});
document.body.addEventListener('touchend', function () {
  active = false;
  document.querySelector('.slider__control').classList.remove('slider__control--scrolling');
});
document.body.addEventListener('touchcancel', function () {
  active = false;
  document.querySelector('.slider__control').classList.remove('slider__control--scrolling');
});
