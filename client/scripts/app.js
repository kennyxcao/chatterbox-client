// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  init: function() {
    
  },
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
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
      url: this.server,
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
    $('#chats').append('<p>' + message.text + '</p>');
  },
  renderRoom: function(roomName) {
    var $option = $('<option>').val(roomName).text(roomName);
    $('#roomSelect').append($option);
  }
};

