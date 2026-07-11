// Import and initialize the module
const prompt = require("prompt-sync")({ sigint: true }); // 'sigint: true' allows Ctrl+C to exit
function retry() {
  const decision = prompt("Try again? (y/n): ");

  if (decision === "y") {
    gamecheck = true;
  } else {
    gamecheck = false;
  }
}

//on top of tis code is the extanded version
class monster {
  constructor(name, base_attack, health, exp, gold) {
    this.name = name;
    this.health = health;
    this.base_attack = base_attack;
    this.exp = exp;
    this.gold = gold;
  }
  monsterAttack(monsters) {
    let monstersDamage =
      Math.floor(Math.random() * (monsters.base_attack - 10 + 1)) + 10;
    player.health -= monstersDamage;
    console.log("monsters deal", monstersDamage, "to you");
    if (player.health <= 0) {
      console.log("you died");
      retry();
    }
  }

  monstersKilled(monsters) {
    const exp = monsters.exp + Math.floor(Math.random() * 11) - 5;
    const gold = monsters.gold + Math.floor(Math.random() * 11) - 5;
    player.exp += exp;
    player.gold += gold;
    console.log(`You gained ${exp} EXP and ${gold} Gold!`);
  }
}
const zombie = new monster("zombie", 15, 150, 30, 20);
const giantSpider = new monster("giant spider", 30, 200, 50, 40);
const skeleton = new monster("skeleton", 25, 100, 25, 25);
const slime = new monster("slime", 15, 100, 15, 10);
const blinder = new monster("blinder", 15, 200, 40, 30);

let monsterList = [zombie, giantSpider, skeleton, slime, blinder];
const monsters = monsterList[Math.floor(Math.random() * monsterList.length)];
class player {
  constructor(name, base_attack, health, exp, gold) {
    this.name = name;
    this.inventory = [];
    this.base_attack = 10;
    this.health = 100;
    this.exp = 0;
    this.level = 1;
    this.gold = 0;
  }
  attack(monsters) {
    monsters.health -= player.base_attack;
    console.log("monsters health :", monsters.health);
  }
  heal() {
    if (player.inventory.includes("potion")) {
      player.health += 20;
      console.log("You used a potion!");
      console.log("Health:", player.health);
      for (let i = 0; i < player.inventory.length; i++) {
        if (player.inventory[i].includes("potion")) {
          player.inventory.splice(i, 1);
        }
      }
    } else if (player.inventory.includes("big potion")) {
      player.health += 50;
      console.log("you used a big potion");
      console.log("Healt", player.health);
      for (let i = 0; i < player.inventory.length; i++) {
        if (player.inventory[i].includes("big potion")) {
          player.inventory.splice(i, 1);
        }
      }
    } else {
      console.log("You don't have a potion.");
    }
  }
  run() {
    const escapeChance = Math.random();

    if (escapeChance < 0.7) {
      console.log("You successfully escaped!");
      return true;
    } else {
      console.log("You couldn't escape!");
      return false;
    }
  }

  levelUp(player) {
    if (player.exp >= 100) {
      player.health += 25;
      player.base_attack += 25;
      player.level += 1;
      player.exp = 0;
    }
  }
  battleMonsters(monsters) {
    while (monsters.health > 0) {
      console.log("a monster has attacked you");
      console.log("what would you do");
      let playerAttackInput = parseInt(
        prompt(`1.attack 2.heal 3.run choose by number : `),
      );
      if (playerAttackInput === 1) {
        this.attack(monsters);
      } else if (playerAttackInput === 2) {
        this.heal();
      } else if (playerAttackInput === 3) {
        if (this.run()) {
          break;
        }
      } else {
        console.log("put an acceptable input");
      }
      if (monsters.health > 0) {
        monsters.monsterAttack(monsters);
      } else if (monsters.health <= 0) {
        monsters.monstersKilled(monsters);
        this.levelUp(player);
      }
    }
  }
}
