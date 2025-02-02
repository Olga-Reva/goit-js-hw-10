import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysSpan = document.querySelector('.days');
const hoursSpan = document.querySelector('.hours');
const minutesSpan = document.querySelector('.minutes');
const secondsSpan = document.querySelector('.seconds');
if (!daysSpan || !hoursSpan || !minutesSpan || !secondsSpan) {
  console.error('Помилка: не знайдено елементів для таймера!');
}
let userSelectedDate = null;
let timerInterval = null;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    console.log('Selected date:', selectedDate);

    if (selectedDate <= new Date()) {
      startButton.disabled = true;
      userSelectedDate = null;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    } else {
      startButton.disabled = false;
      userSelectedDate = selectedDate;
      iziToast.success({
        title: 'Success',
        message: 'Valid date selected!',
      });
    }
  },
};

flatpickr(input, options);

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  input.disabled = true;
  console.log('Timer started!');

  timerInterval = setInterval(() => {
    const currentTime = new Date();
    const deltaTime = Math.max(userSelectedDate - currentTime, 0);
    console.log('Time left:', deltaTime);

    if (deltaTime <= 0) {
      clearInterval(timerInterval);
      iziToast.success({
        title: 'Finished',
        message: 'Countdown complete!',
      });
      resetTimer();
      return;
    }

    updateCountdown(convertMs(deltaTime));
  }, 1000);
});

function updateCountdown({ days, hours, minutes, seconds }) {
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function resetTimer() {
  clearInterval(timerInterval);
  input.disabled = false;
  startButton.disabled = true;
  updateCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
}
