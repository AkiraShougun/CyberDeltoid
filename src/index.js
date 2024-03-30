import 'dotenv/config'
import {Client, IntentsBitField} from 'discord.js'
import 'node-fetch'

const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent
    ],
})

client.on('ready',(c)=>{
    console.log(`Logged in as ${c.user.tag}!`)
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'greet') {
      await interaction.reply('I don\'t do greets here');
    }

    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('first-number').value
        const num2 = interaction.options.get('second-number').value

        await interaction.reply(`The sum is ${num1+num2}`)
      }

    if (interaction.commandName === 'oeis'){
        const oeis_number = interaction.options.get('number').value

        const file = await fetch(`https://oeis.org/search?q=${oeis_number}&fmt=json`).then(res => res.json())

        // console.log(file)
        if (file.results === null){
            await interaction.reply(`User input:${file.query}\nOeis does not have the given sequence of integers.`)
        } else{
            await interaction.reply(`User input: ${file.query}\n**${file.results[0].name}**\n ${file.results[0].data}`)
        }
        
    }
  });

client.on('messageCreate',(m)=>{
    if (m.author.bot){
        return
    }

    if (m.content === "Hello"){
        m.reply('Hello World!')
    }

    if (m.content === "What is the best field of math?"){
        m.reply('Obviously analytic number theory')
    }

    if (m.content === "Nice"){
        m.reply('hell yeah')
    }
})


client.login(process.env.TOKEN)



