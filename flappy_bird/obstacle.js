export class Obstacle {
    constructor( stageWidth, stageHeight, x ) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.start_x = x;
        this.v = -this.stageWidth / 300;
        
        this.init_obstacle(x);
    }

    init_obstacle(x) {
        this.has_score = false;

        let blank_height = Math.random() * this.stageHeight / 10 + this.stageHeight/ 8;
        let start_y = Math.random() * (this.stageHeight/2 - blank_height * 2) + this.stageHeight/4;
        
        this.width = this.stageHeight /30;

        let x1 = x;
        let x2 = x1 + this.width;
        let y1 = start_y;
        let y2 = start_y + blank_height;

        this._y1 = y1;
        this._y2 = y2;

        this.obstacle = {};
        this.obstacle['top'] = {
            x1: x1,
            x2: x2,
            y1: 0,
            y2: start_y,
            v : -this.stageWidth / 300,
        }
        this.obstacle['bottom'] = {
            x1: x1,
            x2: x2,
            y1: start_y + blank_height,
            y2: this.stageHeight,
            v : -this.stageWidth / 300,
        }
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(   
            this.obstacle['top'].x1,
            this.obstacle['top'].y1,
            this.obstacle['top'].x2 - this.obstacle['top'].x1,
            this.obstacle['top'].y2 - this.obstacle['top'].y1
        ); 

        ctx.rect(   
            this.obstacle['bottom'].x1,
            this.obstacle['bottom'].y1,
            this.obstacle['bottom'].x2 - this.obstacle['bottom'].x1,
            this.obstacle['bottom'].y2 - this.obstacle['bottom'].y1
        ); 
        //ctx.fill();
        ctx.stroke();
        ctx.closePath();
        
    }
    update() {
        this.obstacle['top'].x1 += this.obstacle['top'].v;
        this.obstacle['top'].x2 += this.obstacle['top'].v;
        
        this.obstacle['bottom'].x1 += this.obstacle['bottom'].v;
        this.obstacle['bottom'].x2 += this.obstacle['bottom'].v;

        if( this.obstacle['top'].x2 < 0 ) {
            this.init_obstacle( this.stageWidth );
            
        }
    }
    detect_collision(bird_x, bird_y, radius) {
        let is_in_width = false;
        let is_in_height = false;

        if( this.obstacle['top'].x1 < bird_x + radius && bird_x - radius < this.obstacle['top'].x2 ) {

            is_in_width = true;
        }

        if(( this._y1 > bird_y - radius/1.2 || this._y2 < bird_y + radius/1.2) && is_in_width == true  ) {
            is_in_height = true;
        }
        if( is_in_height == true && is_in_width == true ) {

            return true;
        }
        return false;

    }
    detect_get_score(bird_x) {
        let is_passed = false;
        if( bird_x > this.obstacle['top'].x2 ) {
            is_passed = true;
        }
        if( is_passed == true && this.has_score == false ) {
            this.has_score = true;

            return 1;
        }
        return 0
    }
    get_v() {
        return this.v;
    }

}

