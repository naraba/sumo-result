const FACTOR = 1.6;

const WIDTH: number = 640 * FACTOR;
const HEIGHT: number = 360 * FACTOR;
const INITIAL_DELAY = 15000;
const SCROLL_SPEED = 40;

const START_SIZE: number = 200 * FACTOR;
const POSITION_SIZE: number = 50 * FACTOR;
const MATCH_TOP: number = 10 * FACTOR;
const MATCH_GAP: number = 5 * FACTOR;
const MATCH_WIDTH: number = 50 * FACTOR;
const SCORE_HEIGHT: number = 25 * FACTOR;
const SHIKONA_HEIGHT: number = 110 * FACTOR;
const KIMARITE_HEIGHT: number = 50 * FACTOR;
const KIMARITE_HEIGHT_ADJUST: number = KIMARITE_HEIGHT - 10 * FACTOR;
const VERTICAL_LINE_SPACING = -5;

const START_FONTSTYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    align: 'center',
    color: '#FEEEED',
    fontFamily: 'Dela Gothic One',
};
const POSITION_FONTSTYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    align: 'center',
    backgroundColor: '#FEEEED',
    color: '#F00',
    fontFamily: 'Dela Gothic One',
};
const SCORE_FONTSTYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    align: 'center',
    backgroundColor: '#AAAAAA',
    color: '#111111',
    fontFamily: 'Noto Sans JP',
};
const SHIKONA_FONTSTYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    align: 'center',
    backgroundColor: '#AAAAAA',
    color: '#111111',
    fontFamily: "'HG行書体', 'Noto Sans JP'",
    fontStyle: 'bold',
};
const KIMARITE_BG_COLOR = 0xfeeeed;
const KIMARITE_FONTSTYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    align: 'center',
    backgroundColor: '#FEEEED',
    color: '#111111',
    fontFamily: 'Noto Sans JP',
    fontStyle: 'bold',
};
const WINNER_BG_COLOR = '#FF0000';

const MAX_MATCHES = 15;
const KACHIKOSHI_MATCHES = 8;
const SHIKONA_MIDDLE_PROB = 0.1;

export {
    WIDTH,
    HEIGHT,
    INITIAL_DELAY,
    SCROLL_SPEED,
    START_SIZE,
    POSITION_SIZE,
    MATCH_TOP,
    MATCH_WIDTH,
    MATCH_GAP as MATCH_GAP,
    SCORE_HEIGHT,
    SHIKONA_HEIGHT,
    KIMARITE_HEIGHT,
    KIMARITE_HEIGHT_ADJUST,
    VERTICAL_LINE_SPACING,
    START_FONTSTYLE,
    POSITION_FONTSTYLE,
    SCORE_FONTSTYLE,
    SHIKONA_FONTSTYLE,
    KIMARITE_BG_COLOR,
    KIMARITE_FONTSTYLE,
    WINNER_BG_COLOR,
    MAX_MATCHES,
    KACHIKOSHI_MATCHES,
    SHIKONA_MIDDLE_PROB,
};
