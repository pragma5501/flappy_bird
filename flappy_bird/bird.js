export class Bird {
    constructor( stageWidth, stageHeight ) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.x = stageWidth/2;
        this.y = stageHeight / 2;

        this.g = this.stageHeight / 3000;
        this.v = 0;
        this.radius = this.stageHeight / 55;

        this.angle = 0;

        this.is_collided = false;   
        this.load_bird();
    }
    load_bird() {
        this.image = new Image( );
        this.image.onload = () => {
            this.isLoaded = true;
        }

        this.image.src = "./src/bird.png";
        this.isLoaded = false;
    }
    draw( ctx ) {

        if( !this.isLoaded ) return;
        ctx.beginPath();
        ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2 );
        ctx.closePath();
    }
    update() {
        this.y += this.v;
        this.v += this.g;
        this.detect_collision_screen();
    }
    jump() {
        this.v = - this.stageHeight / 100;
    }

    detect_collision_screen() {
        if( this.y + this.radius > this.stageHeight ) {
            this.y = this.stageHeight - this.radius;
            this.is_collided = true;
        }
        if( this.y - this.radius < 0 ) {
            this.y = this.radius;
            this.is_collided = true;
        }
    }
    get_x() {
        return this.x;
    }
    get_y() {
        return this.y;
    }
    get_radius() {
        return this.radius;
    }
}
