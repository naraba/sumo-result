import {
    MATCH_WIDTH,
    SHIKONA_FONTSTYLE,
    SHIKONA_HEIGHT,
    SHIKONA_MIDDLE_PROB,
    VERTICAL_LINE_SPACING,
    WINNER_BG_COLOR,
} from '../consts';
import shikona_data from '../assets/shikona.json';
import { SRUtils } from '../utils/srutils';

export class Shikona extends Phaser.GameObjects.Text {
    private yomi: string;

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(params) {
        super(params.scene, params.x, params.y, '', SHIKONA_FONTSTYLE);

        if (params.isWinner) {
            this.setBackgroundColor(WINNER_BG_COLOR);
        }
        this.lineSpacing = VERTICAL_LINE_SPACING;
        this.makeShikona();
        this.scaleX = MATCH_WIDTH / this.width;
        this.scaleY = SHIKONA_HEIGHT / this.height;
    }

    public getYomi(): string {
        return this.yomi;
    }

    private makeShikona(): void {
        const head = SRUtils.chooseOneFromArray(shikona_data.head);
        const tail = SRUtils.chooseOneFromArray(shikona_data.tail);
        let middle = '';
        if (head != '' && tail != '' && Math.random() < SHIKONA_MIDDLE_PROB) {
            middle = SRUtils.chooseOneFromArray(shikona_data.middle);
        }
        const dr = SRUtils.makeDisplayAndReportString([head, middle, tail]);
        const shikona = dr[0];
        this.yomi = dr[1];

        this.setFontSize(MATCH_WIDTH);
        this.setText(shikona.split('').join('\n'));
    }
}
