import { Obstacle } from "./obstacle.js";

export class ObstacleHandler {
    constructor( stageWidth, stageHeight, obstacle_num ) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.obstacle_num = obstacle_num;
        this.init_obstacles();
    }

    init_obstacles() {
        this.obstacles = {};
        let start_x = this.stageWidth;

        for(let i = 0; i < this.obstacle_num; i++ ) {

            this.obstacles[i] = new Obstacle( this.stageWidth, this.stageHeight, start_x );
            start_x += this.stageWidth / this.obstacle_num;

        }
    }
    draw(ctx ) {
        for(let i = 0; i < this.obstacle_num; i++) {
            this.obstacles[i].draw(
                ctx,
            );
            
        }
    }
    update() {
        for(let i = 0; i < this.obstacle_num; i++ ) {
            this.obstacles[i].update();
        }
    }
    update_score(bird) {
        let bird_x = bird.get_x();
        let is_get_scored;
        for(let i = 0; i < this.obstacle_num; i++) {
            is_get_scored = this.obstacles[i].detect_get_score(bird_x);
            if( is_get_scored == 1) {
                return 1;
            } 
        }
        return 0;
    }

    detect_collision_bird( bird ) {
        let bird_x =        bird.get_x();
        let bird_y =        bird.get_y();
        let bird_radius =   bird.get_radius();

        let is_collided = false;
        for(let i = 0; i < this.obstacle_num; i++ ) {
            is_collided = this.obstacles[i].detect_collision(bird_x, bird_y, bird_radius);
            if( is_collided == true ) {
                return true;
            }
        }
        
        return false;
    }

}