/* global ga */
let colorto;

const setColor = function(value, color = 'primary') {
    const style = document.querySelector('body').style;
    style.removeProperty(`--color-${color}`);
    style.setProperty(`--color-${color}`, value);
    localStorage.setItem(`--color-${color}`, value);
};

const changeColor = function(e) {
    clearTimeout(colorto);
    setColor(e.target.value, 'primary');
    colorto = setTimeout(function() {
        ga && ga('send', 'event', 'color', 'change', value);
    }, 1000);
};

const domReady = function() {
    const savedColor = localStorage.getItem('--color-primary');
    savedColor && setColor(savedColor, 'primary');

    document.querySelector('.js-color-switcher')
        .addEventListener('change', changeColor);
}();


const msg = [
    '%cNice to meet you 🍻!',
    'I am %c@giacomozinetti%c [https://twitter.com/giacomozinetti]%c.',
    'Welcome on my website',
].join(' ');
const style = 'font-size: 12pt';
const highStyle = 'color:blue; font-size: 12pt';
console.log(msg, style, highStyle, '', style);
