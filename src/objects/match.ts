import {
    KIMARITE_HEIGHT,
    MATCH_GAP,
    MATCH_TOP,
    POSITION_SIZE,
    SCORE_HEIGHT,
    SCROLL_SPEED,
    SHIKONA_HEIGHT,
    WIDTH,
} from '../consts';
import { Kimarite } from './kimarite';
import { Position } from './position';
import { Score } from './score';
import { Shikona } from './shikona';
import city_data from '../assets/city.json';
import { SRUtils } from '../utils/srutils';

export class Match extends Phaser.GameObjects.Container {
    private arcBody: Phaser.Physics.Arcade.Body;

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(params) {
        super(params.scene, params.x, params.y, params.children);

        this.scene.physics.world.enable(this);
        this.arcBody = this.body as Phaser.Physics.Arcade.Body;
        this.scene.add.existing(this);

        if (params.isPosition) {
            this.makePosition();
        } else {
            this.makeMatch();
        }
    }

    update(): void {
        if (this.arcBody.x > WIDTH) {
            this.destroy();
        }
    }

    public startTime(): void {
        this.arcBody.setVelocityX(SCROLL_SPEED);
    }

    private makePosition(): void {
        const scene = this.scene;
        let y =
            MATCH_TOP +
            MATCH_GAP +
            SCORE_HEIGHT +
            SHIKONA_HEIGHT / 2 -
            POSITION_SIZE / 2;
        const west = new Position({ scene, x: 0, y, text: '西' });
        y +=
            SHIKONA_HEIGHT / 2 +
            POSITION_SIZE +
            KIMARITE_HEIGHT +
            MATCH_GAP * 2;
        const east = new Position({ scene, x: 0, y, text: '東' });
        this.add([west, east]);

        this.report();
    }

    private makeMatch(): void {
        const scene = this.scene;
        const westWon = this.decideWestWins();

        let y = MATCH_TOP;
        const scoreWest = new Score({ scene, x: 0, y, isWinner: westWon });

        y += MATCH_GAP + SCORE_HEIGHT;
        const shikonaWest = new Shikona({ scene, x: 0, y, isWinner: westWon });

        y += MATCH_GAP + SHIKONA_HEIGHT;
        const kimarite = new Kimarite({ scene, x: 0, y });

        y += MATCH_GAP + KIMARITE_HEIGHT;
        const shikonaEast = new Shikona({ scene, x: 0, y, isWinner: !westWon });

        y += MATCH_GAP + SHIKONA_HEIGHT;
        const scoreEast = new Score({ scene, x: 0, y, isWinner: !westWon });

        this.add([scoreWest, shikonaWest, kimarite, shikonaEast, scoreEast]);

        this.report(
            westWon ? shikonaWest : shikonaEast,
            kimarite,
            westWon ? scoreWest.getScore() : scoreEast.getScore(),
        );
    }

    private decideWestWins(): boolean {
        return Math.floor(Math.random() * 2) == 0;
    }

    private report(
        winner?: Shikona,
        kimarite?: Kimarite,
        score?: number[],
    ): void {
        let text;
        if (winner === undefined) {
            const city = SRUtils.chooseOneFromArray(city_data);
            text = `むげんずもう、${
                SRUtils.makeDisplayAndReportString([city])[1]
            }場所。本日の結果です。`;
        } else {
            text = `${winner.getYomi()}が${kimarite.getYomi()}`;
            if (score[1] == 0) {
                if (score[0] == 1) {
                    text += 'でしょせんを勝ちました。';
                } else if (score[0] == 8) {
                    text += `で全勝で勝ち越し。`;
                } else {
                    text += `で全勝。`;
                }
            } else if (score[0] == 8) {
                text += 'で勝ち越し。';
            } else {
                text += '。';
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const resultScene: any = this.scene;
        resultScene.report(text);
    }
}
