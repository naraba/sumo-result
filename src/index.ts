import 'phaser';
import { HEIGHT, WIDTH } from './consts';
import { ResultScene } from './scenes/result-scene';

const config: Phaser.Types.Core.GameConfig = {
    title: 'sumo result',
    version: '1.0.0',
    width: WIDTH,
    height: HEIGHT,
    type: Phaser.AUTO,
    parent: 'result',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'result',
    },
    scene: [ResultScene],
    input: {
        keyboard: false,
        mouse: false,
        touch: false,
    },
    physics: {
        default: 'arcade',
    },
    backgroundColor: '#000',
    render: { pixelArt: false, antialias: true },
};

export class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

window.addEventListener('load', () => {
    console.log("game initiated")
    new Game(config);
});