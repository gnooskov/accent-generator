const input = document.getElementById('input');
const display = document.getElementById('display');

const focusAndSelectInput = () => {  
  input.focus();
  input.select();
}

window.addEventListener('keydown', () => {
  focusAndSelectInput();
})

input.addEventListener('keyup', (e) => {
  const inputValue = e.target.value;
  if (!inputValue) {
    return;
  }
  const accentedValue = inputValue.replace(/\u0301/ig, "") + '\u0301';
  display.textContent = accentedValue;
  input.value = accentedValue;
});