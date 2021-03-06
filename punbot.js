require('dotenv').config();

var Botkit = require('botkit');

var controller = Botkit.slackbot({
    debug: false
    //include "log: false" to disable logging
    //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
    token: process.env.token
}).startRTM()


var punDict = {
    "all":"owl",
    "nice":"rice",
    "rice":"nice",
    "three":"free",
    "free":"three"
};


controller.hears('(.*)', ['ambient', 'message_received', 'direct_message'],  function(bot, message) {
    console.log(message)
    var msg = message.match[0];
    var msg_list = msg.split(" ");
    var resp = "";
    var pun = false;
    for (var i=0; i<msg_list.length; i++){
	if (punDict[msg_list[i]] != undefined) {
	    resp = resp.concat(punDict[msg_list[i]]).concat(" ");
	    pun = true;
	}
	else{
	    resp = resp.concat(msg_list[i]).concat(" ");
	}
    }
    if (pun) {
	bot.reply(message, resp);
    }
});
