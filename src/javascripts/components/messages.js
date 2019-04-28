import data from '../helpers/data';
import util from '../helpers/util';

let messages = [];

const domStringBuilder = (array) => {
  let domString = '';
  array.forEach((item) => {
    domString += `<div class="message" id=message${item.id}>`;
    domString += '  <div class="message-heading d-flex align-items-center">';
    domString += `    <img height="25" width="25" src=${item.imageUrl}>`;
    domString += `    <div>${item.userName}</div>`;
    domString += '    <div>1:00</div>';
    domString += '    <i class="fas fa-trash-alt"></i>';
    domString += '  </div>';
    domString += '  <div class="message-body">';
    domString += `    <div>${item.msg}</div>`;
    domString += '  </div>';
    domString += '</div>';
  });
  util.printToDom('messages', domString);
};

const getData = () => {
  data.getMessagesData()
    .then((response) => {
      const messagesData = response.data.messages;
      messages = messagesData;
      domStringBuilder(messages);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default { domStringBuilder, getData };
