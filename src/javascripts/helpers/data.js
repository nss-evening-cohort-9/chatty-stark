import axios from 'axios';

const getMessagesData = () => axios.get('../db/messages.json');

const getChatbotData = () => axios.get('../db/chatbot.json');

export default { getMessagesData, getChatbotData };
