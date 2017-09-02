// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  username: 'Kenny',
  roomname: 'lobby',
  init: function() {
    console.log('init');
    $('.username').on('click', app.handleUsernameClick);
    $('.submit').on('submit', app.handleSubmit);
    
    app.fetch();
  },
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });    
  },
  fetch: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      data: 'order=-createdAt&limit=50',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        if (data.results.length === 0) {
          return;
        }
        for (var i = 0; i < data.results.length; i++) {
          var message = {
            username: data.results[i].username,
            text: data.results[i].text,
            roomname: data.results[i].roomname,
            time: data.results[i].createdAt
          };
          app.renderMessage(message);
        }
        console.log(data.results);
        console.log('chatterbox: Message received');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', data);
      }
    });    
  },
  clearMessages: function() {
    $('#chats').html('');
  },
  renderMessage: function(message) {
    // {
    //       username: 'Mel Brooks',
    //       text: 'I didn\'t get a harumph outa that guy.!',
    //       roomname: 'lobby'
    // }
    $('#chats').append('<p>' + message.time + '\t\t' + '<a src="#" class = "username">' + message.username + ':' + message.text + '--' + message.roomname + '</p>');
  },
  renderRoom: function(roomName) {
    var $option = $('<option>').val(roomName).text(roomName);
    $('#roomSelect').append($option);
  },
  handleUsernameClick: function(event) {
    console.log(event);
  },
  handleSubmit: function(event) {
    
  }
};

$(document).ready(app.init);
