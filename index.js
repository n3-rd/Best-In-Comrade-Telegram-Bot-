require("dotenv").config();

const { Telegraf } = require("telegraf");
const express = require('express');
const expressApp = express();
const axios = require("axios");

const API_TOKEN = process.env.API_TOKEN || '';
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'https://best-in-bot.herokuapp.com';


const bot = new Telegraf(API_TOKEN);
bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);
expressApp.use(bot.webhookCallback(`/bot${API_TOKEN}`));


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

  async function getMeme() {
    try {
        const response = await axios.get(
            `https://api.imgflip.com/caption_image?template_id=393371323&username=${process.env.IMGFLIP_USERNAME}&password=${process.env.IMGFLIP_PASS}&text1=${query}`
          );
            // console.log(response.data.data.url);
            var photoUrl = await response.data.data.url;
            ctx.answerInlineQuery([
                {
                  type: "photo",
                  id: "1",
                  photo_url: photoUrl,
                  thumb_url: photoUrl,
                  caption: query,
                  title: "genrated with @bestincomradebot",
                  photo_file_id: photoUrl,
          
                },
              ]);
            return photoUrl;
    } catch (error) {
        console.log(error);
    }
    }

    setTimeout(() => {
    getMeme();
    }, 2000);

    
});
bot.launch();


expressApp.get('/', (req, res) => {
    res.send('Hello World!');
  });
  expressApp.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });