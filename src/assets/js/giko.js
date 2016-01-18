const setColor = function(value, color = 'primary') {
    const style = document.querySelector('body').style;
    style.removeProperty(`--color-${color}`);
    style.setProperty(`--color-${color}`, value);
};

const changeColor = function(e) {
    setColor(e.target.value, 'primary');
};

const toggleMode = function() {
    document.querySelector('body').classList.toggle('is-nerdy');
};

const domReady = function() {
    document
        .querySelector('.js-color-switcher')
        .addEventListener('change', changeColor);
    document
        .querySelector('.js-toggler')
        .addEventListener('click', toggleMode);
};

document.addEventListener('DOMContentLoaded', domReady);
