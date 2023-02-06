const startBtn = document.getElementById('startBtn')
const historyDiv = document.getElementById('historyDiv')
const turnDiv = document.getElementById('turnDiv')
const turnText = document.getElementById('turnText')
const actionText = document.getElementById('actions')
const p1CardDiv = document.getElementById('p1Cards')
const p2CardDiv = document.getElementById('p2Cards')
const p1Props = document.getElementById('p1Props')
const p2Props = document.getElementById('p2Props')
const p1H2 = document.getElementById('p1H2')
    p1H2.style.display='none'
const p2H2 = document.getElementById('p2H2')
    p2H2.style.display='none'

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

const yesBtn = document.getElementById('yesBtn')
    yesBtn.style.display='none'
const noBtn = document.getElementById('noBtn')
    noBtn.style.display='none'



let p1Turn = false
let p2Turn = false
let p1Cash = 400
let p2Cash = 400
let p1Position = 1
let p2Position = 1
let p1Properties = []
let p2Properties = []
let WWowned = 0
let SSowned = 0
let FPowned = 0
let BBowned = 0

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
        p1H2.style.display='inline'
        p2H2.style.display='inline'
        die.style.display='inline'
        dieBtn.style.display='inline'
        p1Icon.style.display='inline'
        p2Icon.style.display='inline'
        p1Money.innerText = `Money: $${p1Cash}`
        p2Money.innerText = `Money: $${p2Cash}`
    })
}

const rollDie = () => {
    dieResult.style.display='none'
    if(p1Turn === true){
      dieBtn.style.display='none'
      addHistory('Player 1 rolled the die')
      die.classList.add('spin')
      setTimeout(() => {
          die.classList.remove('spin')
          dieResult.style.display='block'
          let result = Math.floor(Math.random() * 6) + 1
          dieResult.innerText = `result: ${result}`
          p1Move(result)
      }, 1500)
}

    if(p2Turn === true){
      dieBtn.style.display='none'
      addHistory('Player 2 rolled the die')
      die.classList.add('spin')
      setTimeout(() => {
          dieResult.style.display='block'
          die.classList.remove('spin')
          let result = Math.floor(Math.random() * 6) + 1
          dieResult.innerText = `result: ${result}`
          p2Move(result)
      }, 1500)
    }
}


const p1Move = (num) => {
    if(p1Position + num < 31){
    let target = document.getElementById(`${p1Position + num}`)
    p1Position += num
    p1Icon.parentNode.removeChild(p1Icon)
    target.appendChild(p1Icon)


        if(p1Icon.parentElement.className.includes('empty')){
            setTimeout(() => {
                switchTurn()
            }, 2500)
        }

        if(p1Icon.parentElement.className.includes('green')){
        p1Cash += 250
        p1Money.innerText = `Money: $${p1Cash}`
        addHistory('Player 1 landed on green and gained $250!')
        setTimeout(() => {
            switchTurn()
        }, 5000)
        }

        if(p1Icon.parentElement.className.includes('red')){
        p1Cash -= 100
        p1Money.innerText = `Money: $${p1Cash}`
        addHistory('Player 1 landed on red and lost $100!')
        setTimeout(() => {
            switchTurn()
        }, 5000)
        }

        if(p1Icon.parentElement.className.includes('yellow')){
            addHistory('Player 1 landed on a random event space!')
            randEvent()
            setTimeout(() => {
                switchTurn()
            }, 5000)
        }

        if(p1Icon.parentElement.className.includes('purp')){
            if(p1Icon.parentElement.id === '9'){
                if(WWowned === 0){
                    dieResult.style.display='none'
                    actionText.style.display='inline'
                    actionText.innerText = 'Would you like to buy Wacky Walkway for $500?'
                    die.style.display='none'
                    dieBtn.style.display='none'
                    yesBtn.style.display='inline'
                    noBtn.style.display='inline'
                }
                if(WWowned === 1){
                    p1Cash += 350
                    p1Money.innerText = `Money: $${p1Cash}`
                    addHistory('Player 1 collected $350 from their property')
                    setTimeout(() => {
                        switchTurn()
                    }, 3000)
                }
                if(WWowned === 2){
                    p1Cash -= 200
                    p2Cash += 200
                    p1Money.innerText = `Money: $${p1Cash}`
                    p2Money.innerText = `Money: $${p2Cash}`
                    addHistory('Player 1 had to pay player 2 $200 for landing on their property!')
                    setTimeout(() => {
                        switchTurn()
                    }, 3000)
                }
            }

            if(p1Icon.parentElement.id === '15'){
                if(SSowned === 0){
                    actionText.innerText = 'Would you like to buy Silly Street for $500?'
                    actionText.style.display='inline'
                    dieResult.style.display='none'
                    die.style.display='none'
                    dieBtn.style.display='none'
                    yesBtn.style.display='inline'
                    noBtn.style.display='inline'
                }
                if(SSowned === 1){
                    p1Cash += 350
                    p1Money.innerText = `Money: $${p1Cash}`
                    addHistory('Player 1 collected $350 from their property')
                    setTimeout(() => {
                        switchTurn()
                    }, 3000)
                }
                if(SSowned === 2){
                    p1Cash -= 200
                    p2Cash += 200
                    p1Money.innerText = `Money: $${p1Cash}`
                    p2Money.innerText = `Money: $${p2Cash}`
                    addHistory('Player 1 had to pay player 2 $200 for landing on their property!')
                    setTimeout(() => {
                        switchTurn()
                    }, 3000)
                }
            }

            if(p1Icon.parentElement.id === '22'){
                if(BBowned === 0){
                    actionText.innerText = 'Would you like to buy Bouncy Boulevard for $500?'
                    actionText.style.display='inline'
                    dieResult.style.display='none'
                    die.style.display='none'
                    dieBtn.style.display='none'
                    yesBtn.style.display='inline'
                    noBtn.style.display='inline'
                }
                if(BBowned === 1){
                    p1Cash += 350
                    p1Money.innerText = `Money: $${p1Cash}`
                    addHistory('Player 1 collected $350 from their property')
                    setTimeout(() => {
                        switchTurn()
                    }, 3000)
                }
                if(BBowned === 2){
                    p1Cash -= 200
                    p2Cash += 200
                    p1Money.innerText = `Money: $${p1Cash}`
                    p2Money.innerText = `Money: $${p2Cash}`
                    addHistory('Player 1 had to pay player 2 $200 for landing on their property!')
                    setTimeout(() => {
                        switchTurn()
                    }, 3000)
                }
            }

            if(p1Icon.parentElement.id === '27'){
                if(FPowned === 0){
                    actionText.innerText = 'Would you like to buy Funky Park for $500?'
                    actionText.style.display='inline'
                    dieResult.style.display='none'
                    die.style.display='none'
                    dieBtn.style.display='none'
                    yesBtn.style.display='inline'
                    noBtn.style.display='inline'
                }
                if(FPowned === 1){
                    p1Cash += 350
                    p1Money.innerText = `Money: $${p1Cash}`
                    addHistory('Player 1 collected $350 from their property')
                    setTimeout(() => {
                        switchTurn()
                    }, 3000)
                }
                if(FPowned === 2){
                    p1Cash -= 200
                    p2Cash += 200
                    p1Money.innerText = `Money: $${p1Cash}`
                    p2Money.innerText = `Money: $${p2Cash}`
                    addHistory('Player 1 had to pay player 2 $200 for landing on their property!')
                    setTimeout(() => {
                        switchTurn()
                    }, 3000)
                }
            }
            
            
        }

    } else {
        let overflow = (p1Position + num) - 30
        let target = document.getElementById(`${overflow}`)
        p1Position = overflow
        p1Icon.parentNode.removeChild(p1Icon)
        target.appendChild(p1Icon)

        if(p1Icon.parentElement.className.includes('empty')){
            setTimeout(() => {
                switchTurn()
            }, 2500)
        }

        if(p1Icon.parentElement.className.includes('green')){
            p1Cash += 250
            p1Money.innerText = `Money: $${p1Cash}`
            addHistory('Player 1 landed on green and gained $250!')
            setTimeout(() => {
                switchTurn()
            }, 5000)
            }
    
            if(p1Icon.parentElement.className.includes('red')){
            p1Cash -= 100
            p1Money.innerText = `Money: $${p1Cash}`
            addHistory('Player 1 landed on red and lost $100!')
            setTimeout(() => {
                switchTurn()
            }, 5000)
            }
    
            if(p1Icon.parentElement.className.includes('yellow')){
                addHistory('Player 1 landed on a random event space!')
                randEvent()
                setTimeout(() => {
                    switchTurn()
                }, 5000)
            }
    
            if(p1Icon.parentElement.className.includes('purp')){
                if(p1Icon.parentElement.id === '9'){
                    if(WWowned === 0){
                        actionText.style.display='inline'
                        actionText.innerText = 'Would you like to buy Wacky Walkway for $500?'
                        dieResult.style.display='none'
                        die.style.display='none'
                        dieBtn.style.display='none'
                        yesBtn.style.display='inline'
                        noBtn.style.display='inline'
                    }
                    if(WWowned === 1){
                        p1Cash += 350
                        p1Money.innerText = `Money: $${p1Cash}`
                        addHistory('Player 1 collected $350 from their property')
                        setTimeout(() => {
                            switchTurn()
                        }, 3000)
                    }
                    if(WWowned === 2){
                        p1Cash -= 200
                        p2Cash += 200
                        p1Money.innerText = `Money: $${p1Cash}`
                        p2Money.innerText = `Money: $${p2Cash}`
                        addHistory('Player 1 had to pay player 2 $200 for landing on their property!')
                        setTimeout(() => {
                            switchTurn()
                        }, 3000)
                    }
                }
    
                if(p1Icon.parentElement.id === '15'){
                    if(SSowned === 0){
                        actionText.style.display='inline'
                        actionText.innerText = 'Would you like to buy Silly Street for $500?'
                        dieResult.style.display='none'
                        die.style.display='none'
                        dieBtn.style.display='none'
                        yesBtn.style.display='inline'
                        noBtn.style.display='inline'
                    }
                    if(SSowned === 1){
                        p1Cash += 350
                        p1Money.innerText = `Money: $${p1Cash}`
                        addHistory('Player 1 collected $350 from their property')
                        setTimeout(() => {
                            switchTurn()
                        }, 3000)
                    }
                    if(SSowned === 2){
                        p1Cash -= 200
                        p2Cash += 200
                        p1Money.innerText = `Money: $${p1Cash}`
                        p2Money.innerText = `Money: $${p2Cash}`
                        addHistory('Player 1 had to pay player 2 $200 for landing on their property!')
                        setTimeout(() => {
                            switchTurn()
                        }, 3000)
                    }
                }
    
                if(p1Icon.parentElement.id === '22'){
                    if(BBowned === 0){
                        actionText.style.display='inline'
                        actionText.innerText = 'Would you like to buy Bouncy Boulevard for $500?'
                        dieResult.style.display='none'
                        die.style.display='none'
                        dieBtn.style.display='none'
                        yesBtn.style.display='inline'
                        noBtn.style.display='inline'
                    }
                    if(BBowned === 1){
                        p1Cash += 350
                        p1Money.innerText = `Money: $${p1Cash}`
                        addHistory('Player 1 collected $350 from their property')
                        setTimeout(() => {
                            switchTurn()
                        }, 3000)
                    }
                    if(BBowned === 2){
                        p1Cash -= 200
                        p2Cash += 200
                        p1Money.innerText = `Money: $${p1Cash}`
                        p2Money.innerText = `Money: $${p2Cash}`
                        addHistory('Player 1 had to pay player 2 $200 for landing on their property!')
                        setTimeout(() => {
                            switchTurn()
                        }, 3000)
                    }
                }
    
                if(p1Icon.parentElement.id === '27'){
                    if(FPowned === 0){
                        actionText.style.display='inline'
                        actionText.innerText = 'Would you like to buy Funky Park for $500?'
                        dieResult.style.display='none'
                        die.style.display='none'
                        dieBtn.style.display='none'
                        yesBtn.style.display='inline'
                        noBtn.style.display='inline'
                    }
                    if(FPowned === 1){
                        p1Cash += 350
                        p1Money.innerText = `Money: $${p1Cash}`
                        addHistory('Player 1 collected $350 from their property')
                        setTimeout(() => {
                            switchTurn()
                        }, 3000)
                    }
                    if(FPowned === 2){
                        p1Cash -= 200
                        p2Cash += 200
                        p1Money.innerText = `Money: $${p1Cash}`
                        p2Money.innerText = `Money: $${p2Cash}`
                        addHistory('Player 1 had to pay player 2 $200 for landing on their property!')
                        setTimeout(() => {
                            switchTurn()
                        }, 3000)
                    }
                }
                
                
            }
    
        
    }

}

const p2Move = (num) => {
    if(p2Position + num < 31){
        let target = document.getElementById(`${p2Position + num}`)
        p2Position += num
        p2Icon.parentNode.removeChild(p2Icon)
        target.appendChild(p2Icon)

        if(p2Icon.parentElement.className.includes('empty')){
            setTimeout(() => {
                switchTurn()
            }, 2500)
        }
    
            if(p2Icon.parentElement.className.includes('green')){
            p2Cash += 250
            p2Money.innerText = `Money: $${p2Cash}`
            addHistory('Player 2 landed on green and gained $250!')
            setTimeout(() => {
                switchTurn()
            }, 5000)
            }
    
            if(p2Icon.parentElement.className.includes('red')){
            p2Cash -= 100
            p2Money.innerText = `Money: $${p2Cash}`
            addHistory('Player 2 landed on red and lost $100!')
            setTimeout(() => {
                switchTurn()
            }, 5000)
            }
    
            if(p2Icon.parentElement.className.includes('yellow')){
                addHistory('Player 2 landed on a random event space!')
                randEvent()
                setTimeout(() => {
                    switchTurn()
                }, 5000)
            }
    
            if(p2Icon.parentElement.className.includes('purp')){
                if(p2Icon.parentElement.id === '9'){
                    if(WWowned === 0){
                        actionText.style.display='inline'
                        actionText.innerText = 'Would you like to buy Wacky Walkway for $500?'
                        dieResult.style.display='none'
                        die.style.display='none'
                        dieBtn.style.display='none'
                        yesBtn.style.display='inline'
                        noBtn.style.display='inline'
                    }
                    if(WWowned === 1){
                        p2Cash -= 200
                        p1Cash += 200
                        p1Money.innerText = `Money: $${p1Cash}`
                        p2Money.innerText = `Money: $${p2Cash}`
                        addHistory('Player 2 had to pay player 1 $200 for landing on their property!')
                        setTimeout(() => {
                            switchTurn()
                        }, 3000)
                    }
                    if(WWowned === 2){
                        p2Cash += 350
                        p2Money.innerText = `Money: $${p2Cash}`
                        addHistory('Player 2 collected $350 from their property')
                        setTimeout(() => {
                            switchTurn()
                        }, 3000)
                    }
                }
    
                if(p2Icon.parentElement.id === '15'){
                    if(SSowned === 0){
                        actionText.style.display='inline'
                        actionText.innerText = 'Would you like to buy Silly Street for $500?'
                        dieResult.style.display='none'
                        die.style.display='none'
                        dieBtn.style.display='none'
                        yesBtn.style.display='inline'
                        noBtn.style.display='inline'
                    }
                    if(SSowned === 1){
                        p2Cash -= 200
                        p1Cash += 200
                        p1Money.innerText = `Money: $${p1Cash}`
                        p2Money.innerText = `Money: $${p2Cash}`
                        addHistory('Player 2 had to pay player 1 $200 for landing on their property!')
                        setTimeout(() => {
                            switchTurn()
                        }, 3000)
                    }
                    if(SSowned === 2){
                        p2Cash += 350
                        p2Money.innerText = `Money: $${p2Cash}`
                        addHistory('Player 2 collected $350 from their property')
                        setTimeout(() => {
                            switchTurn()
                        }, 3000)
                    }
                }
    
                if(p2Icon.parentElement.id === '22'){
                    if(BBowned === 0){
                        actionText.style.display='inline'
                        actionText.innerText = 'Would you like to buy Bouncy Boulevard for $500?'
                        dieResult.style.display='none'
                        die.style.display='none'
                        dieBtn.style.display='none'
                        yesBtn.style.display='inline'
                        noBtn.style.display='inline'
                    }
                    if(BBowned === 1){
                        p1Cash += 200
                        p2Cash -= 200
                        p1Money.innerText = `Money: $${p1Cash}`
                        p2Money.innerText = `Money: $${p2Cash}`
                        addHistory('Player 2 had to pay player 1 $200 for landing on their property!')
                        setTimeout(() => {
                            switchTurn()
                        }, 3000)
                    }
                    if(BBowned === 2){
                        p2Cash += 350
                        p2Money.innerText = `Money: $${p2Cash}`
                        addHistory('Player 2 collected $350 from their property')
                        
                        setTimeout(() => {
                            switchTurn()
                        }, 3000)
                    }
                }
    
                if(p2Icon.parentElement.id === '27'){
                    if(FPowned === 0){
                        actionText.style.display='inline'
                        actionText.innerText = 'Would you like to buy Funky Park for $500?'
                        dieResult.style.display='none'
                        die.style.display='none'
                        dieBtn.style.display='none'
                        yesBtn.style.display='inline'
                        noBtn.style.display='inline'
                    }
                    if(FPowned === 1){
                        p1Cash += 200
                        p2Cash -= 200
                        p1Money.innerText = `Money: $${p1Cash}`
                        p2Money.innerText = `Money: $${p2Cash}`
                        addHistory('Player 2 had to pay player 1 $200 for landing on their property!')
                        setTimeout(() => {
                            switchTurn()
                        }, 3000)
                    }
                    if(FPowned === 2){
                        p2Cash += 350
                        p2Money.innerText = `Money: $${p2Cash}`
                        addHistory('Player 2 collected $350 from their property')
                        setTimeout(() => {
                            switchTurn()
                        }, 3000)
                    }
                }
                
                
            }
    
        } else {
            let overflow = (p2Position + num) - 30
            let target = document.getElementById(`${overflow}`)
            p2Position = overflow
            p2Icon.parentNode.removeChild(p2Icon)
            target.appendChild(p2Icon)

            if(p2Icon.parentElement.className.includes('empty')){
                setTimeout(() => {
                    switchTurn()
                }, 2500)
            }
    
            if(p2Icon.parentElement.className.includes('green')){
                p2Cash += 250
                p2Money.innerText = `Money: $${p2Cash}`
                addHistory('Player 2 landed on green and gained $250!')
                setTimeout(() => {
                    switchTurn()
                }, 5000)
                }
        
                if(p2Icon.parentElement.className.includes('red')){
                p2Cash -= 100
                p2Money.innerText = `Money: $${p2Cash}`
                addHistory('Player 2 landed on red and lost $100!')
                setTimeout(() => {
                    switchTurn()
                }, 5000)
                }
        
                if(p2Icon.parentElement.className.includes('yellow')){
                    addHistory('Player 2 landed on a random event space!')
                    randEvent()
                    setTimeout(() => {
                        switchTurn()
                    }, 5000)
                }
        
                if(p2Icon.parentElement.className.includes('purp')){
                    if(p2Icon.parentElement.id === '9'){
                        if(WWowned === 0){
                            actionText.style.display='inline'
                            actionText.innerText = 'Would you like to buy Wacky Walkway for $500?'
                            dieResult.style.display='none'
                            die.style.display='none'
                            dieBtn.style.display='none'
                            yesBtn.style.display='inline'
                            noBtn.style.display='inline'
                        }
                        if(WWowned === 1){
                            p2Cash -= 200
                            p1Cash += 200
                            p1Money.innerText = `Money: $${p1Cash}`
                            p2Money.innerText = `Money: $${p2Cash}`
                            addHistory('Player 2 had to pay player 1 $200 for landing on their property!')
                            setTimeout(() => {
                                switchTurn()
                            }, 3000)
                        }
                        if(WWowned === 2){
                            p2Cash += 350
                            p2Money.innerText = `Money: $${p2Cash}`
                            addHistory('Player 2 collected $350 from their property')
                            setTimeout(() => {
                                switchTurn()
                            }, 3000)
                        }
                    }
        
                    if(p2Icon.parentElement.id === '15'){
                        if(SSowned === 0){
                            actionText.style.display='inline'
                            actionText.innerText = 'Would you like to buy Silly Street for $500?'
                            dieResult.style.display='none'
                            die.style.display='none'
                            dieBtn.style.display='none'
                            yesBtn.style.display='inline'
                            noBtn.style.display='inline'
                        }
                        if(SSowned === 1){
                            p2Cash -= 200
                            p1Cash += 200
                            p1Money.innerText = `Money: $${p1Cash}`
                            p2Money.innerText = `Money: $${p2Cash}`
                            addHistory('Player 2 had to pay player 1 $200 for landing on their property!')
                            setTimeout(() => {
                                switchTurn()
                            }, 3000)
                        }
                        if(SSowned === 2){
                            p2Cash += 350
                            p2Money.innerText = `Money: $${p2Cash}`
                            addHistory('Player 2 collected $350 from their property')
                            setTimeout(() => {
                                switchTurn()
                            }, 3000)
                        }
                    }
        
                    if(p2Icon.parentElement.id === '22'){
                        if(BBowned === 0){
                            actionText.style.display='inline'
                            actionText.innerText = 'Would you like to buy Bouncy Boulevard for $500?'
                            dieResult.style.display='none'
                            die.style.display='none'
                            dieBtn.style.display='none'
                            yesBtn.style.display='inline'
                            noBtn.style.display='inline'
                        }
                        if(BBowned === 1){
                            p1Cash += 200
                            p2Cash -= 200
                            p1Money.innerText = `Money: $${p1Cash}`
                            p2Money.innerText = `Money: $${p2Cash}`
                            addHistory('Player 2 had to pay player 1 $200 for landing on their property!')
                            setTimeout(() => {
                                switchTurn()
                            }, 3000)
                        }
                        if(BBowned === 2){
                            p2Cash += 350
                            p2Money.innerText = `Money: $${p2Cash}`
                            addHistory('Player 2 collected $350 from their property')
                            setTimeout(() => {
                                switchTurn()
                            }, 3000)
                        }
                    }
        
                    if(p2Icon.parentElement.id === '27'){
                        if(FPowned === 0){
                            actionText.style.display='inline'
                            actionText.innerText = 'Would you like to buy Funky Park for $500?'
                            dieResult.style.display='none'
                            die.style.display='none'
                            dieBtn.style.display='none'
                            yesBtn.style.display='inline'
                            noBtn.style.display='inline'
                        }
                        if(FPowned === 1){
                            p1Cash += 200
                            p2Cash -= 200
                            p1Money.innerText = `Money: $${p1Cash}`
                            p2Money.innerText = `Money: $${p2Cash}`
                            addHistory('Player 2 had to pay player 1 $200 for landing on their property!')
                            setTimeout(() => {
                                switchTurn()
                            }, 3000)
                        }
                        if(FPowned === 2){
                            p2Cash += 350
                            p2Money.innerText = `Money: $${p2Cash}`
                            addHistory('Player 2 collected $350 from their property')
                            setTimeout(() => {
                                switchTurn()
                            }, 3000)
                        }
                    }
                    
                    
                }
        
            
        }
}


const randEvent = () => {
    dieResult.style.display='none'
    axios.get('http://localhost:4321/api/randEvent')
    .then(res => {
        console.log(res.data)
        if(res.data === 'G3'){
            if(p1Turn === true){
                p1Cash += 300
                p1Money.innerText = `Money: $${p1Cash}`
                setTimeout(() => {
                addHistory('Player 1 gained $300')
                }, 1500)
            } else {
                p2Cash += 300
                p2Money.innerText = `Money: $${p2Cash}`
                setTimeout(() => {
                    addHistory('Player 2 gained $300')
                    }, 1500)
            }
        }
        if(res.data === 'G1'){
            if(p1Turn === true){
                p1Cash += 100
                p1Money.innerText = `Money: $${p1Cash}`
                setTimeout(() => {
                    addHistory('Player 1 gained $100')
                    }, 1500)
            } else {
                p2Cash += 100
                p2Money.innerText = `Money: $${p2Cash}`
                setTimeout(() => {
                    addHistory('Player 2 gained $100')
                    }, 1500)
            }
        }
        if(res.data === 'S50'){
            if(p1Turn === true){
                p1Cash += 50
                p2Cash -= 50
                p1Money.innerText = `Money: $${p1Cash}`
                p2Money.innerText = `Money: $${p2Cash}`
                setTimeout(() => {
                addHistory('Player 1 stole $50 from Player 2!')
                }, 1500)
            } else {
                p2Cash += 50
                p1Cash -= 50
                p1Money.innerText = `Money: $${p1Cash}`
                p2Money.innerText = `Money: $${p2Cash}`
                setTimeout(() => {
                    addHistory('Player 2 stole $50 from Player 1!')
                    }, 1500)
            }
        }
        if(res.data === 'S2'){
            if(p1Turn === true){
                p1Cash += 200
                p2Cash -= 200
                p1Money.innerText = `Money: $${p1Cash}`
                p2Money.innerText = `Money: $${p2Cash}`
                setTimeout(() => {
                    addHistory('Player 1 stole $200 from Player 2!')
                    }, 1500)
            } else {
                p2Cash += 200
                p1Cash -= 200
                p1Money.innerText = `Money: $${p1Cash}`
                p2Money.innerText = `Money: $${p2Cash}`
                setTimeout(() => {
                    addHistory('Player 2 stole $200 from Player 1!')
                    }, 1500)
            }
        }
        if(res.data === 'L50'){
            if(p1Turn === true){
            p1Cash -= 50
            p1Money.innerText = `Money: $${p1Cash}`
            setTimeout(() => {
                addHistory('Player 1 lost $50')
                }, 1500)
            } else {
            p2Cash -= 50
            p2Money.innerText = `Money: $${p2Cash}`
            setTimeout(() => {
                addHistory('Player 2 lost $50')
                }, 1500)
            }
        }
        if(res.data === 'L1'){
            if(p1Turn === true){
            p1Cash -= 100
            p1Money.innerText = `Money: $${p1Cash}`
            setTimeout(() => {
                addHistory('Player 1 lost $100')
                }, 1500)
            } else {
            p2Cash -= 100
            p2Money.innerText = `Money: $${p2Cash}`
            setTimeout(() => {
                addHistory('Player 2 lost $100')
                }, 1500)
            }
        }
        
        
    })
}

const buyProp = () => {
    dieResult.style.display='none'
    if(p1Turn === true){
        dieResult.style.display='none'
        if(p1Cash > 499){
            dieResult.style.display='none'
            if(p1Icon.parentElement.id === '9'){
            p1Cash -= 500
            p1Money.innerText = `Money: $${p1Cash}`
            addHistory('Player 1 bought Wacky Walkway for $500!')
            WWowned = 1
            p1Properties.push(' Wacky Walkway')
            p1Props.innerText = `${p1Properties}`
            setTimeout(() => {
                switchTurn()
            }, 3000)
            }
            if(p1Icon.parentElement.id === '15'){
                p1Cash -= 500
                p1Money.innerText = `Money: $${p1Cash}`
                addHistory('Player 1 bought Silly Street for $500!')
                SSowned = 1
                p1Properties.push(' Silly Street')
                p1Props.innerText = `${p1Properties}`
                setTimeout(() => {
                    switchTurn()
            }, 3000)
            }
            if(p1Icon.parentElement.id === '22'){
                p1Cash -= 500
                p1Money.innerText = `Money: $${p1Cash}`
                addHistory('Player 1 bought Bouncy Boulevard for $500!')
                BBowned = 1
                p1Properties.push(' Bouncy Boulevard')
                p1Props.innerText = `${p1Properties}`
                setTimeout(() => {
                    switchTurn()
            }, 3000)
            }
            if(p1Icon.parentElement.id === '27'){
                p1Cash -= 500
                p1Money.innerText = `Money: $${p1Cash}`
                addHistory('Player 1 bought Funky Park for $500!')
                FPowned = 1
                p1Properties.push(' Funky Park')
                p1Props.innerText = `${p1Properties}`
                setTimeout(() => {
                    switchTurn()
            }, 3000)
            }
        } else {
            addHistory('Player 1 did not have enough money')
            setTimeout(() => {
                switchTurn()
        }, 2000)
        }
        
    }

    if(p2Turn === true){
        dieResult.style.display='none'
        if(p2Cash > 499){
            if(p2Icon.parentElement.id === '9'){
            p2Cash -= 500
            p2Money.innerText = `Money: $${p2Cash}`
            addHistory('Player 2 bought Wacky Walkway for $500!')
            WWowned = 2
            p2Properties.push(' Wacky Walkway')
            p2Props.innerText = `${p2Properties}`
            setTimeout(() => {
                switchTurn()
            }, 3000)
            }
            if(p2Icon.parentElement.id === '15'){
                p2Cash -= 500
                p2Money.innerText = `Money: $${p2Cash}`
                addHistory('Player 2 bought Silly Street for $500!')
                SSowned = 2
                p2Properties.push(' Silly Street')
                p2Props.innerText = `${p2Properties}`
                setTimeout(() => {
                    switchTurn()
            }, 3000)
            }
            if(p2Icon.parentElement.id === '22'){
                p2Cash -= 500
                p2Money.innerText = `Money: $${p2Cash}`
                addHistory('Player 2 bought Bouncy Boulevard for $500!')
                BBowned = 2
                p2Properties.push(' Bouncy Boulevard')
                p2Props.innerText = `${p2Properties}`
                setTimeout(() => {
                    switchTurn()
            }, 3000)
            }
            if(p2Icon.parentElement.id === '27'){
                p2Cash -= 500
                p2Money.innerText = `Money: $${p2Cash}`
                addHistory('Player 2 bought Funky Park for $500!')
                FPowned = 2
                p2Properties.push(' Funky Park')
                p2Props.innerText = `${p2Properties}`
                setTimeout(() => {
                    switchTurn()
            }, 3000)
            }
        } else {
            addHistory('Player 2 did not have enough money')
            setTimeout(() => {
                switchTurn()
        }, 2000)
        }
        
    }
}

const switchTurn = () => {
    if(p1Turn === true){
        if(p1Cash > 1999){
            turnText.innerText = 'Player 1 won the game!'
            die.style.display='none'
            dieBtn.style.display='none'
            actionText.style.display='none'
        }
        if(p1Cash < 2000){
            axios.get('http://localhost:4321/api/getP2Name')
            .then(res => {
                p1Turn = false
                p2Turn = true
                turnText.innerText = `It is ${res.data}s turn!`
                yesBtn.style.display='none'
                noBtn.style.display='none'
                die.style.display='inline'
                dieBtn.style.display='inline'
                actionText.style.display='none'
            })
        }
    } else {
        if(p2Cash > 1999){
            turnText.innerText = 'Player 2 won the game!'
            die.style.display='none'
            dieBtn.style.display='none'
            actionText.style.display='none'
        }
        if(p2Cash < 2000){
            axios.get('http://localhost:4321/api/getP1Name')
            .then(res => {
                p2Turn = false
                p1Turn = true
                turnText.innerText = `It is ${res.data}s turn!`
                yesBtn.style.display='none'
                noBtn.style.display='none'
                dieBtn.style.display='inline'
                die.style.display='inline'
                actionText.style.display='none'
            })
        }
        
    }
}

const addHistory = (text) => {

let action = document.createElement('h3')
action.innerText = `${text}`
historyDiv.appendChild(action)
setTimeout(() => {
    action.remove()
}, 15000)


}


startBtn.addEventListener('click', startGame)
nameSubmitBtn.addEventListener('click', submitNames)
dieBtn.addEventListener('click', rollDie)
yesBtn.addEventListener('click', buyProp)
noBtn.addEventListener('click', switchTurn)