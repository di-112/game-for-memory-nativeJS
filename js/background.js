const audioRainPath = 'audio/audio_rain.mp3'
const audioSeaPath= 'audio/audio_sea.mp3'
const audioFirePath = 'audio/audio_fire.mp3'

const arrAudioPath = [audioRainPath, audioSeaPath, audioFirePath] 

const backRainPath ='css/img/back_rain.jpg'
const backSeaPath ='css/img/back_sea.jpg'
const backFirePath ='css/img/back_fire.jpg'

const arrBackImgs = [backRainPath, backSeaPath, backFirePath] 


const audio = new Audio();

audio.src = 'audio/audio_sea.mp3'
audio.loop = true

const btnRain = document.querySelector('.rain')
const btnSea = document.querySelector('.sea')
const btnFire = document.querySelector('.fire')

const arrBtnBackground = [btnRain, btnSea, btnFire]

for(let i=0; i<arrBtnBackground.length; i++)arrBtnBackground[i].addEventListener('click', ()=>changeBackground(arrAudioPath[i], arrBackImgs[i], arrBtnBackground[i]))


////////Play_sound///////////////
const playSound = document.querySelector('.btn_play')

const soundPath = 'css/img/speaker-volume.svg'
const soundOffPath = 'css/img/sound-off.svg'

playSound.addEventListener('click', ()=>changeStateSound())

////////Functions/////////////////

function changeBackground(audioPath, backImg, btnBack){
   document.querySelector('.wrapper').style.background = `url(${backImg}) center/cover`
   if(!audio.src.includes(audioPath))audio.src = audioPath
   if(audio.classList.contains('active'))audio.play()
   for(let btn of arrBtnBackground)if(btn.classList.contains('active'))btn.classList.remove('active')
   btnBack.classList.add('active')
}

function changeStateSound(){
   if(audio.classList.contains('active')) {
      audio.pause()
      audio.classList.remove('active')
      playSound.querySelector('img').setAttribute('src',soundOffPath)
   }
   else {
      audio.play()
      audio.classList.add('active')
      playSound.querySelector('img').setAttribute('src',soundPath)
   }
}
