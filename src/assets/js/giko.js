/* global ga */
let colorto;

const setColor = function(value, color = 'primary') {
    clearTimeout(colorto);
    const style = document.querySelector('body').style;
    style.removeProperty(`--color-${color}`);
    style.setProperty(`--color-${color}`, value);
    localStorage.setItem(`--color-${color}`, value);
    colorto = setTimeout(function() {
        ga('send', 'event', 'color', 'change', value);
    }, 1000);
};

const changeColor = function(e) {
    setColor(e.target.value, 'primary');
};

const toggleMode = function() {
    const bodyClasses = document.querySelector('body').classList;
    bodyClasses.toggle('is-nerdy');
    bodyClasses.contains('is-nerdy') && ga('send', 'event', 'modal', 'open');
};

const domReady = function() {
    const savedColor = localStorage.getItem('--color-primary');
    savedColor && setColor(savedColor, 'primary');

    document
        .querySelector('.js-color-switcher')
        .addEventListener('change', changeColor);
    document
        .querySelector('.js-toggler')
        .addEventListener('click', toggleMode);
};

document.addEventListener('DOMContentLoaded', domReady);

const msg = [
    '%cNice to meet you 🍻!',
    'I am %c@giacomozinetti%c [https://twitter.com/giacomozinetti]%c.',
    'Welcome on my website',
].join(' ');
const style = 'font-size: 12pt';
const highStyle = 'color:blue; font-size: 12pt';
console.log(msg, style, highStyle, '', style);
