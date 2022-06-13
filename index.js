const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
    position: {
    x: 0,
    y: 0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
    position: {
    x: 600,
    y: 128
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6
})

const player1 = new Fighter({
    position: {
        x:0, 
        y:0
    }, 
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 156
    },
    framesHold: 100,
});

const player2 = new Fighter({
    position: {
        x:400, 
        y:200
    }, 
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: -50,
        y: 0
    },
    scale: 2.5,
    imageSrc: './img/kenji/Idle.png',
    framesMax: 4,
    offset: {
        x: 415,
        y: 170
    },
    framesHold: 25,
});

console.log(player1)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();
    player1.update('blue');
    player2.update('red');

    player1.velocity.x = 0; // Left Player
    player2.velocity.x = 0; // Right Player

    // Player 1 Movement
    if (keys.a.pressed) {
        player1.velocity.x = -5
    } else if (keys.d.pressed) {
        player1.velocity.x = 5
    }
    if (keys.w.pressed && player1.lastJump === 'w') {
        if (player1.lastJump === 'w' && player1.position.y >= 330 && player1.position.y <= 331) {
            player1.velocity.y = -13
        }
    }

    // Player 2 Movement
    if (keys.ArrowLeft.pressed) {
        player2.velocity.x = -5
    } else if (keys.ArrowRight.pressed) {
        player2.velocity.x = 5
    }
    if (keys.ArrowUp.pressed && player2.lastJump === 'ArrowUp') {
        if (player2.lastJump === 'ArrowUp' && player2.position.y >= 330 && player2.position.y <= 331) {
            player2.velocity.y = -13
        }
    }

    // Detect for Collision 

    if (
        rectangularCollision({
            rectangle1: player1,
            rectangle2: player2
        }) && player1.isAttacking) {
        player1.isAttacking = false;
        player2.health -= 20
        document.querySelector('#playerTwoHealth').style.width = player2.health + '%'
    }

    if (
    rectangularCollision({
        rectangle1: player2,
        rectangle2: player1
    }) && player2.isAttacking) {
    player2.isAttacking = false;
    player1.health -= 20
    document.querySelector('#playerOneHealth').style.width = player1.health + '%'
    }

    // end game based on health
    if (player1.health <= 0 || player2.health <= 0) {
        determineWinner({player1, player2, timerId})
    }
}

decreaseTimer()

animate()

window.addEventListener('keydown', () => {
    switch (event.key) {
        // Player 1 Buttons

        case 'd':
            keys.d.pressed = true
            player1.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player1.lastKey = 'a'
            break
        case 'w':
            keys.w.pressed = true
            player1.lastJump = 'w'
            break
        case ' ':
            player1.attack()
            break

        // Player 2 buttons
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            player2.lastJump = 'ArrowUp'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            player2.lastKey = 'ArrowLeft'
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            player2.lastKey = 'ArrowRight'
            break
        case 'ArrowDown':
            player2.attack()
            break
    }
    console.log(event);
})

window.addEventListener('keyup', () => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            player1.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = false
            player1.lastKey = 'a'
            break
        case 'w':
            keys.w.pressed = false
            player1.lastJump = 'w'
            break

        // Enemy movement cancellation
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            player2.lastJump = 'ArrowUp'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            player2.lastKey = 'ArrowLeft'
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            player2.lastKey = 'ArrowRight'
            break
    }
    console.log(event);
})

console.log(player1.position.y)


