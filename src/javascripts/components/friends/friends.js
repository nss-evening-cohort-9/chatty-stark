import data from '../../helpers/data';
import util from '../../helpers/util';

let friends = [];

const domStringBuilder = (array) => {
  let domString = '<h5 class="friends-title">Who\'s Online?</h5>';
  array.forEach((friend) => {
    domString += `<div class="friendslist" id=${friend.id}>`;
    domString += '  <div class="friends-text d-flex">';
    if (`${friend.isAvailable}` === 'true') {
      domString += ' <span class ="activedot"></span>';
      domString += `<img height="25" width="25" src=${friend.imageUrl} class="friend-image">`;
      domString += `    <div>${friend.friendName}</div>`;
      domString += '  </div>';
      domString += '</div>';
    } else {
      domString += ' <span class ="dot"></span>';
      domString += `<img height="25" width="25" src=${friend.imageUrl} class="friend-image">`;
      domString += `    <div>${friend.friendName}</div>`;
      domString += '  </div>';
      domString += '</div>';
    }
  });
  domString += '<img class="friends-logo" src="../../../../assets/starklogo.png">';
  util.printToDom('friends', domString);
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
