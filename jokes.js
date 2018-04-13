'use strict'

const TelegramBot = require('node-telegram-bot-api'), // подключаем телеграм бота
		request = require('request'), // работаем с "эхо"
		token = ''; // токен при создании бота

const bot = new TelegramBot(token, {
	polling: true
});

bot.on('message', (msg) => {
	const chatId = msg.from.id,
	url = 'https://www.cbr-xml-daily.ru/daily_json.js';

	request(url, (error, response, body) => {
		const data = JSON.parse(body);
		console.log(data);

	bot.sendMessage(chatId, `${data.Valute.USD.Name} \nПокупаем за ${data.Valute.USD.Value} \nПродаем по ${data.Valute.USD.Previous} `);
	bot.sendMessage(chatId, `${data.Valute.EUR.Name} \nПокупаем за ${data.Valute.EUR.Value} \nПродаем по ${data.Valute.EUR.Previous}`);
	bot.sendMessage(chatId, `${data.Valute.CNY.Name} \nПокупаем за ${data.Valute.CNY.Value} \nПродаем по ${data.Valute.CNY.Previous}`);
	bot.sendMessage(chatId, `${data.Valute.JPY.Name} \nПокупаем за ${data.Valute.JPY.Value} \nПродаем по ${data.Valute.JPY.Previous}`);
	console.log();
	bot.sendMessage(chatId, 'https://www.cbr-xml-daily.ru/');
	});
});
