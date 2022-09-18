const input = document.getElementById('input');
const display = document.getElementById('display');
const copyButton = document.getElementById('copy');
const copiedToast = document.getElementById('copied');

const showCopiedMessage = () => {
  copiedToast.textContent = `Copied ${input.value} to clipboard!`
  copiedToast.classList.add('copied--animated');
}

const copy = () => {
  if (!input.value) {
    return;
  }
  copyTextToClipboard(input.value);
  showCopiedMessage();
}

const focusAndSelectInput = () => {  
  input.focus();
  input.select();
}

window.addEventListener('keydown', () => {
  focusAndSelectInput();
});

window.addEventListener('copy', () => {
  if (!input.value) {
    return;
  }
  showCopiedMessage();
});

input.addEventListener('keyup', (e) => {
  const inputValue = e.target.value;
  if (inputValue) {
    copyButton.classList.remove('copy--disabled');
  } else {
    copyButton.classList.add('copy--disabled');
  }
  const accentedValue = inputValue
    ? inputValue.replace(/\u0301/ig, "") + '\u0301'
    : inputValue;
  display.textContent = accentedValue;
  input.value = accentedValue;
});

copiedToast.addEventListener('animationend', () => {
  copiedToast.classList.remove('copied--animated');
});

copyButton.addEventListener('click', () => {
  copy();
})

const fallbackCopyTextToClipboard = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Unable to copy', err);
  }

  document.body.removeChild(textArea);
}

const copyTextToClipboard = (text) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text);
}
