import axios from 'axios';

const getMessagesData = () => axios.get('../db/messages.json');

const getFriendsData = () => axios.get('../db/friends.json');

export default { getMessagesData, getFriendsData };
