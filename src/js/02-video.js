import Player from '@vimeo/player';

// lodash.throttle
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const onPlay = function (data) {
  localStorage.setItem(LOCALSTORAGE_KEY, data.seconds);
  // Виводимо таймінг в консоль
  console.log(localStorage.getItem(LOCALSTORAGE_KEY));
};

player.on('timeupdate', throttle(onPlay, 1000));

const onSetup = function () {
  player.setCurrentTime(
    Number(localStorage.getItem('videoplayer-current-time'))
  );
};
window.onload = onSetup;
