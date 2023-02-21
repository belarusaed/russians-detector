import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { francAll } from 'franc-min';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on(message('text'), async ctx => {
  const langs = francAll(ctx.message.text, {ignore: ['bul']});
  if (langs.filter(v => v[1] === 1).length > 1) return; // Ignore if detected 100% more than 1 language.
  if (langs[0][0] === 'rus') return await ctx.deleteMessage();
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
