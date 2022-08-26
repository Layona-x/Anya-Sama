const folger = require('aoi.js')
const discord = require('discord.js')
const fs = require('fs')
const path = require('path')
const client = new discord.Client()
client.login(process.env.token)
client.on('ready',() => {
  console.log("Discord.js İle Giriş Yapıldı")
  })
const anya = new folger.Bot({
  token:process.env.token,
  prefix:"an!",
  intents:"all",
 })
const loader = new folger.LoadCommands(anya);

loader.load(anya.cmd,'./commands/')
anya.onInteractionCreate()
anya.onMessage()

anya.readyCommand({
  channel:"",
  code:`
  $log["Aoi.js İle Giriş Yapıldı"]
  
  
  

  `
})
anya.command({
name:"$alwaysExecute",
code:`
$onlyIf[$getUserVar[level;$authorID]<=$getUserVar[lvlup;$authorID];{execute:levelup}]
$setUserVar[level;$sum[$getUserVar[level;$authorID];$random[15;30]];$authorID]
$onlyIf[$getVar[levelsistem]!=kapalı;]


`
})

anya.awaitedCommand({
name:"levelup",
"$if":"v4",
code:`
$author[1;$userTag;$authorAvatar]
$description[1;✨ Level atladın yeni levelin **$getUserVar[analvl;$authorID]**]
$color[1;RANDOM]
$thumbnail[1;$authorAvatar]

$setUserVar[analvl;$sum[$getUserVar[analvl;$authorID];1];$authorID]
$setUserVar[lvlup;$math[$getUserVar[lvlup;$authorID]*4];$authorID]
$if[$getUserVar[analvl;$authorID]==1]
$setUserVar[avatar1;aktif]
$endif
$if[$getUserVar[analvl;$authorID]==5]
$setUserVar[avatar2;aktif]
$endif
$if[$getUserVar[analvl;$authorID]==10]
$setUserVar[avatar3;aktif]
$endif
$if[$getUserVar[analvl;$authorID]==20]
$setUserVar[avatar4;aktif]
$endif
$if[$getUserVar[analvl;$authorID]==50]
$setUserVar[avatar5;aktif]
$endif

`
}) 
anya.variables({
  hex:"AQUA",
  cross:"❌",
  afk:"hayır",
  afks:"",
  afket:"0",
  afkmsj:"Etiketlenmemişsin",
  afksebep:"Belirtilmemiş",
  anyadolar:"0",
  anyakoruma:"deaktif",
  eac:"<a:ac_anya:994987324721082401>",
  esaskin:"<:saskin_anya:994987269423366144>",
  eyakalanmis:"<:yakalanan_anya:994987579227242546>",
  emutlu:"<:mutlu_anya:994987309705461770>" ,
  ekotu:"<:kotu_anya:994987344618848259>" ,
  ac_anya:"0",
  saskin_anya:"0",
  yakalanan_anya:"0",
  kötü_anya:"0",
  mutlu_anya:"0",
  level:"0",
  lvlup:"125",
  analvl:"0",
  levelsistem:"açık",
  avatar1:"kapalı",
  avatar2:"kapalı",
  avatar3:"kapalı",
  avatar4:"kapalı",
  avatar5:"kapalı",
  meslek:"yok",
})
anya.functionManager.createCustomFunction({
  name:"$vcID",
  type:"djs",
  code: async d => {
      const data = d.util.aoiFunc(d);

    const [userID = d.author?.id, guildID = d.guild?.id] = data.inside.splits;

    const guild = await d.util.getGuild(d, guildID);

    if (!guild) return d.aoiError.fnError(d, 'guild', {inside: data.inside});

    const member = await d.util.getMember(guild, userID);

    if (!member) return d.aoiError.fnError(d, 'member', {inside: data.inside});

    data.result = member.voice.channelId;

    return {

        code: d.util.setCode(data)

    }

}
  
  })
anya.functionManager.createCustomFunction({

      name: "$createGuildTemplate",

      type: "djs",

      code: async d => {

        

        const data = d.util.aoiFunc(d)

        const [title,description] = data.inside.splits

                if(!title) return d.aoiError.fnError(d,'custom',{},"'title' Not Found")

        const guild = await d.util.getGuild(d, d.guild.id)

                const code = await guild.createTemplate(title, description)

        data.result = `https://discord.new/${code}`

                

        return {

          code: d.util.setCode(data)

        }

    }

})
/* Website  */

/* Website  */
const express = require('express')

 const app = express()
 const ejs = require('ejs')
 app.listen(3000)
 app.set('view engine','ejs')
app.set('views',__dirname+'/views');
   app.get('/',function(req,res){
let command = fs.readdir(path.join(process.cwd() + "/commands"), (err, files) => {
var obj = {}
let arr = new Array()
arr.push(files)
let a = 0
for(const item of arr[0]) {
a += 1
}
 console.log(a)
})
       let botx = client.users.cache.get('993754501104279592')
       const durum = botx.presence.status
       const tag = botx.username
       const avatar = botx.avatarURL()
       const ping = client.ws.ping
       const sw = client.guilds.cache.size
     console.log(durum) 
     console.log(sw)
       res.render("anasayfa",{sw,botx,durum,tag,avatar,ping,command})
     
   })

