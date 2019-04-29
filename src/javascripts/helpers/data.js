import axios from 'axios';

const getMessagesData = () => axios.get('../db/messages.json');

const getChatbotData = () => axios.get('../db/chatbot.json');

const getFriendsData = () => axios.get('../db/friends.json');

export default { getMessagesData, getFriendsData, getChatbotData };
