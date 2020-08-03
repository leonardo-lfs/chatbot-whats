const venom = require('venom-bot');
const banco = require('./database/banco');
const stages = require('./stages/index');
 
venom.create().then((client) => start(client));
 
async function start(client) {

  //await client.sendFile('558496326224@c.us', './src/file/os.pdf', 'cv.pdf', 'OS');
  client.onMessage((message) => {
    let resp = stages.step[getStage(message.from)].obj.execute(
      message.from,
      message.body,
      message.sender.name
    );

    for (let index = 0; index < resp.length; index++) {
      const element = resp[index];
      client.sendText(message.from, element);
    }
  });
}

const getStage = (user) => {

  if (!banco.db[user]) {
    banco.db[user] = {
      stage: 0,
      itens: []
    }
  }

  return banco.db[user].stage;
}

