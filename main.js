import songs from './songs.js';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnPlay = $('.btn-play');
const btnPre = $('.btn-pre');
const btnNext = $('.btn-next');
const btnLoop = $('.btn-loop');
const btnRandom = $('.btn-random');
const audio = $('#audio');
const playList = $('.play-list');
const inputProgress = $('#inputRange');
const heading = $('header h2');
const imgCD = $('.cd .cd-thumb');
const detailProgress = $('.detail-progress');
const valueLoop = ['fa-sharp fa-solid fa-rotate-right', 'fa-solid fa-repeat'];

console.log({inputProgress})

const app = {

  myList: songs,

  currentIndex: 0,

  isPlaying: false,

  valueToChangeLoop: 0,

  isRandom: false,

  isOnChange: false,

  handleItemEvent() {

    const listAfterRender = playList.querySelectorAll('.item-song');

    function addEffectHover(el, action1, action2) {
      el.classList[action1]('item-hover');
      listAfterRender[app.currentIndex].classList[action2]('item-hover');
    }

    (function handleHover() {
      listAfterRender[this.currentIndex].classList.add('item-hover');

      listAfterRender?.forEach((el, index) => {
        if (index !== this.currentIndex) el.classList.remove('item-hover');

        el.onmouseover = function () {
          addEffectHover(el, 'add', 'add');
        }

        el.onmouseout = function () {
          addEffectHover(el, 'remove', 'add');
        }

        el.onclick = function () {
          listAfterRender.forEach((element) => {
            if (el !== element) element.classList.remove('item-hover');
          })
          app.currentIndex = index;
          app.renderPlayer();
          app.handlePlayerEvent();
        }
      })
    }).call(this);
  },

  handlePlayerEvent() {

    function convertTimeAudio(value) {
      const minutes = "0" + Math.floor(value / 60);
      const seconds = "0" + Math.floor(value - minutes * 60);
      const dur = minutes.substr(-2) + ":" + seconds.substr(-2);
      return dur;
    }

    function disableBtn(elBtn) {
      if (elBtn) {
        elBtn.style.pointerEvents = 'none';
        elBtn.style.opacity = '.4';
      }
    }

    function enableBtn(elBtn) {
      if (elBtn) {
        elBtn.style.pointerEvents = 'unset';
        elBtn.style.opacity = '1';
      }
    }

    function controlDisplayDetailTime() {
      detailProgress.innerText = convertTimeAudio(audio.currentTime);

      let valuePosition = (((audio.currentTime / inputProgress.offsetWidth) * 100) * (inputProgress.offsetWidth / ((audio.duration / inputProgress.offsetWidth) * 100)))
      const conditionForDetailRender = audio.duration / audio.currentTime;

      // set detail below progress
      if (inputProgress.value && inputProgress.value > 0) {
        if (conditionForDetailRender > 0 && conditionForDetailRender < 1.3) {
          detailProgress.style.left = (valuePosition - 22) + 'px';
        } else if (conditionForDetailRender > 1.3 && conditionForDetailRender < 2) {
          detailProgress.style.left = (valuePosition - 19) + 'px';
        } else if (conditionForDetailRender > 2 && conditionForDetailRender < 3) {
          detailProgress.style.left = (valuePosition - 17) + 'px';
        } else {
          detailProgress.style.left = (valuePosition - 11) + 'px';
        }
      }
    }

    function handleLoopAudio() {
      if (app.valueToChangeLoop === 1) {
        app.valueToChangeLoop = 0;
      } else {
        ++app.valueToChangeLoop;
      }

      if (app.valueToChangeLoop === 0) {
        audio.loop = false;
      } else {
        audio.loop = true;
      }

      btnLoop.querySelector('i').className = valueLoop[app.valueToChangeLoop]
    }

    function handleRandomAudio() {
      app.isRandom = !app.isRandom;
      app.isRandom ? btnRandom.style.opacity = '1' : btnRandom.style.opacity = '.4';
    }

    function randomIndexToPlay(currentIndex) {
      let randomIndex = Math.floor(Math.random() * app.myList.length);
      if (currentIndex !== randomIndex) {
        app.currentIndex = randomIndex;
        return;
      } else {
        randomIndexToPlay(currentIndex);
      }
    }

    (function handleDefaultEvent() {
      if (this.currentIndex === 0) {
        disableBtn(btnPre);
      } else {
        enableBtn(btnPre);
      }

      if (this.currentIndex === app.myList.length - 1) {
        disableBtn(btnNext);
      } else {
        enableBtn(btnNext);
      }

      this.isRandom ? btnRandom.style.opacity = '1' : btnRandom.style.opacity = '.4';

    }).call(this)

    btnNext.onclick = function () {
      if (app.currentIndex < app.myList.length - 1) {
        app.currentIndex += 1;
        app.renderPlayer();
        app.handleItemEvent();
        app.handlePlayerEvent();
      }
      if (app.currentIndex === app.myList.length - 1) {
        disableBtn(btnNext);
      }
    }

    btnLoop.onclick = function () {
      handleLoopAudio();
    }

    btnPre.onclick = function () {
      if (app.currentIndex > 0) {
        app.currentIndex -= 1;
        app.renderPlayer();
        app.handleItemEvent();
        app.handlePlayerEvent();
      }
      if (app.currentIndex === 0) {
        disableBtn(btnPre);
      }
    }

    btnPlay.onclick = function () {
      if (app.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }

    audio.onplay = function () {
      app.isPlaying = true;
      btnPlay.querySelector('i').classList.remove('fa-circle-pause');
      btnPlay.querySelector('i').classList.add('fa-circle-pause');
    }

    audio.onpause = function () {
      app.isPlaying = false;
      btnPlay.querySelector('i').classList.add('fa-circle-play');
      btnPlay.querySelector('i').classList.remove('fa-circle-pause');
    }

    audio.ontimeupdate = function () {
      inputProgress.max = audio.duration;
      if (!app.isOnChange) {
        inputProgress.value = audio.currentTime;
      }
      controlDisplayDetailTime();
    }

    inputProgress.addEventListener("input", function (evt) {
      app.isOnChange = true;
    });

    inputProgress.addEventListener("change", function (evt) {
      app.isOnChange = false;
      audio.currentTime = inputProgress.value;
    });


    audio.onended = function () {
      if (app.isRandom) {
        randomIndexToPlay(app.currentIndex);
        app.renderPlayer();
        app.handleItemEvent();
        app.handlePlayerEvent();
      } else {
        if (!app.isRandom) {
          app.currentIndex += 1;
        }
        if (app.currentIndex < app.myList.length) {
          app.renderPlayer();
          app.handleItemEvent();
          app.handlePlayerEvent();
        }
        if (app.currentIndex === app.myList.length - 1) {
          app.currentIndex = 0;
          app.renderPlayer();
          app.handleItemEvent();
          app.handlePlayerEvent();
        }
      }

    }

    btnRandom.onclick = function () {
      handleRandomAudio();
    }

  },

  renderList() {
    const htmls = this.myList.map((item) => {
      return `
         <div class="item-song">
          <div class="container-detail">
            <div class="cd-list">
              <div class="cd-thumb" style="background: url('${item.image}')"></div>
            </div>
            <div class="detail-song">
              <h2 class="name-song">bài hát: ${item.name}</h2>
              <h4 class="author">ca sĩ: ${item.singer}</h4>
            </div>
          </div>
          <div class="more-action">
            <i class="fa-solid fa-ellipsis" style="font-size: 24px"></i>
          </div>
        </div>
        `
    }).join('');
    playList.innerHTML = htmls;
  },

  renderPlayer() {
    audio.src = this.myList[this.currentIndex].path;
    heading.innerText = this.myList[this.currentIndex].name;
    imgCD.style.background = `url("${this.myList[this.currentIndex].image}")`
  },

  start: function () {
    this.renderPlayer();
    this.renderList();
    this.handlePlayerEvent();
    this.handleItemEvent();
  }
}

app.start();