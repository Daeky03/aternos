const mineflayer = require('mineflayer');
const { pathfinder, Movements } = require('mineflayer-pathfinder');
const { loader: autoEat } = require('mineflayer-auto-eat');
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  res.send("ATERNOS AKTİF KARDESİM");
})

app.listen(3000, () => {
  console.log("3000 Portu ile aktif");
})

function createBot() {
  const bot = mineflayer.createBot({
    host: "shirairyu.aternos.me",
    port: 26141,
    username: "InsaneHuman4456",
    version: "1.21.72.02"
  });

  bot.loadPlugin(pathfinder);
  bot.loadPlugin(autoEat);
  
  
  bot.on('death', () => {

    console.log('> Bot öldü, yeniden doğuyor...');

    // Otomatik respawn. Eğer otomatik respawn kapalıysa bu metodu çağırın.

    bot.respawn();

  });

  // Hata veya kopma durumunda yeniden bağlanmayı da ekleyebilirsiniz

  bot.on('end', () => {

    console.log('> Bağlantı koptu, yeniden bağlanılıyor...');

    setTimeout(createBot, 5000);

  });

  bot.on('spawn', () => {
    const moves = new Movements(bot);
    bot.pathfinder.setMovements(moves);

    bot.autoEat.options.startAt = 14;
    bot.autoEat.enable();

    // Rastgele dolaşma ve madencilik
    setInterval(() => {
      const goal = bot.entity.position.offset(
        (Math.random() - 0.5) * 50,
        0,
        (Math.random() - 0.5) * 50
      );
      bot.pathfinder.setGoal({ x: goal.x, y: goal.y, z: goal.z });
    }, 60000); // Her dakika yeni hedef
  });
}

createBot();



