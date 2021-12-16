import kaboom from "kaboom";
import game from "./scenes/game.js";
import gameover from "./scenes/gameover.js";

import player from "./assets/player.png";
import demon from "./assets/demon.png";
import skeleton from "./assets/skeleton.png";
import wall from "./assets/wall.png";
import potion from "./assets/potion.png";

// initialize context
kaboom({
  height: window.innerHeight,
  width: window.innerWidth,
});

// load assets
loadSprite("player", player, {
  // The image contains 9 frames layed out horizontally, slice it into individual frames
  sliceX: 9,
  sliceY: 2,
  // Define animations
  anims: {
    run: {
      from: 4,
      to: 7,
      speed: 10,
      loop: true,
    },
    // This animation only has 1 frame
    jump: 8,
    run_super: {
      from: 13,
      to: 16,
      speed: 10,
      loop: true,
    },
    // This animation only has 1 frame
    jump_super: 17,
  },
});

loadSprite("demon", demon, {
  sliceX: 3,
  anims: {
    run: {
      from: 0,
      to: 2,
      speed: 5,
      loop: true,
    },
  },
});

loadSprite("skeleton", skeleton, {
  sliceX: 4,
  anims: {
    run: {
      from: 0,
      to: 3,
      speed: 5,
      loop: true,
    },
  },
});

loadSprite("wall", wall);
loadSprite("potion", potion);

scene("game", game);

scene("lose", gameover);

go("game");
