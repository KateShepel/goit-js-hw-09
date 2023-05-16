import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    timerValue: document.querySelectorAll('.value'),
}
const date = new Date();
let futureDate = 0; 
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    futureDate = selectedDates[0];
    let delta = (date - futureDate) * -1;

    if (delta <= 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return
    }

    refs.startBtn.disabled = false;
  },
};

refs.startBtn.disabled = true;

flatpickr(refs.input, options);
refs.startBtn.addEventListener("click", onClickStartBtn);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

function onClickStartBtn() {
  timerId = setInterval(calculateTime, 1000);

}

function calculateTime() {
  const currentTime = Date.now();
  const deltaTime = futureDate - currentTime;

  const timer = convertMs(deltaTime);

  refs.timerValue[0].textContent = addLeadingZero(timer.days);
  refs.timerValue[1].textContent = addLeadingZero(timer.hours);
  refs.timerValue[2].textContent = addLeadingZero(timer.minutes);
  refs.timerValue[3].textContent = addLeadingZero(timer.seconds);
}