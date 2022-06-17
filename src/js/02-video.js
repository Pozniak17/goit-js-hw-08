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

// player
//   .setCurrentTime()
//   .then(function (seconds) {
//     // seconds = the actual time that the player seeked to
//   })
//   .catch(function (error) {
//     switch (error.name) {
//       case 'RangeError':
//         // the time was less than 0 or greater than the video’s duration
//         break;

//       default:
//         // some other error occurred
//         break;
//     }
//   });

setCurrentTime();

function setCurrentTime() {
  if (!localStorage.getItem(LOCALSTORAGE_KEY)) {
    return;
  }
  player.setCurrentTime(localStorage.getItem(LOCALSTORAGE_KEY));
}

player.on('timeupdate', throttle(onPlay, 1000));
