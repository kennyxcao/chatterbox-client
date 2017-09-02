// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  username: location.search.split('=')[1],
  roomname: 'lobby',
  rooms: [],
  messages: [],
  friends: [],
  
  init: function() {
    // jquery Selector
    app.$username = $('.username');
    app.$message = $('#message');
    app.$send = $('#send');
    app.$roomSelect = $('#roomSelect');
    app.$chats = $('#chats');
    
    app.$chats.on('click', 'a', app.handleUsernameClick);
    app.$send.on('submit', app.handleSubmit);
    app.$roomSelect.on('change', app.handleRoomChange);
    
    app.fetch();
    setInterval(app.fetch.bind(app), 10000);
  },
  
  send: function(message) {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        app.showSpinner();
        setTimeout(app.fetch.bind(app), 200);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });    
  },
  
  fetch: function() {
    $.ajax({
      url: app.server,
      data: 'order=-createdAt&limit=200',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        if (data.results.length === 0) {
          return;
        }
        app.clearMessages();
        for (var i = 0; i < data.results.length; i++) {
          var message = {
            username: app.escapeHTML(data.results[i].username),
            text: app.escapeHTML(data.results[i].text),
            roomname: app.escapeHTML(data.results[i].roomname),
            time: data.results[i].createdAt
          };
          app.messages.push(message);
        }
        app.renderMessages(app.roomname);
        app.renderRooms();
        app.boldFriends();
        app.hideSpinner();
        console.log('chatterbox: Messages received');
      },
      error: function (data) {
        console.error('chatterbox: Failed to receive message', data);
      }
    });    
  },
  
  clearMessages: function() {
    app.messages = [];
    $('#chats').html('');
  },
  
  renderMessage: function(message) {
    $('#chats').append('<p>' + '<a href="#" class = "username">' + message.username + '</a>:<br>' + message.text + '</p>');
  },
  renderMessages: function(roomname) {
    app.messages.filter(function(message) {
      return message.roomname === roomname;
    }).forEach(app.renderMessage);
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
    var room = $(event.target).val();
    app.roomname = room;
    app.fetch();
  },
  handleUsernameClick: function(event) {
    var username = $(event.target).text();
    if (!app.friends.includes(username)) {
      app.friends.push(username);
    }
    app.boldFriends(username);
  },
  
  boldFriends: function(username) {
    if (username) {
      $('.username').filter(function() {
        return $(this).text() === username;
      }).parent().css('font-weight', 'bold');       
    } else {
      $('.username').filter(function() {
        return app.friends.includes($(this).text());
      }).parent().css('font-weight', 'bold');       
    }
  },
  
  handleSubmit: function(event) {
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
    return string.replace(/[<>]/g, '');
  },
  
  showSpinner: function() {
    $('.spinner').fadeIn();
  },
  
  hideSpinner: function() {
    $('.spinner').fadeOut();
  }
  
  
};

$(document).ready(function() {
  // app.fetch();
  app.init();
});
