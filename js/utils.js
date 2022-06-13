let lastKey;
let lastJump;

function rectangularCollision({rectangle1, rectangle2}) {
    return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
    rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
     )
}

function determineWinner({player1, player2, timerId}) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player1.health === player2.health) {
        document.querySelector('#displayText').innerHTML = 'Tie'   
    } else if (player1.health > player2.health) {
        document.querySelector('#displayText').innerHTML = 'Player One Wins!'
    } else if (player1.health < player2.health) {
        document.querySelector('#displayText').innerHTML = 'Player Two Wins!'
        
    }
}

let timer = 10
let timerId

function decreaseTimer() {
    if (timer > 0) {
      timerId = setTimeout(decreaseTimer, 1000)
      timer--
      document.querySelector('#timer').innerHTML = timer
}

if (timer === 0) {
    determineWinner({player1, player2})
}
}