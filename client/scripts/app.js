// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  username: 'Kenny',
  roomname: 'lobby',
  messages: [],
  
  init: function() {
    // chat username send message roomSelect
    
    // jquery Selector
    app.$username = $('.username');
    app.$message = $('#message');
    app.$send = $('#send');
    app.$roomSelect = $('#roomSelect');
      
    app.$username.on('click', app.handleUsernameClick);
    app.$send.on('submit', app.handleSubmit);
    
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
            text: app.escapeHTML(data.results[i].text),
            roomname: data.results[i].roomname,
            time: data.results[i].createdAt
          };
          app.renderMessage(message);
        }
        console.log('chatterbox: Messages received');
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
    console.log(event.target);
  },
  
  handleSubmit: function(event) {
    console.log(event.target);
    debugger;
    var message = {
      username: app.username,
      text: app.$message.val(),
      roomname: app.roomname
    };
    console.log(message);
    app.send(message);
    app.$message.val('');
    event.preventDefault();
  },
  
  escapeHTML: function(string) {
    if (!string) {
      return '';
    }
    return string.replace(/[[&=/\<>"']/g, '');
  }
  
};

$(document).ready(app.init);
