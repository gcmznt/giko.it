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
    '%cNice to meet you 🍻! Welcome on my website.',
    'I am %c@giacomozinetti%c [https://twitter.com/giacomozinetti]',
    '',
    'This website is made with 💙, emoji and a lot of nerdy thing like:',
    '',
    '',
    'Sources',
    '- Sass',
    '- Autoprefixer',
    '- Jade',
    '- ES2015 and Babel',
    '- npm',
    '- Gulp',
    '- Git and Github',
    '- Linters',
    '- .editorconfig',
    '- BEM',
    '- Bithound.io',
'',
    'Server',
    '- Nginx',
    '- HTTP2',
    '- Let\'s Encrypt',
    '- Client Hints',
    '- Webp',
    '- New Relic',
'',
    'Client',
    '- Google Analytics',
    '- SVG icons',
    '- Print CSS',
    '- Responsive',
    '- CSS Custom Props',
    '- LocalStorage',
    '- AppCache',

    '',
    '%c🖖 Live long and prosper',
    '%cGiacomo Giko Zinetti - giacomo.zinetti@giko.it',
    '',
].join('\n');
const style = 'font-size: 12pt';
const highStyle = 'color:blue; font-size: 12pt';
console.log(msg, style, highStyle, '', style, '');
