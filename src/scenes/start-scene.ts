import { WIDTH, HEIGHT, START_FONTSTYLE, START_SIZE } from '../consts';
import WebFontFile from '../utils/webfontfile';
import bgImage from '../assets/bg.png';

export class StartScene extends Phaser.Scene {
    private uttr: SpeechSynthesisUtterance;

    constructor() {
        super({
            key: 'start-scene',
        });
    }

    preload(): void {
        this.load.image('bg', bgImage);
        this.load.addFile(
            new WebFontFile(this.load, ['Dela Gothic One', 'Noto Sans JP']),
        );

        this.uttr = new SpeechSynthesisUtterance();
        this.uttr.lang = 'ja-JP';
    }

    create(): void {
        this.add.text(0, 0, '東西', START_FONTSTYLE).setVisible(false);

        const img = this.add
            .image(0, 0, 'bg')
            .setAlpha(0.5)
            .setOrigin(0, 0)
            .setDisplaySize(WIDTH, HEIGHT);
        const btn = this.add
            .text(
                (WIDTH - START_SIZE) / 2,
                (HEIGHT - START_SIZE) / 2,
                '▶️',
                START_FONTSTYLE,
            )
            .setFontSize(START_SIZE);
        btn.scaleX = START_SIZE / btn.width;
        btn.scaleY = START_SIZE / btn.height;

        img.setInteractive().on('pointerdown', this.sayDummyToneAndStart, this);
        btn.setInteractive().on('pointerdown', this.sayDummyToneAndStart, this);
    }

    private sayDummyToneAndStart(): void {
        this.uttr.text = '';
        speechSynthesis.speak(this.uttr);
        this.scene.switch('result-scene');
    }
}
