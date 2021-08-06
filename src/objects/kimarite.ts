import {
    KIMARITE_BG_COLOR,
    KIMARITE_FONTSTYLE,
    KIMARITE_HEIGHT,
    KIMARITE_HEIGHT_ADJUST,
    MATCH_WIDTH,
    VERTICAL_LINE_SPACING,
} from '../consts';
import kimarite_data from '../assets/kimarite.json';
import { SRUtils } from '../utils/srutils';

export class Kimarite extends Phaser.GameObjects.Container {
    private yomi: string;

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(params) {
        super(params.scene, params.x, params.y);

        this.makeBase();
        this.makeKimarite();
    }

    public getYomi(): string {
        return this.yomi;
    }

    private makeBase(): void {
        const base = new Phaser.GameObjects.Rectangle(
            this.scene,
            0,
            0,
            MATCH_WIDTH,
            KIMARITE_HEIGHT,
            KIMARITE_BG_COLOR,
        );
        base.setOrigin(0, 0);
        this.add(base);
    }

    private makeKimarite(): void {
        let head = SRUtils.chooseOneFromArray(kimarite_data.head);
        let tail = SRUtils.chooseOneFromArray(kimarite_data.tail);
        if (head == '' && tail == '') {
            head = '秘儀';
        }

        const dr = SRUtils.makeDisplayAndReportString([head, tail]);
        const kimarite = dr[0];
        this.yomi = dr[1];

        if (kimarite.length > 3 && head != '' && tail != '') {
            head = head.split('|')[0];
            if (head.length == 1) {
                head += ' ';
            }
            this.addTextObject(
                head,
                MATCH_WIDTH / 2,
                0,
                KIMARITE_HEIGHT_ADJUST,
            );

            tail = tail.split('|')[0];
            if (tail.length == 1) {
                tail = `　${tail}`;
            }
            this.addTextObject(
                tail,
                0,
                KIMARITE_HEIGHT - KIMARITE_HEIGHT_ADJUST,
                KIMARITE_HEIGHT_ADJUST,
            );
        } else {
            this.addTextObject(kimarite, MATCH_WIDTH / 4, 0, KIMARITE_HEIGHT);
        }
    }

    private addTextObject(
        text: string,
        x: number,
        y: number,
        height: number,
    ): void {
        const textObj = new Phaser.GameObjects.Text(
            this.scene,
            x,
            y,
            text.split('').join('\n'),
            KIMARITE_FONTSTYLE,
        );
        textObj.lineSpacing = VERTICAL_LINE_SPACING;
        textObj.setFontSize(MATCH_WIDTH / 2);
        textObj.scaleX = MATCH_WIDTH / 2 / textObj.width;
        textObj.scaleY = height / textObj.height;
        this.add(textObj);
    }
}
