import {
    WIDTH,
    HEIGHT,
    MATCH_WIDTH,
    INITIAL_DELAY,
    SCROLL_SPEED,
} from '../consts';
import { Match } from '../objects/match';
import WebFontFile from '../utils/webfontfile';
import { BlockingQueue } from 'promise-blocking-queue';
import bgImage from '../assets/bg.png';

export class ResultScene extends Phaser.Scene {
    private isScrolling: boolean;
    private matches: Phaser.GameObjects.Group;
    private uttr: SpeechSynthesisUtterance;
    private reportQueue: BlockingQueue;

    constructor() {
        super({
            key: 'result-scene',
        });
    }

    preload(): void {
        this.load.image('bg', bgImage);
        this.load.addFile(
            new WebFontFile(this.load, ['Dela Gothic One', 'Noto Sans JP']),
        );

        this.isScrolling = false;
        this.uttr = new SpeechSynthesisUtterance();
        this.uttr.lang = 'ja-JP';
        this.reportQueue = new BlockingQueue({ concurrency: 1 });
    }

    create(): void {
        this.add
            .image(0, 0, 'bg')
            .setAlpha(0.5)
            .setOrigin(0, 0)
            .setDisplaySize(WIDTH, HEIGHT);

        this.matches = this.add.group({});

        let x = WIDTH - MATCH_WIDTH * 2;
        const pos: Match = new Match({
            scene: this,
            x,
            y: 0,
            isPosition: true,
        });
        this.matches.add(pos);
        while (x > 0) {
            x -= MATCH_WIDTH + SCROLL_SPEED / 2;
            const match: Match = new Match({
                scene: this,
                x,
                y: 0,
                isPosition: false,
            });
            this.matches.add(match);
        }

        this.time.delayedCall(INITIAL_DELAY, this.startTime, null, this);
    }

    update(): void {
        this.matches.children.each((m: Match) => {
            m.update();
        });
        this.makeNewMatch();
    }

    public report(manuscript: string): void {
        this.reportQueue.enqueue(async (manuscript: string) => {
            const pending = this.reportQueue.pendingCount;
            if (!this.isScrolling) {
                this.uttr.rate = 1;
            } else {
                this.uttr.rate *= (1 + (pending - 4) / 200.0) ** 2.0;
                this.uttr.rate = Math.max(0.9, Math.min(1.6, this.uttr.rate));
            }

            this.uttr.text = manuscript;
            speechSynthesis.speak(this.uttr);

            return new Promise((resolve) => {
                this.uttr.onend = resolve;
            });
        }, manuscript);
    }

    private startTime(): void {
        this.isScrolling = true;
        this.matches.children.each((m: Match) => {
            m.startTime();
        });
    }

    private makeNewMatch(): void {
        const last = this.matches.getLast(true);
        if (last.x > 0) {
            const match: Match = new Match({
                scene: this,
                x: -(MATCH_WIDTH + SCROLL_SPEED / 2),
                y: 0,
                isPosition: false,
            });
            match.startTime();
            this.matches.add(match);
        }
    }
}
