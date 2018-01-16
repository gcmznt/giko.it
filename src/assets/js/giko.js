/* global ga */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-28055358-4', 'auto');
ga('send', 'pageview');

(function() {

  const loadDeferredStyles = function() {
    const addStylesNode = document.getElementById('deferred-styles');
    const replacement = document.createElement('div');
    replacement.innerHTML = addStylesNode.textContent;
    document.body.appendChild(replacement)
    addStylesNode.parentElement.removeChild(addStylesNode);
  };
  if (requestAnimationFrame) {
    requestAnimationFrame(() => window.setTimeout(loadDeferredStyles, 0));
  } else {
    window.addEventListener('load', loadDeferredStyles);
  }

})();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

(function() {
    // navigator.vibrate = navigator.vibrate|| navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    // let setColorTimeOut;

    // const setColor = function(value, color = 'primary') {
    //     const style = document.querySelector('body').style;
    //     style.removeProperty(`--color-${color}`);
    //     style.setProperty(`--color-${color}`, value);
    //     localStorage.setItem(`--color-${color}`, value);
    //     navigator.vibrate(200);
    // };

    // const changeColor = function(e) {
    //     clearTimeout(setColorTimeOut);
    //     setColor(e.target.value, 'primary');
    //     setColorTimeOut = setTimeout(function() {
    //         ga && ga('send', 'event', 'color', 'change', e.target.value);
    //     }, 1000);
    // };

    // const savedColor = localStorage.getItem('--color-primary');
    // savedColor && setColor(savedColor, 'primary');

    // document.querySelector('.js-color-switcher')
    //     .addEventListener('change', changeColor);

    // const picker = document.querySelector('.🔴--🃏');

    // window.addEventListener("deviceorientation", function (event) {
    //     // const alpha = event.alpha;
    //     // const beta = event.beta;
    //     const gamma = event.gamma;
    //     const center = 0;
    //     const offset = 30;
    //     const animationLength = 1000;

    //     if (gamma > (center + offset) && picker.classList.contains('⬅️')) {
    //         picker.classList.remove('⬅️');
    //     }

    //     if (gamma < (center - offset) && !picker.classList.contains('⬅️')) {
    //         picker.classList.add('⬅️');
    //     }
    // });

    // picker.addEventListener("transitionend", function (event) {
    //     const vibrationLength = 200;
    //     if (event.propertyName === 'transform') {
    //         navigator.vibrate(200);
    //     }
    // });

    const msg = `

%cNice to meet you 🍻!
I am @giacomozinetti%c [https://twitter.com/gcmznt]

This website is coded with 💙, emoji and a lot of nerdy thing like:

Sources
- LESS
- Autoprefixer
- Pug
- ES2015 and Babel
- npm
- yarn
- Gulp
- Git and Github
- Linters
- .editorconfig
- BEM

Server
- Nghttp2
- Nginx
- Brotli
- Gzip
- HTTP2
- Let's Encrypt
- Client Hints
- Webp
- New Relic
- Content Security Policy

Client
- Google Analytics
- SVG icons
- Print CSS
- Responsive
- Vertical rhythm
- CSS Custom Props
- CSS Grid
- Humans.txt
- Subresource Integrity
- Service workers
- PWA
- Microdata

%c🖖 Live long and prosper
%cGiacomo Giko Zinetti - 42@giko.it

`;

    const style = 'font-size: 12pt';
    console.log(msg, style, '', style, '');
})();
