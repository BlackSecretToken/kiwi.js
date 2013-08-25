/// <reference path="../../src/Kiwi.ts" />

class MultiTouch extends Kiwi.State {

    constructor() {
        super('MultiTouch');
    }

    preload() {
        this.addSpriteSheet('explosion', 'assets/explosion.png', 64, 64, false);
    }

    fingers: Kiwi.Input.Finger[];
    explosions: Kiwi.GameObjects.Sprite[];

    create() {
         
            this.fingers = [];
            this.explosions = [];

            this.game.input.onUp.add(this.up, this);
            this.game.input.onDown.add(this.down, this);
        
        if (Kiwi.DEVICE.touch) {
            this.game.input.touch.touchCancel.add(this.up);
        }
            
    }

    up(x, y, timeDown, timeUp, duration, finger) {
        for (var i = 0; i < this.fingers.length; i++) {
            if (this.fingers[i].id  == finger.id ) {
                this.removeChild(this.explosions[i]);
                this.explosions.splice(i, 1);
                this.fingers.splice(i, 1);
                i--;
            }
        }
    }

    down(x, y, timeDown, timeUp, duration, finger) {
        
        this.fingers.push(finger);
        var explosion = new Kiwi.GameObjects.Sprite(this.textures.explosion, finger.x, finger.y);
        this.addChild(explosion);
        this.explosions.push(explosion);
        explosion.animation.play('default');

    }

    update() {
        super.update();

        for (var i = 0; i < this.fingers.length; i++) {

            if (this.fingers[i].active) {
                this.explosions[i].x = this.fingers[i].x;
                this.explosions[i].y = this.fingers[i].y;
            }
        }

    }

}