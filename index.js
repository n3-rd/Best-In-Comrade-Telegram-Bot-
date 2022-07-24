require("dotenv").config();

const { Telegraf } = require("telegraf");
const axios = require("axios");

const bot = new Telegraf(process.env.BOT_TOKEN);
// const Scene = require('telegraf/l')
// const { enter, leave } = Stage

bot.start((ctx) =>
  ctx.reply(
    "Welcome To Best In Comrade \n Mention me @bestincomradebot alongside your caption in your chats to generate a meme"
  )
);

bot.command("help", (ctx) =>
  ctx.reply(
    'Mention me @best_in_comrade_bot alongside your caption in your chats to generate a  \n Example: @best_in_comrade_bot "Baddest Comrade"'
  )
);

bot.on("chat_join_requested", (ctx) => {
  ctx.reply("Sorry, I can't do that.");
});

bot.on("contact", (ctx) => {
  ctx.reply("Sorry, I can't do that.");
});

bot.on("inline_query", async (ctx) => {
  const query = ctx.inlineQuery.query;
  console.log(query);
  var url;

  try {
    await axios
      .get(
        `https://api.imgflip.com/caption_image?template_id=393371323&username=${process.env.IMGFLIP_USERNAME}&password=${process.env.IMGFLIP_PASS}&text1=${query}`
      )
      .then((res) => {
        url = res.data.data.url;
      });
    ctx.answerInlineQuery([
      {
        type: "photo",
        id: "1",
        photo_url: url,
        thumb_url: url,
        caption: query,
        title: "genrated with @bestincomradebot",
      },
    ]);
  } catch (error) {
    console.log(error);
  }
});
bot.launch();
