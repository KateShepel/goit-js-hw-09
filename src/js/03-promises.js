import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

const refs = {
  delayInput: document.querySelector('input[name="delay"]'),
  stepInput: document.querySelector('input[name="step"]'),
  amountInput: document.querySelector('input[name="amount"]'),
  btn: document.querySelector('button[type="submit"]'),
};

refs.btn.addEventListener('click', onBtnClick);

function onBtnClick(e) {
  e.preventDefault();

  for (let i = 0; i < refs.amountInput.value; i += 1) {
    createPromise(
      i + 1,
      Number(refs.delayInput.value) + Number(refs.stepInput.value) * i
    )
      .then(result => {
        Notiflix.Notify.success(result);
      })
      .catch(result => {
        Notiflix.Notify.failure(result);
      });
  }
}
