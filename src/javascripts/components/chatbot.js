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
  const chatbotMessage = {};
  cannedAliases.forEach((item) => {
    switch (inputValue) {
      case item.alias:
        chatbotMessage.imageUrl = item.imageUrl;
        chatbotMessage.userName = item.userName;
        chatbotMessage.msg = item.msg;
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
