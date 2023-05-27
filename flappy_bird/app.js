import { ObstacleHandler } from "./obstacle_handler.js";
import { Background } from "./background.js";
import { Bird } from "./bird.js";
import { Text } from "./text.js";
class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = (window.pixelRatio > 1) ? 2 : 1;


        window.addEventListener('resize', this.resize.bind(this), false );
        document.addEventListener( 'touchstart', this.detect_touch.bind(this), false );
        document.addEventListener( 'touchend',   this.detect_touch_off.bind(this), false );
        document.addEventListener( 'keydown', this.detect_key_down.bind(this), false );

        this.best_score = 0;
        this.resize();

        
        window.requestAnimationFrame( this.animate.bind(this), false );
    
    }
    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;

        this.canvas.style.width = this.stageWidth + "px";
        this.canvas.style.height = this.stageHeight + "px";

        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.create_element();
        this.set_flag();
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.background.draw( this.ctx );
        if( this.is_playing == false && this.is_gameover == false ) {
            this.start_text.draw( this.ctx );
        }
        if( this.is_playing == false && this.is_gameover == true ) {
            this.on_gameover();
            this.start_text.set_word("Press S to Re:Start");
            this.start_text.draw( this.ctx );
            this.best_score_text.draw( this.ctx );
            this.score_text.draw( this.ctx );
        }
        if( this.is_playing == true ) {
            this.on_play();

            this.best_score_text.set_word("Best Score : " + this.best_score );
            this.best_score_text.draw( this.ctx );

            this.score_text.set_word("Score : " + this.score );
            this.score_text.draw( this.ctx );
        }
        
    }
    
    on_play() {
        this.bird.draw( this.ctx );
        this.obstacle_handler.draw( this.ctx );
        
        this.score += this.obstacle_handler.update_score(this.bird);
        if( this.score > this.best_score ) {
            this.best_score = this.score;
        }

        if( this.obstacle_handler.detect_collision_bird( this.bird ) == true ) {
            // collision is true
            this.is_playing = false;
            this.is_gameover = true;

            return;
        }
        this.bird.update();
        this.obstacle_handler.update();
    }
    on_gameover() {
        this.bird.draw( this.ctx );
        this.obstacle_handler.draw( this.ctx );
    }
    create_element() {
        this.background = new Background( this.stageWidth, this.stageHeight );
        this.bird       = new Bird( this.stageWidth, this.stageHeight );

        this.obstacle_handler = new ObstacleHandler( this.stageWidth, this.stageHeight, 3);
    
        this.start_text = new Text( this.stageWidth/2, this.stageHeight/2);
        this.start_text.set_font("Pixelated",this.stageWidth / 10, "white", "center", "middle" );
        this.start_text.set_stroke("black");
        this.start_text.set_word("Press S to Start");
    
        this.best_score_text = new Text( this.stageWidth, 0 );
        this.best_score_text.set_font("Pixelated",this.stageWidth / 20, "white", "right", "top" );
        this.best_score_text.set_stroke("black");

        this.score_text = new Text( this.stageWidth, this.best_score_text.size );
        this.score_text.set_font("Pixelated",this.stageWidth / 20, "white", "right", "top" );
        this.score_text.set_stroke("black");


        
    }  
    set_flag() {
        this.is_touched = false;
        this.is_playing  = false;
        this.is_gameover = false;

        this.score = 0;
    }
    
    detect_touch(e) {
        this.is_touched = true;
        this.is_playing = true;

    }
    detect_touch_off(e) {
        this.is_touched = false;
    }
    detect_key_down(e) {
        this.is_touched = true;
        if( e.key == 's') {
            this.is_playing = true;
            if( this.is_gameover == true ) {
                this.resize();
            }
        }
        
        this.bird.jump();

    }
}


window.onload = () => {
    new App();
}