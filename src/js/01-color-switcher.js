const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let timerId = null;

refs.startBtn.addEventListener("click", onClickRandomColor);
refs.stopBtn.addEventListener("click", stopChangingColor);

function onClickRandomColor() {
    timerId = setInterval(getRandomColor, 1000);
}

function getRandomColor () {
    let color = getRandomHexColor();
    refs.body.style.backgroundColor = color;

    transparencyBtn(refs.startBtn, refs.stopBtn);
}

function stopChangingColor() {
    clearInterval(timerId);

    transparencyBtn(refs.stopBtn, refs.startBtn);
}

function transparencyBtn(btnToDisable, btnToEnable) {
    btnToDisable.disabled = true;
    btnToEnable.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
