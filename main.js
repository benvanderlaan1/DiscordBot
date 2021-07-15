const Discord = require('discord.js');

const client = new Discord.Client();

main();

const commandList = ["The commands currently available: ",
                     "/ping - bot test", 
                     "/help - A list of available commands", 
                     "/start <server-type> - Start a server",
                     "/serverlist - A list of available severs"];
const serverList = ["The servers currently available: ",
                    "- Minecraft modded",
                    "- Minecraft vanilla",
                    "- Space engineers (use SE as servertype)",
                    "- Arma 3 (use ARMA as servertype)"]

function main() {
    // prefix for in-chat commands
    const prefix = '/';

    client.once('ready', () => {
        console.log('Server starter is online');
    });

    client.on('message', message => {
        // if the message does not start with the previously set prefix or the author of
        // the message is the bot itself then return
        if (!message.content.startsWith(prefix) || message.author.bot) {
            return;
        }

        const args = message.content.slice(prefix.length).split(/ +/);

        var output;

        output = Commands(args);

        message.channel.send(output);

        // output the message in the channel
        
    });
};

// general command handler
function Commands(args) {
    // shift the arguments array by 1 into command
    const command = args.shift().toLowerCase();

    // check if commands are the equivalent of already known commands, otherwise output default
    if (command === 'ping') {
        return "pong!";
    };

    if (command === 'help') {
        return commandList;
    }

    if (command === 'serverlist') {
        return serverList;
    }

    if (command === 'start') {
        output = StartCommands(args);
        return output;
    }

    // default
    return "This command is not known, try /help for a list of commands";
};

// functions for different game servers
function StartCommands(args) {
    var command = '';

    try{
        command = args.shift().toLowerCase();
    } catch (TypeError) {
        return "Please define a server after the /start command";
    }

    if (command === 'minecraft') {
        output = StartMinecraft(args)
        return output;
    }

    if (command === 'se') {
        return "Starting the Space Engineers server...";
    }

    if (command === 'arma') {
        return "Starting the ARMA 3 server...";
    }

    // default
    return "This Server is not known, try /serverlist for a list of commands";
}

// function for different minecraft servers
function StartMinecraft(args) {
    var command = '';

    try{
        command = args.shift().toLowerCase();
    } catch (TypeError) {
        return "Please define a minecraft server after the /start minecraft command";
    }

    if (command === 'modded') {
        var shell = new ActiveXObject( "Shell.Application");
        var path = "C:\\Users\\Ben\\Desktop\\Minecraft modded 1.17\\start.bat";
        shell.ShellExecute(path,"","","open","1");
        return "Starting the modded minecraft server...";
    }

    if (command === 'vanilla') {
        return "Starting the vanilla minecraft server...";
    }

    // default
    return "This Server is not known, try /serverlist for a list of commands";
}

// has to be last line
client.login('ODY0OTc4MTY4NjQ1NjgxMTUz.YO9TsQ.eF5evGijCEbLB5hp-eCQ-tz1DZc');

