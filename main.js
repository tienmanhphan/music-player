const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var heading = $('header h2');
var cdThumb = $('.cd-thumb');
var audio = $('#audio');
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const _this = this;
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const ramdomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playList = $('.playlist')
// Khai báo app
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    song: [
        {
            name: 'Anh đếch cần gì nhiều ngoài em',
            singer: 'Đen ft Vũ',
            path: './assets/music/Đen - Anh Đếch Cần Gì Nhiều Ngoài Em ft. Vũ., Thành Đồng (M-V).mp3',
            img: './assets/img/anhdechcanginhieungoaiem.png'
        },

        {
            name: '2 AM',
            singer: 'Justatee ft BigDaddy',
            path: './assets/music/2 A.M Remix - JustaTee ft BigDaddy ( AM Remix ) - Nhạc Remix Hot TikTok.mp3',
            img: './assets/img/2am.png'
        },

        {
            name: 'Bài này chill phết',
            singer: 'Đen ft Min',
            path: './assets/music/Đen ft. MIN - Bài Này Chill Phết (M-V).mp3',
            img: './assets/img/bainaychillphet.png'
        },

        {
            name: 'Biết tìm đâu',
            singer: 'Cheng',
            path: './assets/music/Biết Tìm Đâu (H2O Remix) - Cheng - Khát Khao Mong Trở Lại Một Ngày Em Đềm TikTok Remix.mp3',
            img: './assets/img/biettimdau.png'
        },

        {
            name: 'Bước qua mùa cô đơn',
            singer: 'Vũ',
            path: './assets/music/BƯỚC QUA MÙA CÔ ĐƠN - Vũ. (Official MV).mp3',
            img: './assets/img/buocquamuacodon.png'
        },

        {
            name: 'Đông kiếm em',
            singer: 'Vũ',
            path: './assets/music/ĐÔNG KIẾM EM - Vũ. (Original).mp3',
            img: './assets/img/dongkiemem.png'
        },

        {
            name: 'Mãi mãi không phải là anh',
            singer: 'Thanh bình',
            path: './assets/music/Mãi Mãi Không Phải Anh - Thanh Bình - Official Audio.mp3',
            img: './assets/img/maimaikhongphailaanh.png'
        },

        {
            name: 'Make you mine',
            singer: 'PUBLIC',
            path: './assets/music/PUBLIC - Make You Mine (Put Your Hand in Mine) [Official Video].mp3',
            img: './assets/img/makeumine.png'
        },

        {
            name: 'Pháo hồng',
            singer: 'Đạt long vinh',
            path: './assets/music/Pháo Hồng (H2O Remix) - Đạt Long Vinh - Nụ Cười Ai Nát Lòng Ngày Mai Em Lấy Chồng Hot TikTok.mp3',
            img: './assets/img/phaohong.png'
        },

        {
            name: 'Thì thôi',
            singer: 'Reddy',
            path: './assets/music/Thì Thôi - Reddy - MV Lyrics HD.mp3',
            img: './assets/img/thithoi.png'
        }
    ],

    render: function () {
        var htmls = this.song.map(function (song,index) {
            return ` 
            <div class="song ${index ===app.currentIndex ? 'active' : ''}" data-index="${index}">
      <div class="thumb" style="background-image: url('${song.img}')">
      </div>
      <div class="body">
        <h3 class="title">${song.name}</h3>
        <p class="author">${song.singer}</p>
      </div>
      <div class="option">
        <i class="fas fa-ellipsis-h"></i>
      </div>
    </div>`
        })

        $('.playlist').innerHTML = htmls.join('')

    },

    definepropertise: function () {
        // Phương thức thêm 1 thuộc tính cho object
        Object.defineProperty(this, 'currentSong', {
            get: function () { return this.song[this.currentIndex]; },
        })
    }
    ,

    handleEvents: function () {
        // Xử lý khi phóng to thu nhỏ cd
        var cd = $('.cd');
        var cdWidth = cd.offsetWidth;


        document.onscroll = function () {
                 // Tạo biến chứa giá trị tăng dần khi scroll
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth;
        }
        // Xử lý khi click play button

        
        playBtn.onclick = () => {
          

            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }

        }
        // Xử lý khi nhạc đang được chạy
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add('playing')
            cdThumbAnimate.play()

        }
        // Xử lý khi nhạc đang được pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }
        // Xử lý khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if(audio.duration){
               const progressPercent = Math.floor(audio.currentTime/audio.duration *100)
               progress.value = progressPercent
            }
            
        }
        // Xử lý khi tua nhạc
        progress.onchange = function (e) {
        var timechange = e.target.value;
        audio.currentTime = audio.duration/100* timechange;
        }
        // Xử lý CD quay/dừng

        const cdThumbAnimate = cdThumb.animate([{transform: 'rotate(360deg)'}],{duration:10000,iterations: Infinity});
        cdThumbAnimate.pause()
        // Xử lý khi chuyển sang bài tiếp theo
        nextBtn.onclick = function(){
            if(_this.isRandom){
                app.randomSong()

            }else{
                app.nextSong()
            }
          app.render()
          audio.play()
        app.scrollSongintoView();

        }
        
         // Xử lý khi chuyển về bài hát trước đó
         prevBtn.onclick = function(){
            if(_this.isRandom){
                app.randomSong()

            }else{
                app.prevSong()
            }
            audio.play()
          app.render()
        app.scrollSongintoView();


          }
          // Xử lý chuyển bài hát bằng bàn phím
        
          document.onkeydown = (event) => {
            var name = event.key;
            var code = event.code;
            // Alert the key name and key code on keydown
            console.log(name)
            if(name == 'ArrowRight'){
                if(_this.isRandom){
                    app.randomSong()
    
                }else{
                    app.nextSong()
                }
              app.render()
              audio.play()
            app.scrollSongintoView();
          }
        else if(name == 'ArrowLeft'){
            if(_this.isRandom){
                app.randomSong()

            }else{
                app.prevSong()
            }
            audio.play()
          app.render()
        app.scrollSongintoView();
        } 
        
        else if(name == "Enter"){
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }

        }

    }
        ;
        // Xử lý random bài hát
        ramdomBtn.onclick = function () {
            _this.isRandom = ! _this.isRandom;
            ramdomBtn.classList.toggle("active",_this.isRandom);
            
        }
         // Xử lý repeat bài hát
         repeatBtn.onclick = function () {
            _this.isRepeat = ! _this.isRepeat;
            repeatBtn.classList.toggle("active",_this.isRepeat);
            
        }
        // Xử lý tự động phát khi bài hát kết thúc
        audio.onended = function () {
            if(_this.isRepeat){
                audio.play()
            }else{
                nextBtn.click()
            }
        }
        // Xử lý khi click vào bài hát trên play-list\
        playList.onclick = function (e) {
            if(e.target.closest('.song:not(.active)') || e.target.closest('.option')){
                // Xử lý click vào song
                if(e.target.closest('.song:not(.active)')){
                   var songinde =Number(e.target.closest('.song:not(.active)').dataset.index) 
                   app.currentIndex = songinde
                   app.loadCurrentSong()
                   audio.play()
                   app.render()
                }
                
            }
        }

}
    ,
    loadCurrentSong: function () {

        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.img})`;
        audio.src = this.currentSong.path;
    },
    nextSong: function() {
        this.currentIndex++;
        if(app.currentIndex>=app.song.length){
         app.currentIndex=0;
        }
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--;
        if(app.currentIndex<0){
         app.currentIndex= app.song.length -1 ;
        }
        this.loadCurrentSong()
    },
    randomSong: function() {
        let newIndex;
        do newIndex= Math.floor(Math.random() * this.song.length)
        while(newIndex == this.currentIndex)
        app.currentIndex = newIndex
        console.log(newIndex)
        this.loadCurrentSong()
    },
    scrollSongintoView: function(){
        setTimeout(function(){
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        },300)
    },
   
    start: function () {
        // Định nghĩa thuộc tính cho đối tượng
        this.definepropertise();
        // Xử lý các dự kiện DOM event
        this.handleEvents();
        // Render ra playlist
        this.render();
        // Render ra bài hát đầu tiên lên UI
        this.loadCurrentSong();

    }

}
app.start()
