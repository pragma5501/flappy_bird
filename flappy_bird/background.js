export class Background {
    constructor( stageWidth, stageHeight ) {
        this.stageWidth  = stageWidth;
        this.stageHeight = stageHeight;
        
        this.load_background();
    }
    load_background() {
        this.image = new Image( );
        this.image.onload = () => {
            this.isLoaded = true;
        }

        this.image.src = "./src/pasttle_background.jpg";
        this.isLoaded = false;
    }


    draw( ctx ) {
        if( !this.isLoaded ) return;
        ctx.beginPath();
        ctx.drawImage(this.image, 0, 0, this.stageWidth, this.stageHeight );
        ctx.closePath();
    }
}