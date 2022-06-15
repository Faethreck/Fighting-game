class Sprite {
    constructor({
        position, 
        imageSrc, 
        scale = 1, 
        framesMax = 1,
        offset = {x:0, y:0 },
        framesHold,
        width = 50,
        height = 150,
        imageWidth,
        imageHeight,
        frameCurrent = 0,
        framesElapsed = 0
}) {
        this.position = position;  
        this.image = new Image()
        this.width = width
        this.height = height
        this.image.width = imageWidth;
        this.image.height = imageHeight;
        this.image.src = imageSrc; 
        this.scale = scale;
        this.framesMax = framesMax;
        this.frameCurrent = frameCurrent
        this.framesElapsed = framesElapsed
        this.framesHold = framesHold
        this.offset = offset
        };
    draw() {
        c.drawImage(
                    this.image,
                    this.frameCurrent * (this.image.width / this.framesMax),
                    0,
                    this.image.width / this.framesMax,
                    this.image.height,
                    this.position.x - this.offset.x,
                    this.position.y - this.offset.y, 
                    (this.image.width / this.framesMax) * this.scale, 
                    this.image.height * this.scale)
    };

    animateFrames () {
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.frameCurrent < this.framesMax - 1) {
                this.frameCurrent++
            } else {
                this.frameCurrent = 0
        }
    };
    }

    update() {
        this.draw();
        this.animateFrames();
        }
}

class Fighter extends Sprite {
    constructor({
        position, 
        velocity,  
        imageSrc, 
        scale = 1, 
        framesMax = 1, 
        offset = {x: 0, y: 0},
        framesHold,
        sprites,
        width,
        height,
        imageWidth,
        imageHeight
}) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset,
            framesHold,
            
        })
        this.velocity = velocity;
        this.lastKey;
        this.attackBox = {
            position: {
                x: this.position.x, 
                y: this.position.y
            },
            offset,
            width: 50,
            height: 150
        };
        this.isAttacking;
        this.health = 100; // health
        this.frameCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = framesHold
        this.sprites = sprites
        this.image.width = imageWidth
        this.image.height = imageHeight;

        for(const sprite in sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }

    }
    update() {
        this.draw();
        this.animateFrames();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0;
        } else this.velocity.y += gravity;
    } 

    attack(animation) {
        this.switchSprite(animation)
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }


switchSprite(sprite) {
    if (
        this.image === this.sprites.attack1.image &&
        this.frameCurrent < this.sprites.attack1.framesMax -1) return
    switch (sprite) {
        case 'idle':
            if (this.image !== this.sprites.idle.image) {
            this.framesMax = this.sprites.idle.framesMax
            this.image = this.sprites.idle.image
            this.frameCurrent = 0
            }
        break
        case 'run':
            if (this.image !== this.sprites.run.image) {
            this.framesMax = this.sprites.run.framesMax
            this.image = this.sprites.run.image
            this.frameCurrent = 0
            }
        break
        case 'jump':
            if (this.image !== this.sprites.jump.image) {
            this.framesMax = this.sprites.jump.framesMax
            this.image = this.sprites.jump.image
            this.frameCurrent = 0
            }
        break
        case 'fall':
            if (this.image !== this.sprites.fall.image) {
            this.framesMax = this.sprites.fall.framesMax
            this.image = this.sprites.fall.image
            this.frameCurrent = 0
            }
        break
        case 'attack1':
            if (this.image !== this.sprites.attack1.image) {
            this.framesMax = this.sprites.attack1.framesMax
            this.image = this.sprites.attack1.image
            this.frameCurrent = 0
            }
        break
        case 'attack2':
            if (this.image !== this.sprites.attack2.image) {
            this.framesMax = this.sprites.attack2.framesMax
            this.image = this.sprites.attack2.image
            this.frameCurrent = 0
            }
        break
    }
}
}