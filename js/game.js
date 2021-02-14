const grid = document.querySelector('.game__grid')
const result = document.querySelector('.result')
const time = document.querySelector('.time')
const progressBar = document.querySelector('.progressbar')

////// Style for games items//////

const borderForItem = '2px solid white'
const itemsHeight = window.screen.height/9
const itemsWidth = window.screen.height/9
const itemFlip = 'black'
const startStyleForItems={
   width: itemsWidth + 'px',
   cursor: 'pointer',
   height: itemsHeight + 'px',
   border: borderForItem,
   boxSizing: 'border-box',
   background: itemFlip,
}

///////games varuables//////
let countPoint = 0
let startTimer
let timer
let chooseItems = []
let openItems = []
let gamesItems = []
let idInterval

///////btns/////////
const btnPlayAgain = document.querySelectorAll('.play_again')
const btnStart = document.querySelector('.start_btn')
const btnEasy = document.querySelector('.easy')
const btnMiddle = document.querySelector('.middle')
const btnHard = document.querySelector('.hard')
const brtnReset = document.querySelector('.reset_btn')
const btnOpenGame = document.querySelector('.btn_open_game')
let arrComplex = [btnEasy, btnMiddle, btnHard]

///////add EventListener for btns/////////

btnOpenGame.addEventListener('click', ()=>{
   document.querySelector('.info').style.display = 'none'
})

btnPlayAgain.forEach(btn => btn.addEventListener('click', ()=>resetGame()))

btnStart.addEventListener('click', ()=>{
   if(!btnStart.classList.contains('pushed')){
      btnStart.classList.add('pushed')
      btnStart.style.animation = 'none'
      gameActive()
   }
})

brtnReset.addEventListener('click', ()=>resetGame())

arrComplex.forEach(complex => complex.addEventListener('click', ()=>changeComplex(complex)))


/////////Start game//////////

createGame('easy')

/////////Functions//////////

function changeComplex(btnComplex){
   for(let btn of arrComplex)if(btn.classList.contains('active'))btn.classList.remove('active')
   btnComplex.classList.add('active')
   resetGame()
}

function createGamesItems(complex){
   const gamesItems = [
   {
      name: 'gray',
      background: 'gray'
   },
   {
      name: 'green',
      background: 'green'
   },
   {
      name: 'red',
      background: 'red'
   },
   {
      name: 'yellow',
      background: 'yellow'
   },
   {
      name: 'blueviolet',
      background: 'blueviolet'
   },
   {
      name: 'peru',
      background: 'peru'
   }
   ]
   if(complex=='middle'){
      gamesItems.push({name:'Aqua', background: 'Aqua'})
      gamesItems.push({name:'DarkOrange', background: 'DarkOrange'})
   }
   if(complex=='hard'){
      gamesItems.push({name:'Aqua', background: 'Aqua'})
      gamesItems.push({name:'DarkOrange', background: 'DarkOrange'})
      gamesItems.push({name:'Fuchsia', background: 'Fuchsia'})
      gamesItems.push({name:'DarkSlateGray', background: 'DarkSlateGray'})
   }
   return gamesItems
}

function addChooseItems( item,itemOfArr){
   if(chooseItems.length<2) {
       item.style.background = itemOfArr.background
       if(!chooseItems.includes(item))chooseItems.push(item)
      }
   if(chooseItems.length==2)checkChooseItems()
}

function checkChooseItems(){
   setTimeout( ()=>{
   if(chooseItems[0].style.background == chooseItems[1].style.background)
   {  
      console.log(chooseItems[0].classList[0], chooseItems[1].classList[0])
      if(!openItems.includes(chooseItems[0]) && !openItems.includes(chooseItems[1])){countPoint++; progressBar.setAttribute('value', 2*countPoint)}
      openItems.push(chooseItems[0])
      openItems.push(chooseItems[1])
      if(checkWin())Win()
   }            
   else{     
      if(!openItems.includes(chooseItems[0]))chooseItems[0].style.background = itemFlip
      if(!openItems.includes(chooseItems[1]))chooseItems[1].style.background = itemFlip
      }   
   chooseItems=[] }, 500)
}

function checkWin(){return countPoint == (gamesItems.length/2)};

function deleteGame(){
   let arr = grid.querySelectorAll('div')
   for(let item of arr) grid.removeChild(item)
}

function Win(){
   countPoint = 0;
   grid.classList.remove('active')
   document.querySelector('.result__time').textContent = `Your result: ${+startTimer - timer} seconds`
   result.style.display = 'flex'
   result.querySelector('.result__win').style.display = 'flex'
   result.querySelector('.result__loose').style.display = 'none'
   result.querySelector('.result__win').querySelector('img').setAttribute('src', 'css/img/win.gif')
}

function Loose(){
   clearTimeout(idInterval)
   countPoint =0
   result.style.display = 'flex'
   result.querySelector('.result__loose').style.display='flex'
   result.querySelector('.result__win').style.display='none'
   result.querySelector('.result__loose').querySelector('img').setAttribute('src', 'css/img/loose.gif')
}

function resetGame(){
  countPoint = 0
  openItems = []
  chooseItems =[]
  timer = startTimer
  btnStart.style.animation = 'jump 0.8s infinite'
  time.textContent=`time: ${startTimer}`
  time.style.color = 'white'
  grid.classList.remove('active')
  btnStart.classList.remove('pushed')
  if(idInterval)clearTimeout(idInterval)
  const complex = btnEasy.classList.contains('active')?'easy':
  btnMiddle.classList.contains('active')?'middle':'hard'
  result.style.display = 'none'
  progressBar.setAttribute('value', 0)
  result.querySelector('.result__win').querySelector('img').setAttribute('src', '')
  result.querySelector('.result__loose').querySelector('img').setAttribute('src', '')
  createGame(complex)
}

function createGame(complex){
   deleteGame()
   gamesItems=createGamesItems(complex).concat(createGamesItems(complex))
   createGrid(gamesItems.length)
   progressBar.setAttribute('max',gamesItems.length)
   gamesItems.sort(()=>0.5-Math.random())
   timer = startTimer =complex=='easy'?25: complex=='middle'?35:50
   time.textContent=`time: ${timer}`
   for(let i of gamesItems){
      let gamesItem = document.createElement('div')
      for(style in startStyleForItems)gamesItem.style[style] = startStyleForItems[style]
      grid.appendChild(gamesItem) 
   }
}

function gameActive(){
   grid.classList.add('active')
   let items = grid.querySelectorAll('div')
   for(let i=0; i<gamesItems.length; i++) items[i].addEventListener('click', ()=>addChooseItems(items[i], gamesItems[i]))
   idInterval = setInterval(()=>{
      if(grid.classList.contains('active')){
         timer-=1
         if(timer<11)time.style.color = 'red'
         if(timer==0)Loose()
         time.textContent=`time: ${timer}`
      }
      }, 1000)
}

function createGrid(total){
   if(total==20) {
      grid.style.width = itemsWidth * 5 + 'px'
      grid.style.height = total.length/5 * itemsHeight + 'px'
   }
   else {
      grid.style.width = itemsWidth * 4 + 'px'
      grid.style.height = total.length/4 * itemsHeight + 'px'
   }
}