(function() {
  document.querySelectorAll('#step-1, #step-2')
    .forEach(el => el.addEventListener('submit', e => {
      e.preventDefault();
      e.stopPropagation();
    }));
  const currentState = () => parseInt(document.querySelector('[name=state]:checked').value);
  const changeState = state => {
    const stateEl = document.querySelector(`[name=state][value="${state}"]`);
    if (!stateEl) throw new RangeError(`State out of bounds: ${state}`);
    stateEl.checked = true;
  };

  ['email', 'pass'].forEach(fieldName => {
    document.getElementById(fieldName).addEventListener('change', ev => {
      document.getElementById(`hidden-${fieldName}`).value=ev.target.value;
    });
  });

  for (let i=1; i<=3; i++) {
    /**
     * @type {HTMLFormElement}
     */
    const stepEl = document.querySelector(`#step-${i}`);
    const prevBtn = stepEl.querySelector('.prev-btn:not(:disabled)');
    const nextBtn = stepEl.querySelector('.next-btn:not(:disabled)');

    if (prevBtn) {
      prevBtn.addEventListener('click', _ => changeState(i-1))
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', _ => {
        if (stepEl.checkValidity()) {
          changeState(i+1)
        }
      })
    }
  }
})();

(function() {
  const urlParams = new URLSearchParams(window.location.search);
  document.getElementById('query-args')
    .innerText = JSON.stringify(Object.fromEntries(urlParams.entries()), null, '\t')
})();