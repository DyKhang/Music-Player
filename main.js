/**
 * 1. Render songs Done
 * 2. Scroll top Done
 * 3. Play / pause / seek Done
 * 4. CD rotate Done
 * 5. Next / prev
 * 6. Random
 * 7. Next / Repeat when ended
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play song when click
 */

const playList = document.querySelector(".playlist");
const heading = document.querySelector("h1");
const thumb = document.querySelector(".music-thumb");
const audio = document.querySelector("audio");
const cd = document.querySelector(".music-thumb-wrap");
const playBtn = document.querySelector(".play-btn");
const inputRange = document.querySelector("#process");
const nextBtn = document.querySelector(".fa-solid.fa-forward-fast");
const preBtn = document.querySelector(".fa-solid.fa-backward-fast");
const randomBtn = document.querySelector(".fa-solid.fa-shuffle");
const repeatBtn = document.querySelector(".fa-solid.fa-arrow-rotate-right");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  songs: [
    {
      name: "Bạc Phận",
      singer: "J97",
      path: "./Music/song1.mp3",
      image: "./Thumbs/song1.jpg",
    },
    {
      name: "Âm Thầm Bên Em",
      singer: "Sơn Tùng MTP",
      path: "./Music/song2.mp3",
      image: "./Thumbs/song2.jpg",
    },
    {
      name: "Anh Là Ngoại Lệ Của Em",
      singer: "Phương Ly",
      path: "./Music/song3.mp3",
      image: "./Thumbs/song3.jpg",
    },
    {
      name: "Beat It",
      singer: "Michael Jackson",
      path: "./Music/song4.mp3",
      image: "./Thumbs/song4.jpg",
    },
    {
      name: "Little Love",
      singer: "Phương Ly",
      path: "./Music/song5.mp3",
      image: "./Thumbs/song5.jpg",
    },
    {
      name: "Mùa Xuân Đầu Tiên",
      singer: "Tuấn Khanh ft Thúy Nga",
      path: "./Music/song6.mp3",
      image: "./Thumbs/song6.jpg",
    },
    {
      name: "What Makes You Beautiful",
      singer: "One Direction",
      path: "./Music/song7.mp3",
      image: "./Thumbs/song7.jpg",
    },
    {
      name: "Sau Cơn Mưa",
      singer: "Coolkidnevasleep ft. Rhyder",
      path: "./Music/song8.mp3",
      image: "./Thumbs/song8.png",
    },
    {
      name: "Thích Thích",
      singer: "Phương Ly",
      path: "./Music/song9.mp3",
      image: "./Thumbs/song9.jpg",
    },
    {
      name: "Harder",
      singer: "Wxrdie",
      path: "./Music/song10.mp3",
      image: "./Thumbs/song10.jpg",
    },
  ],
  render: function () {
    const htmls = this.songs.map(function (song, index) {
      return `
        <div class="song ${index === app.currentIndex ? "song--active" : ""}">
        <img src="${song.image}" alt="" class="song__thumb" />
        <div class="song__col">
          <h2 class="song__title">${song.name}</h2>
          <p class="song__actor">${song.singer}</p>
        </div>
        <i class="fa-solid fa-ellipsis"></i>
      </div>
        `;
    });

    playList.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lý CD quay / dừng
    const cdRotate = cd.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });
    cdRotate.pause();

    // Xử lý phóng to thu nhỏ CD
    document.onscroll = function () {
      const scrollTop = document.documentElement.scrollTop || window.scrollY;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;

      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xử lý khi click Play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi bài hát được play
    audio.onplay = function () {
      _this.isPlaying = true;
      playBtn.classList.add("play-btn--playing");
      cdRotate.play();
    };

    // Khi bài hát được pause
    audio.onpause = function () {
      _this.isPlaying = false;
      cdRotate.pause();
      playBtn.classList.remove("play-btn--playing");
    };

    // Xử lý range chạy theo tiến độ bài hát
    audio.ontimeupdate = function () {
      inputRange.value = (audio.currentTime / audio.duration) * 100;
    };

    // Xử lý khi tua song
    inputRange.oninput = function () {
      const seekTime = (inputRange.value / 100) * audio.duration;
      audio.currentTime = seekTime;
    };

    // Xử lý khi click next
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandom();
      } else {
        _this.nextSong();
      }
      audio.play();
    };

    // Xử lý khi click prev
    preBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandom();
      } else {
        _this.prevSong();
      }
      audio.play();
    };

    // Khi random được kich hoạt
    randomBtn.onclick = function () {
      if (_this.isRandom) {
        randomBtn.classList.remove("fa-shuffle--active");
        _this.isRandom = false;
      } else {
        randomBtn.classList.add("fa-shuffle--active");
        _this.isRandom = true;
      }
    };

    // Xử lý next song khi audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Xử lý click repeat
    repeatBtn.onclick = function () {
      if (_this.isRepeat) {
        repeatBtn.classList.remove("fa-arrow-rotate-right--active");
        _this.isRepeat = false;
      } else {
        repeatBtn.classList.add("fa-arrow-rotate-right--active");
        _this.isRepeat = true;
      }
    };
  },
  loadCurrentSong: function () {
    heading.innerText = this.currentSong.name;
    thumb.style.backgroundImage = `url(${this.currentSong.image})`;
    audio.src = this.currentSong.path;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
    this.render();
    this.scrollToActiveSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
    this.render();
    this.scrollToActiveSong();
  },
  playRandom: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  scrollToActiveSong: function () {
    const activeSong = document.querySelector(".song.song--active");
    setTimeout(() => {
      activeSong.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 300);
  },
  start: function () {
    // Định nghĩa các thuộc tính cho Obj
    this.defineProperties();

    // Lắng nghe xử lý các sự kiện DOM
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();
    // Render Playlist
    this.render();
  },
};

app.start();
