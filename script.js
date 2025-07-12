window.addEventListener('load', () => {
  document.querySelector('.loader').classList.add('hide');

  const toggle = document.getElementById('toggle-mode');
  const body = document.body;

  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    toggle.textContent = '🌙';
  }

  toggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
      toggle.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    } else {
      toggle.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    }
  });
});