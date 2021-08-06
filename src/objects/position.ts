import { POSITION_SIZE, POSITION_FONTSTYLE } from '../consts';

export class Position extends Phaser.GameObjects.Text {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(params) {
        super(
            params.scene,
            params.x,
            params.y,
            params.text,
            POSITION_FONTSTYLE,
        );
        this.setFontSize(POSITION_SIZE);
        this.scaleX = POSITION_SIZE / this.width;
        this.scaleY = POSITION_SIZE / this.height;
    }
}
