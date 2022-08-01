const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

const background = new Sprite({
    position: {
    x: 0,
    y: 0
    },
    imageWidth: canvas.width,
    imageHeight: canvas.height,
    imageSrc: './img/background.png',
})

const shop = new Sprite({
    position: {
    x: 600,
    y: 128
    },
    imageWidth: 708,
    imageHeight: 128,
    width: 100,
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6,
    framesHold: 15
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
    imageSrc: './img/kenji/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 156
    },
    framesHold: 6,
    sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            framesMax: 8,
        },
        run: {
            imageSrc: './img/samuraiMack/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './img/samuraiMack/Attack1.png',
            framesMax: 6,
        },
        attack2: {
            imageSrc: './img/samuraiMack/Attack2.png',
            framesMax: 6,
        },
        takeHit: {
            imageSrc: './img/samuraiMack/Take Hit.png',
            framesMax: 4,
        },
        death: {
            imageSrc: './img/samuraiMack/Death.png',
            framesMax: 6,
        },

    },
    attackBox: {
        offset: {
            x: 100,
            y: 50,
        },
        width: 160,
        height: 50
    }
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
    offset: {
        x: 215,
        y: 170
    },
    framesHold: 9,
    sprites: {
        idle: {
            imageSrc: './img/kenji/Idle.png',
            framesMax: 4,
        },
        run: {
            imageSrc: './img/kenji/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './img/kenji/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './img/kenji/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './img/kenji/Attack1.png',
            framesMax: 4,
        },
        attack2: {
            imageSrc: './img/kenji/Attack2.png',
            framesMax: 4,
        },
        takeHit: {
            imageSrc: './img/kenji/Take hit.png',
            framesMax: 3,
        },
        death: {
            imageSrc: './img/kenji/Death.png',
            framesMax: 7,
        },
        
    },
    attackBox: {
        offset: {
            x: -170,
            y: 50,
        },
        width: 170,
        height: 50
    }
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
        player1.velocity.x = -3
        player1.switchSprite('run')
    } else if (keys.d.pressed) {
        player1.velocity.x = 3
        player1.switchSprite('run')
    } else {
        player1.switchSprite('idle')
    }
    if (keys.w.pressed && player1.lastJump === 'w') {
        if (player1.lastJump === 'w' && player1.position.y >= 330 && player1.position.y <= 331) {
            player1.velocity.y = -7
        }
    } 
    console.log(player1.velocity.y)
    if (player1.velocity.y < 0) {
        player1.switchSprite('jump')
    } else if (player1.velocity.y > 0) {
        player1.switchSprite('fall')
    }

    // Player 2 Movement
    if (keys.ArrowLeft.pressed) {
        player2.velocity.x = -3
        player2.switchSprite('run')
    } else if (keys.ArrowRight.pressed) {
        player2.velocity.x = 3
        player2.switchSprite('run')
    } else {
        player2.switchSprite('idle')
    }
    if (keys.ArrowUp.pressed && player2.lastJump === 'ArrowUp') {
        if (player2.lastJump === 'ArrowUp' && player2.position.y >= 330 && player2.position.y <= 331) {
            player2.velocity.y = -7
        }
    } 
    if (player2.velocity.y < 0) {
        player2.switchSprite('jump')
    } else if (player2.velocity.y > 0) {
        player2.switchSprite('fall')
    }

    // Detect for Collision & enemy gets hit

    if (
        rectangularCollision({
            rectangle1: player1,
            rectangle2: player2
        }) && 
        player1.isAttacking && player1.frameCurrent === 4
    ) {
        player2.takeHit()
        player1.isAttacking = false;
        document.querySelector('#playerTwoHealth').style.width = player2.health + '%'
    }

    // if player misses
    if (player1.isAttacking && player1.frameCurrent === 4) {
        player1.isAttacking = false
    }

    if (
    rectangularCollision({
        rectangle1: player2,
        rectangle2: player1
    }) && 
    player2.isAttacking
    ) {
    player1.takeHit()
    player2.isAttacking = false;
    document.querySelector('#playerOneHealth').style.width = player1.health + '%'
    }

    if (player2.isAttacking && player2.frameCurrent === 2) {
        player2.isAttacking = false
    }

    // end game based on health
    if (player1.health <= 0 || player2.health <= 0) {
        determineWinner({player1, player2, timerId})
    }
}

decreaseTimer()

animate()

window.addEventListener('keydown', () => {
    if (!player1.dead) {
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
            if (player1.isAttacking === true && player1.frameCurrent > 0) {
                player1.attack('attack2')
            } else {
                player1.attack('attack1')
            }
            break
        }
    }
    // Player 2 buttons
if (!player2.dead) {
    switch(event.key){
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
            if (player2.isAttacking === true && player2.frameCurrent > 0) {
                player2.attack('attack2')
            } else {
                player2.attack('attack1')
            }
            break
        }
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