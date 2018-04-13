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

	bot.sendMessage(chatId, msg.text = `Здравстуйте ${msg.chat.first_name}. Бот в стадии тестирования. Основная функция бота - отправка некоторых курсов валют по Центральному Банку РФ при отправке любого сообщения или при старте бота. С наилучшеми пожеланиями! Твой бот :)`);

	request(url, (error, response, body) => {
		const data = JSON.parse(body);
		bot.sendMessage(chatId, `${data.Valute.USD.Name} \n ${data.Valute.USD.Previous} => ${data.Valute.USD.Value} `);
		bot.sendMessage(chatId, `${data.Valute.CNY.Name} \n ${data.Valute.CNY.Previous} => ${data.Valute.CNY.Value}`);
		bot.sendMessage(chatId, `${data.Valute.EUR.Name} \n ${data.Valute.EUR.Previous} => ${data.Valute.EUR.Value}`);
		bot.sendMessage(chatId, `${data.Valute.JPY.Name} \n ${data.Valute.JPY.Previous} => ${data.Valute.JPY.Value}`);
		bot.sendMessage(chatId, 'https://www.cbr-xml-daily.ru/');
	});
});
