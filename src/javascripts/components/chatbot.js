import data from '../helpers/data';

let cannedAliases = [];

const aliasCheck = () => {
  const inputValue = document.getElementById('new-message').value;
  let valueCheck = false;
  cannedAliases.forEach((item) => {
    if (item.alias === inputValue) {
      valueCheck = true;
    }
  });
  return valueCheck;
};

const getBotResponse = () => {
  const inputValue = document.getElementById('new-message').value;
  let chatbotMessage;
  cannedAliases.forEach((item) => {
    switch (inputValue) {
      case '!joke' && item.alias:
        chatbotMessage = item;
        break;
      case item.alias:
        chatbotMessage = item;
        break;
      default:
    }
  });
  return chatbotMessage;
};

const getData = () => {
  data.getChatbotData()
    .then((response) => {
      const chatbotData = response.data.cannedAliases;
      cannedAliases = chatbotData;
    })
    .catch((error) => {
      console.error(error);
    });
};

export default { aliasCheck, getData, getBotResponse };