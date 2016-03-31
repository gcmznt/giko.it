/* global ga */
(function() {
    navigator.vibrate = navigator.vibrate|| navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    let setColorTimeOut;

    const setColor = function(value, color = 'primary') {
        const style = document.querySelector('body').style;
        style.removeProperty(`--color-${color}`);
        style.setProperty(`--color-${color}`, value);
        localStorage.setItem(`--color-${color}`, value);
        navigator.vibrate(200);
    };

    const changeColor = function(e) {
        clearTimeout(setColorTimeOut);
        setColor(e.target.value, 'primary');
        setColorTimeOut = setTimeout(function() {
            ga && ga('send', 'event', 'color', 'change', e.target.value);
        }, 1000);
    };

    const savedColor = localStorage.getItem('--color-primary');
    savedColor && setColor(savedColor, 'primary');

    document.querySelector('.js-color-switcher')
        .addEventListener('change', changeColor);

    const picker = document.querySelector('.🔴--🃏');

    window.addEventListener("deviceorientation", function (event) {
        // const alpha = event.alpha;
        // const beta = event.beta;
        const gamma = event.gamma;
        const center = 0;
        const offset = 30;
        const animationLength = 1000;

        if (gamma > (center + offset) && picker.classList.contains('⬅️')) {
            picker.classList.remove('⬅️');
        }

        if (gamma < (center - offset) && !picker.classList.contains('⬅️')) {
            picker.classList.add('⬅️');
        }
    });

    picker.addEventListener("transitionend", function (event) {
        const vibrationLength = 200;
        if (event.propertyName === 'transform') {
            navigator.vibrate(200);
        }
    });

    const msg = [
        '',
        '',
        '',
        '%cNice to meet you 🍻! Welcome on my website.',
        'I am @giacomozinetti%c [https://twitter.com/giacomozinetti]',
        '',
        'This website is coded with 💙, emoji and a lot of nerdy thing like:',
        '',
        '',
        'Sources',
        '- Sass',
        '- Autoprefixer',
        '- Pug (Jade)',
        '- ES2015 and Babel',
        '- npm',
        '- Gulp',
        '- Git and Github',
        '- Linters',
        '- .editorconfig',
        '- BEM + Emoji = BEMoji',
        '- Bithound.io',
        '',
        'Server',
        '- Nginx',
        '- Gzip',
        '- HTTP2',
        '- Let\'s Encrypt',
        '- Client Hints',
        '- Webp',
        '- New Relic',
        '- Content Security Policy',
        '',
        'Client',
        '- Google Analytics',
        '- SVG icons',
        '- Print CSS',
        '- Responsive',
        '- CSS Custom Props',
        '- LocalStorage',
        '- AppCache',
        '- Humans.txt',
        '- Vibration API',
        '- Orientation API',
        '',
        '%c🖖 Live long and prosper',
        '%cGiacomo Giko Zinetti - giacomo.zinetti@giko.it',
        '',
        '',
        '',
    ].join('\n');

    const style = 'font-size: 12pt';
    console.log(msg, style, '', style, '');
})();
