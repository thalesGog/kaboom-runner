export default function (score) {
  add([
    sprite("player"),
    pos(width() / 2, height() / 2 - 80),
    scale(6),
    origin("center"),
  ]);

  // display score
  add([
    text(score),
    pos(width() / 2, height() / 2 + 80),
    scale(2),
    origin("center"),
  ]);

  // go back to game with space is pressed
  onKeyPress("space", () => go("game"));
  onClick(() => go("game"));
}
