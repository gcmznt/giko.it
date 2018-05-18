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
    document.body.appendChild(replacement);
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
  const setColor = function(col) {
    const style = document.querySelector('body').style;
    style.removeProperty('--main-color');
    style.setProperty('--main-color', col);
    localStorage.setItem('--main-color', col);
    ga && ga('send', 'event', 'color', 'change', col);
  };

  Array.from(document.querySelectorAll('.tech')).map(
    el => el.addEventListener('mouseenter', e => setColor(getComputedStyle(e.target).getPropertyValue('--tech-color')))
  );

  const savedColor = localStorage.getItem('--main-color');
  savedColor && setColor(savedColor);

  document.querySelector('[download]').addEventListener('click', () => {
    ga && ga('send', 'event', 'download', localStorage.getItem('--main-color'));
  });

  console.info(`

Nice to meet you 🍻!
I am @gcmznt [https://twitter.com/gcmznt]

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

🖖 Live long and prosper
Giacomo Giko Zinetti - giacomo.zinetti@gmail.com

  `);
})();
