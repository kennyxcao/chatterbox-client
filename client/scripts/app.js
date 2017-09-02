// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  username: 'Kenny',
  roomname: 'lobby',
  rooms: [],
  messages: [],
  friends: [],
  
  init: function() {
    // jquery Selector
    // app.fetch();
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
        app.clearMessages();
        app.fetch();
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
      data: 'order=-createdAt&limit=200',
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
          app.messages.push(message);
        }
        app.renderMessages();
        app.renderRooms();
        app.$username = $('.username');
        app.$username.on('click', app.handleUsernameClick);
        app.$roomSelect.on('change', app.handleRoomChange);
        app.boldFriends();
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
    $('#chats').append('<p>' + '<a href="#" class = "username">' + message.username + '</a>:' + message.text + '\t\t Room: ' + message.roomname + '</p>');
  },
  renderMessages: function() {
    app.messages.forEach(app.renderMessage);
  },
  renderRoom: function(roomName) {
    var $option = $('<option>').val(roomName).text(roomName);
    $('#roomSelect').append($option);
  },
  renderRooms: function() {
    app.messages.forEach(function(message) {
      if (!app.rooms.includes(message.roomname)) {
        app.rooms.push(message.roomname);
        app.renderRoom(message.roomname);
      }
    });
  },
  handleRoomChange: function(event) {
    var room = $(event.target).text();
  },
  handleUsernameClick: function(event) {
    console.log('username clicked');
    console.log(event.target);    
    var username = $(event.target).text();
    if (app.friends.indexOf(username) < 0) {
      app.friends.push(username);
    }
    app.boldFriends(username);
    
  },
  
  boldFriends: function(username) {
    if (username) {
      app.$username.filter(function() {
        return $(this).text() === username;
      }).parent().css('font-weight', 'bold');       
    } else {
      app.$username.filter(function() {
        return app.friends.includes($(this).text());
      }).parent().css('font-weight', 'bold');       
    }
  },
  
  handleSubmit: function(event) {
    //console.log(event.target);
    if (!app.$message.val()) {
      return;
    }
    
    var message = {
      username: app.username,
      text: app.$message.val(),
      roomname: app.roomname
    };
    
    app.send(message);
    app.$message.val('');
    
    event.preventDefault();
  },
  
  escapeHTML: function(string) {
    if (!string) {
      return '';
    }
    return string.replace(/[[<>]/g, '');
  }
  
};

$(document).ready(function() {
  // app.fetch();
  app.init();
});
