require("dotenv").config();

const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) =>
  ctx.reply(
    "Welcome To Best In Comrade \n Send me a caption like and I'll generate a meme for you"
  )
);

bot.launch();