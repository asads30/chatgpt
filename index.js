const { Telegraf } = require('telegraf');
const { Configuration, OpenAIApi } = require("openai");
const bot = new Telegraf('5997958767:AAFUB9EXuZEF8aO1atsj16dUX0AGTUd5fMc');
const configuration = new Configuration({
    organization: "org-4FqaxobAlqiNYEgszDb3756K",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

bot.start(async (ctx) => {
    ctx.reply(`Добро пожаловать в чат-бот ChatGPT в Telegram

Доступные команды для Вас:
/start - вывести это сообщение
/profile - посмотреть профиль
/premium - оплатить премиум-подписку
    
Чтобы начать разговор просто напишите что-нибудь :)`);
});

bot.command('profile', (ctx) => {
    ctx.reply(`👨‍💻 Профиль / Запросы:

Чтобы обеспечить бесплатный доступ к передовому боту, мы ввели систему рефералов – приглашайте друзей по ссылке и получайте дополнительные 5 запросов в бота либо купите премиуим-подписку!

⌛️ Остаток: 10 запросов
🔗 Ваша ссылка: https://t.me/gptuzbot?start=${ctx.from.id}`);
});


bot.command('premium', (ctx) => {
    ctx.reply(`Для оплаты премиум-подписки свяжитесь с @wpbrouz`, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Оплатить', url: 'tg://user?id=386567097'}
                ]
            ]
        }
    });
});

bot.on('text', async (ctx) => {
    try {
        ctx.sendChatAction('typing');
        ctx.reply('Нейросеть думает')
    } catch (error) {
        console.log(error)
    }
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: ctx.message.text, name: ctx.from.first_name}],
            temperature: 0.1
        });
        ctx.reply(completion.data.choices[0].message.content)
    } catch (error) {
        console.log(error)
    }
})

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));