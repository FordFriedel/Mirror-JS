const Enmap = require('enmap');

exports.commandName = 'birthday';

let birthdays = new Enmap({name: 'bday'});
let birthdayChannels = new Enmap({name: 'bdayChannels'});
let bdayTimes = new Enmap({name: 'bdayTimes'});


exports.registerData = (client) => {
    return {
        name: this.commandName,
        description: 'Set your birthday to recieve a Birthday message on your birthday!',
        options: [{
            name: 'set',
            description: 'Set your birthday',
            type: 1,
            required: false,
            options: [{
                name: 'month',
                description: 'Your birth month',
                type: 'STRING',
                required: true,
                choices: months
            },{
                name: 'day',
                description: 'The date of your birthday',
                type: 'INTEGER',
                required: true
            }]
        },{
            name: 'channel',
            description: 'Set the channel where the birthday messages are sent to',
            type: 1,
            required: false,
            options: [{
                name: 'channel',
                description: 'Set the channel where the birthday messages are sent to',
                required: true,
                type: 'CHANNEL'
            }]
            
        },{
            name: 'message',
            description: 'Edit the message used when its someones birthday',
            type: 'STRING',
            required: false
        },{
            name:'time',
            description:'Edit the time the birthday message is sent in your local time',
            type: 1,
            require: false,
            options: [{
                name: 'hours',
                description: 'The hour you want to send Birthday messages in local time'

            }]
        }]
    }
}

exports.run = async (client, interaction) => {
    //No global permission check because different functions are doing different things
    
    if(interaction.options.getSubcommand() == 'set'){
        //TODO: Permission Check

        //ensure that the enmap has stored the user, and stores their birthday. If not create it and give it an empty string. 
        var userBirthday = birthdays.ensure(`${interaction.user.id}`, ""); 
        //store the date of birth in numerical form
        var userBirthday = `${interaction.options.getInteger('day')}-${monthCode[interaction.options.getString('month')]}`;
        //place the updated guild JSON in the enmap
        birthdays.set(`${interaction.user.id}`,userBirthday);
        birthdays.forEach(element => console.log(element));
        interaction.reply({content: `Successfully set your birthday to ${interaction.options.getInteger('day')}-${interaction.options.getString('month')}`, ephemeral: false });
        return;
    }
    if(interaction.options.getSubcommand() == 'channel'){
        //TODO: Permission Check
        //TODO: verify user is an admin

        //ensure that the enmap has stored the guild and brings in the JSON. If not create it and give it an empty JSON. 
        var guildChannel = birthdayChannels.ensure(`${interaction.guild.id}`, ""); 
        //store the date of birth in numerical form
        guildChannel = interaction.options.getChannel('channel');
        //place the updated guild JSON in the enmap
        birthdayChannels.set(`${interaction.guild.id}`, guildChannel.id);
        birthdayChannels.forEach(element => console.log(element));
        interaction.reply({content: `Successfully set your birthday Channel to ${interaction.options.getChannel('channel')}`, ephemeral: false });
        return;
    }
    if(interaction.options.getSubcommand() == 'time'){
        //TODO, handle errors, this may have to be done in every sub command

        //TODO: Verify the user is an administrator

        //Take the inputs for time and timezone and verify that they are valid

        //Convert the time to UTC, then adjust it for the local time on the linode

        //Publish a birthday cronjob for that time (index.js)
        interaction.reply('Hey');
        return;

    }
    return;
    if(interaction.options.getSubcommand() == 'message'){
        //TODO: Permission Check
    }
}

const monthCode = {"january":1, "february":2, "march":3, "april":4, "may":5, "june":6, "july":7, "august":8,"september":9, "october":10, "november":11, "december":12}

const months = [{
    name: 'January',
    value: 'january'
},{
    name: 'February',
    value: 'february'
},{
    name: 'March',
    value: 'march'
},{
    name: 'April',
    value: 'april'
},{
    name: 'May',
    value: 'may'
},{
    name: 'June',
    value: 'june'
},{
    name: 'July',
    value: 'july'
},{
    name: 'August',
    value: 'august'
},{
    name: 'September',
    value: 'september'
},{
    name: 'October',
    value: 'october'
},{
    name: 'November',
    value: 'november'
},{
    name: 'December',
    value: 'december'
}]

exports.birthdays = birthdays; //TODO: verify names are correct
exports.birthdayChannels = birthdayChannels; //TODO: verify
exports.bdayTimes = bdayTimes; //TODO: verify