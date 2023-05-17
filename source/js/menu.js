document.addEventListener("DOMContentLoaded", (event) => {
  const noJsHeader = document.querySelector('.page-header--nojs');
  noJsHeader.classList.remove("page-header--nojs");

  const menu = document.querySelector('.navigation__wrapper');
  const menuToggle = document.querySelector('.navigation__toggle');
  const menuButton = document.querySelector('.navigation__button');
  const menuActiveClass = 'navigation__wrapper--active';
  const menuToggleActiveClass = 'navigation__toggle--active';

  menuButton.addEventListener('click', function () {
    menuToggle.classList.toggle(menuToggleActiveClass);
    menu.classList.toggle(menuActiveClass);
  });
});
