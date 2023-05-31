
window.addEventListener('DOMContentLoaded', () => {
  const playInDaClubButton = document.getElementById('playInDaClubButton');
  const playHitEmUpButton = document.getElementById('playHitEmUpButton');
  const playBigPoppaButton = document.getElementById('playBigPoppaButton');
  const playWriteThisDownButton = document.getElementById('playWriteThisDownButton');
  const pauseButton = document.getElementById('pauseButton');
  const previousButton = document.getElementById('previousButton');
  const volumeSlider = document.getElementById('volumeSlider');
  const currentTime = document.getElementById('currentTime');
  const skipButton = document.getElementById('skipButton');
  const duration = document.getElementById('duration');
  const audioPlayer = document.getElementById('audioPlayer');
  const progressBar = document.querySelector('.progress-bar');
  const progressBarFill = document.querySelector('.progress-bar__fill');

  let isPaused = false;
  let currentDetails = '';
  let currentState = '';
  let currentLogo = '';
  let currentIndex = 0;

  const songs = [
    {
      filename: 'In Da Club.mp3',
      details: 'Listening to In Da Club',
      state: 'By 50 Cent',
      logo: 'indaclub',
    },
    {
      filename: 'Hit Em Up.mp3',
      details: 'Listening to Hit Em Up',
      state: 'By 2Pac',
      logo: 'hitemup',
    },
    {
      filename: 'Big Poppa.mp3',
      details: 'Listening to Big Poppa',
      state: 'By The Notorious B.I.G.',
      logo: 'bigpoppa',
    },
    {
      filename: 'https://github.com/Louiml/LouimlMusic/releases/download/Download/Write.This.Down.mp3',
      details: 'Listening to Write This Down',
      state: 'By Thug Theory',
      logo: 'writethisdown',
    }
  ];

  playInDaClubButton.addEventListener('click', () => {
    currentDetails = 'Listening to In Da Club';
    currentState = 'By 50 Cent';
    currentLogo = 'indaclub';
    playAudio('In Da Club.mp3', currentDetails, currentState, currentLogo);
  });

  playHitEmUpButton.addEventListener('click', () => {
    currentDetails = 'Listening to Hit Em Up';
    currentState = 'By 2Pac';
    currentLogo = 'hitemup';
    playAudio('Hit Em Up.mp3', currentDetails, currentState, currentLogo);
  });

  playBigPoppaButton.addEventListener('click', () => {
    currentDetails = 'Listening to Big Poppa';
    currentState = 'By The Notorious B.I.G.';
    currentLogo = 'bigpoppa';
    playAudio('Big Poppa.mp3', currentDetails, currentState, currentLogo);
  });

  playWriteThisDownButton.addEventListener('click', () => {
    currentDetails = 'Listening to Write This Down';
    currentState = 'By Thug Theory';
    currentLogo = 'writethisdown';
    playAudio('Write This Down.mp3', currentDetails, currentState, currentLogo);
  });

  previousButton.addEventListener('click', () => {
    const previousSong = getPreviousSong();
    playAudio(previousSong.filename, previousSong.details, previousSong.state, previousSong.logo);
  });

  skipButton.addEventListener('click', () => {
    const nextSong = getNextSong();
    playAudio(nextSong.filename, nextSong.details, nextSong.state, nextSong.logo);
  });

  pauseButton.addEventListener('click', () => {
    if (isPaused) {
      audioPlayer.play();
      pauseButton.textContent = 'Pause';
      isPaused = false;
    } else {
      audioPlayer.pause();
      pauseButton.textContent = 'Resume';
      isPaused = true;
    }
  
  });

  volumeSlider.addEventListener('input', () => {
    const volume = parseFloat(volumeSlider.value);
    audioPlayer.volume = volume;
  });

  audioPlayer.addEventListener('timeupdate', () => {
    const currentTimeValue = formatTime(audioPlayer.currentTime);
    const durationValue = formatTime(audioPlayer.duration);

    currentTime.textContent = currentTimeValue;
    duration.textContent = durationValue;

    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBarFill.style.width = `${progress}%`;
  });

  progressBar.addEventListener('click', (event) => {
    const boundingRect = progressBar.getBoundingClientRect();
    const progressWidth = event.clientX - boundingRect.left;
    const progressBarWidth = boundingRect.width;
    const progress = (progressWidth / progressBarWidth) * 100;
    const seekTime = (progress * audioPlayer.duration) / 100;
    audioPlayer.currentTime = seekTime;
  });

  function playAudio(filename, details, state, logo) {
    audioPlayer.src = filename;
    audioPlayer.play();

    audioPlayer.addEventListener('ended', () => {
      playNextSong();
    });
  }

  function getNextSong() {
    currentIndex++;
  
    if (currentIndex < songs.length) {
      return songs[currentIndex];
    }
  
    currentIndex = 0;
  
    return songs[currentIndex];
  }

  function getPreviousSong() {
    currentIndex--;
  
    if (currentIndex >= 0) {
      return songs[currentIndex];
    }
  
    currentIndex = songs.length - 1;
  
    return songs[currentIndex];
  }  

  function playNextSong() {
    const nextSong = getNextSong();

    if (nextSong) {
      playAudio(nextSong.filename, nextSong.details, nextSong.state, nextSong.logo);
    } else {
      console.log('No more songs to play');
    }
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
});

let isProgressBarClicked = false;

progressBar.addEventListener('mousedown', () => {
  isProgressBarClicked = true;
});

progressBar.addEventListener('mouseup', () => {
  isProgressBarClicked = false;
});

progressBar.addEventListener('mousemove', (event) => {
  if (isProgressBarClicked) {
    const boundingRect = progressBar.getBoundingClientRect();
    const progressWidth = event.clientX - boundingRect.left;
    const progressBarWidth = boundingRect.width;
    const progress = (progressWidth / progressBarWidth) * 100;
    const seekTime = (progress * audioPlayer.duration) / 100;
    audioPlayer.currentTime = seekTime;
  }
});
