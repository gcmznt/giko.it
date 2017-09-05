document.querySelector('.button').addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('wrapper').classList.toggle('active');
  setTimeout(function() {
    location.href = e.target.href;
  }, parseInt(getComputedStyle(document.body).getPropertyValue('--animation-time'), 10) + 200);
})
