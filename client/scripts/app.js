// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  init: function() {
    console.log('init');
    $('.username').on('click', app.handleUsernameClick);
    $('.submit').on('submit', app.handleSubmit);
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
      type: 'GET',
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
  clearMessages: function() {
    $('#chats').html('');
  },
  renderMessage: function(message) {
    // {
    //       username: 'Mel Brooks',
    //       text: 'I didn\'t get a harumph outa that guy.!',
    //       roomname: 'lobby'
    // }
    $('#chats').append('<p>' + '<a src="#" class = "username">' + message.username + ':' + message.text + '--' + message.roomname + '</p>');
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
