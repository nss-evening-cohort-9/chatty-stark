import data from '../../helpers/data';
import util from '../../helpers/util';

let friends = [];

const domStringBuilder = (array) => {
  let domString = '';
  array.forEach((friend) => {
    domString += `<div class="friendslist" id=${friend.id}>`;
    domString += '  <div class="message-heading d-flex align-items-center">';
    domString += `    <img height="25" width="25" src=${friend.imageUrl}>`;
    domString += `    <div>${friend.friendName}</div>`;
    domString += '  </div>';
    domString += '</div>';
  });
  util.printToDom('messages', domString);
};

const getFriends = () => {
  data.getFriendsData()
    .then((response) => {
      const friendsData = response.data.friends;
      friends = friendsData;
      domStringBuilder(friends);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default { domStringBuilder, getFriends };
