const sender = $('#currentuser').val();
let receiverName;
function addFriend(name) {
  $.ajax({
    url: '/search',
  type: 'POST',
  data: {
    receiverName: name,
  },
  success: function () {
  console.log(receiverName);
  },
});
}
$(document).ready(function () {
  $('.friend-add').on('click', function (e) {
    e.preventDefault();
  });
  $('#accept_friend').on('click', function () {
    const senderId = $('#senderId').val();
    const senderName = $('#senderName').val();
    $.ajax({
      url: '/search',
    type: 'POST',
    data: {
      senderId: senderId,
          senderName: senderName,
    },
    success: function () {
      $(this).parent().eq(1).remove();
    },
  });
    $('#reload').load(`${location.href} #reload`);
  });
  $('#cancel_friend').on('click', function () {
    const user_Id = $('#user_Id').val();
// console.log(user_Id);
    $.ajax({
      url: '/search',
    type: 'POST',
    data: {
      user_Id: user_Id,
    },
    success: function () {
      $(this).parent().eq(1).remove();
    },
  });
    $('#reload').load(`${location.href} #reload`);
  });
});
