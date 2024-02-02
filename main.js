/**
 * 1. Render songs
 * 2. Scroll top
 * 3. Play / pause / seek
 * 4. CD rotate
 * 5. Next / prev
 * 6. Random
 * 7. Next / Repeat when ended
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play song when click
 */

var playList = document.querySelector(".playlist");

const app = {
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
        <div class="song">
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
  start: function () {
    this.render();
  },
};

app.start();
