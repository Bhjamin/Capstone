const tile1 = document.getElementById('1')
const tile2 = document.getElementById('2')
const tile3 = document.getElementById('3')
const tile4 = document.getElementById('4')
const tile5 = document.getElementById('5')
const tile6 = document.getElementById('6')
const tile7 = document.getElementById('7')
const tile8 = document.getElementById('8')
const tile9 = document.getElementById('9')
const tile10 = document.getElementById('10')
const tile11 = document.getElementById('11')
const tile12 = document.getElementById('12')
const tile13 = document.getElementById('13')
const tile14 = document.getElementById('14')
const tile15 = document.getElementById('15')
const tile16 = document.getElementById('16')
const tile17 = document.getElementById('17')
const tile18 = document.getElementById('18')
const tile19 = document.getElementById('19')
const tile20 = document.getElementById('20')
const tile21 = document.getElementById('21')
const tile22 = document.getElementById('22')
const tile23 = document.getElementById('23')
const tile24 = document.getElementById('24')
const tile25 = document.getElementById('25')
const tile26 = document.getElementById('26')
const tile27 = document.getElementById('27')
const tile28 = document.getElementById('28')
const tile29 = document.getElementById('29')
const tile30 = document.getElementById('30')



const startBtn = document.getElementById('startBtn')
const turnDiv = document.getElementById('turnDiv')
const turnText = document.getElementById('turnText')
const actionText = document.getElementById('actions')

const p1NameInput = document.getElementById('p1NameInput')
    p1NameInput.style.display='none'

const p2NameInput = document.getElementById('p2NameInput')
    p2NameInput.style.display='none'

const nameSubmitBtn = document.getElementById('nameSubmitBtn')
    nameSubmitBtn.style.display='none'

const p1Money = document.getElementById('p1Money')
    p1Money.style.display='none'

const p2Money = document.getElementById('p2Money')
    p2Money.style.display='none'

const p1Top = document.getElementById('p1Top')
const p2Top = document.getElementById('p2Top')

const die = document.getElementById('dieImg')
    die.style.display='none'

const dieResult = document.getElementById('dieResult')

const dieBtn = document.getElementById('dieBtn')
    dieBtn.style.display='none'

const p1Icon = document.getElementById('p1')
    p1Icon.style.display='none'
const p2Icon = document.getElementById('p2')
    p2Icon.style.display='none'



let p1Turn = false
let p2Turn = false
let p1HTML = '<div id="p1"> P1 </div>'
let p2HTML = '<div id="p2"> P2 </div>'
let p1Cash = 400
let p2Cash = 400


const startGame = () => {
    startBtn.style.display='none'
    turnText.style.display='none'

    p1NameInput.style.display='inline'
    p2NameInput.style.display='inline'
    nameSubmitBtn.style.display='inline'
}

const submitNames = () => {
    axios.post('http://localhost:4321/api/submitNames', {name1: p1NameInput.value, name2: p2NameInput.value})
    .then(res => {
        console.log(res.data)
        let player1Card = document.createElement('div')
        player1Card.classList.add('card')
        player1Card.innerHTML = `<h2>Player 1: ${res.data.name1}</h2>`
        let player2Card = document.createElement('div')
        player2Card.classList.add('card')
        player2Card.innerHTML = `<h2>Player 2: ${res.data.name2}</h2>`
        p1Top.appendChild(player1Card)
        p2Top.appendChild(player2Card)
        p1Money.style.display='inline'
        p2Money.style.display='inline'
        turnText.style.display='inline'
        p1NameInput.style.display='none'
        p2NameInput.style.display='none'
        nameSubmitBtn.style.display='none'
        turnText.innerText = `It is ${res.data.name1}s turn!`
        p1Turn = true
        die.style.display='inline'
        dieBtn.style.display='inline'
        p1Icon.style.display='inline'
        p2Icon.style.display='inline'
        p1Money.innerText = `Money: $${p1Cash}`
        p2Money.innerText = `Money: $${p2Cash}`
    })
}

const rollDie = () => {
    if(p1Turn === true){
      dieBtn.style.display='none'
      actionText.innerText = 'Player 1 rolled the die'  
      let result = Math.floor(Math.random() * 6) + 1
      dieResult.innerText = `result: ${result}`
      p1Move(result)
    }
    if(p2Turn === true){
      dieBtn.style.display='none'
      actionText.innerText = 'Player 1 rolled the die'  
      let result = Math.floor(Math.random() * 6) + 1
      dieResult.innerText = `result: ${result}`
      p2Move(result)
    }
}

const p1Move = (num) => {

}

const p2Move = (num) => {

}



startBtn.addEventListener('click', startGame)
nameSubmitBtn.addEventListener('click', submitNames)
dieBtn.addEventListener('click', rollDie)