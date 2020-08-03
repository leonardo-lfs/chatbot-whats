const banco = require("../database/banco");
const { menu } = require("../menus/menuInicial")

function execute(user, msg, contato) {
  let message = " Menu Inicial \n\n";

  Object.keys(menu).forEach(value => {
    let element = menu[value];
    message += `${value} - ${element.descricao} \n`
  });

  banco.db[user].stage = 1;

  return [
    `Olá ${contato}, sou uma assistente virtual, seja bem vindo \n\n`,
    message
  ];
}

exports.execute = execute;