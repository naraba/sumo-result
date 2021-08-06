import {
    KACHIKOSHI_MATCHES,
    MATCH_WIDTH,
    MAX_MATCHES,
    SCORE_FONTSTYLE,
    SCORE_HEIGHT,
    WINNER_BG_COLOR,
} from '../consts';
import { SRUtils } from '../utils/srutils';

export class Score extends Phaser.GameObjects.Text {
    private myScore: number;
    private oppScore: number;

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(params) {
        super(params.scene, params.x, params.y, params.text, SCORE_FONTSTYLE);

        this.setFontSize(SCORE_HEIGHT);
        this.makeScore(params.isWinner);
        this.scaleX = MATCH_WIDTH / this.width;
        this.scaleY = SCORE_HEIGHT / this.height;
    }

    public getScore(): number[] {
        return [this.myScore, this.oppScore];
    }

    private makeScore(isWinner): void {
        this.myScore = SRUtils.getRndInt(0, MAX_MATCHES) + (isWinner ? 1 : 0);
        this.oppScore =
            SRUtils.getRndInt(0, MAX_MATCHES - this.myScore) +
            (isWinner ? 0 : 1);
        this.setText(`${this.myScore}-${this.oppScore}`);
        if (this.myScore >= KACHIKOSHI_MATCHES) {
            this.setBackgroundColor(WINNER_BG_COLOR);
        }
    }
}
