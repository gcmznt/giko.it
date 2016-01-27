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
    let bodyClasses = document.querySelector('body').classList;
    bodyClasses.toggle('is-nerdy');
    bodyClasses.contains('is-nerdy') && ga('send', 'event', 'modal', 'open');
};

const domReady = function() {
    document
        .querySelector('.js-color-switcher')
        .addEventListener('change', changeColor);
    document
        .querySelector('.js-toggler')
        .addEventListener('click', toggleMode);

    var savedColor = localStorage.getItem('--color-primary');
    savedColor && setColor(savedColor, 'primary');
};

document.addEventListener('DOMContentLoaded', domReady);
