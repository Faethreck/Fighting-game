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
        imageHeight,
        attackBox = { offset: {}, width: undefined, height: undefined}
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
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        };
        this.isAttacking;
        this.health = 100; // health
        this.frameCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = framesHold;
        this.sprites = sprites;
        this.image.width = imageWidth;
        this.image.height = imageHeight;
        this.dead = false;

        for(const sprite in sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }

    }
    update() {
        this.draw();
        if (!this.dead) 
        this.animateFrames();

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y
    
        // draw the attack box
        // c.fillRect(
        //     this.attackBox.position.x,
        //     this.attackBox.position.y, 
        //     this.attackBox.width, 
        //     this.attackBox.height
        // )

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0;
        } else this.velocity.y += gravity;
    } 

    attack(animation) {
        this.switchSprite(animation)
        this.isAttacking = true
    }

    takeHit(){
        this.health -= 20

        if (this.health <= 0) {
            this.switchSprite('death')
        } else this.switchSprite('takeHit')
    }


switchSprite(sprite) {
    if (
        this.image === this.sprites.death.image) {
            if (this.frameCurrent === this.sprites.death.framesMax -1) this.dead = true
            return}

    // overriding all other animations with the attack animation
    if (
        this.image === this.sprites.attack1.image &&
        this.frameCurrent < this.sprites.attack1.framesMax -1 ||
        this.image === this.sprites.attack2.image &&
        this.frameCurrent < this.sprites.attack2.framesMax -1
    ) 
        return

    // override when fighter gets hit
    if (
        this.image === this.sprites.takeHit.image && 
        this.frameCurrent < this.sprites.takeHit.framesMax -1
    )
        return

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
        case 'takeHit':
            if (this.image !== this.sprites.takeHit.image) {
            this.framesMax = this.sprites.takeHit.framesMax
            this.image = this.sprites.takeHit.image
            this.frameCurrent = 0
            }
        break
        case 'death':
            if (this.image !== this.sprites.death.image) {
            this.framesMax = this.sprites.death.framesMax
            this.image = this.sprites.death.image
            this.frameCurrent = 0
            }
        break
    }
}
}