const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 800;
const SPEED = 340;

export default function game() {
  // define gravity
  gravity(2400);

  // add a game object to screen
  const player = add([
    // list of components
    sprite("player"),
    pos(20, 40),
    area(),
    body(),
    scale(4),
    { super: false },
  ]);

  player.play("run");

  player.onGround(() => {
    player.play(player.super ? "run_super" : "run");
  });

  // floor
  add([
    rect(width(), FLOOR_HEIGHT),
    outline(4),
    pos(0, height()),
    origin("botleft"),
    area(),
    solid(),
    color(127, 200, 255),
  ]);

  function jump() {
    if (player.isGrounded()) {
      player.jump(JUMP_FORCE);
      player.play(player.super ? "jump_super" : "jump");
    } else {
      player.doubleJump();
    }
  }

  // jump when user press space
  onKeyPress("space", jump);
  onClick(jump);

  let initialTreeSpawn = true;
  let treeCount = 0;
  function spawnTree() {
    // add tree obj
    if (initialTreeSpawn) {
      wait(2, spawnTree);
      initialTreeSpawn = false;
    } else {
      const demon = add([
        sprite(rand(0, 2) > 1 ? "demon" : 'skeleton', {
          flipX: true,
        }),
        area({ scale: 0.8 }),
        outline(4),
        scale(3),
        pos(width(), height() - FLOOR_HEIGHT),
        origin("botleft"),
        move(LEFT, rand(100, SPEED + treeCount) + treeCount),
        "tree",
        { passed: false },
      ]);
      demon.play("run");
      // wait a random amount of time to spawn next tree
      wait(rand(0.5, 3), spawnTree);
      treeCount += 2;
    }
  }

  let initialPotionSpawn = true;

  function spawnPotion() {
    // add tree obj
    if (initialPotionSpawn) {
      wait(15, spawnPotion);
      initialPotionSpawn = false;
    } else {
      add([
        sprite("potion", { width: 24, height: 24 }),
        area(),
        outline(4),
        scale(2),
        pos(width(), height() - FLOOR_HEIGHT - rand(200)),
        origin("botleft"),
        move(LEFT, SPEED),
        "potion",
      ]);
      // wait a random amount of time to spawn next tree
      wait(rand(10, 15), spawnPotion);
    }
  }

  // start spawning trees
  spawnTree();

  // start spaning potions
  spawnPotion();

  // lose if player collides with any game obj with tag "tree"
  player.onCollide("tree", (tree) => {
    if (player.extraLife >= 1) {
      player.extraLife = 0;
      player.super = false;
      addKaboom(player.pos);
      tree.destroy();
      player.play("run");
      return;
    }
    // go to "lose" scene and pass the score
    go("lose", score);
  });

  player.onCollide("potion", (potion) => {
    potion.destroy();
    if (player.isGrounded()) {
      player.play("run_super");
    } else {
      player.play("jump_super");
    }
    player.extraLife = 1;
    player.super = true;
    burp();
  });

  // keep track of score
  let score = 0;

  const scoreLabel = add([text(score), pos(24, 24)]);

  // increment score if player jumps tree successfully
  onUpdate("tree", (tree) => {
    if (player.pos.x > tree.pos.x && tree.passed === false) {
      score++;
      scoreLabel.text = score;
      tree.passed = true;
    }
  });
}
