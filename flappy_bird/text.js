export class Text {
    constructor( x, y ) {

        this.x = x;
        this.y = y;
    }

    set_font( font, size, color, text_align, text_baseline ) {
        this.font = font;
        this.size = size;
        this.color = color;

        this.align = text_align;
        this.baseline = text_baseline;
    }
    set_stroke( color ) {
        this.color_stroke = color;
    }
    set_word(word) {
        this.word = word;
    }
    draw(ctx) {
        ctx.font = this.size + "px " + this.font;
        ctx.textAlign = this.align;
        ctx.textBaseline = this.baseline;

        ctx.fillStyle = this.color;
        ctx.fillText(this.word, this.x, this.y);

        ctx.strokeStyle = this.color_stroke;
        ctx.strokeText(this.word, this.x, this.y);
    }

}