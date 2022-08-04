/** 
var socket = io();
var username;
var toprivateuser;

function startChat(){
   var elem = document.getElementById('username');
   username = elem.value;
   var current = document.getElementById("current-user");
   current.innerHTML = "The current user is: "+ username ;
   elem.value = '';
   socket.emit('start-chat', username);
   var loginDiv = document.getElementById("login");
   loginDiv.style.display = "none";
}

function enterRoom(room){
   socket.emit('change-room', username, room);
   toprivateuser = null;
}

function sendMessage(){
   var elem = document.getElementById("chat-input");
   if (toprivateuser == null){

       socket.emit('chat-message', username, elem.value);
   }
   else{
      socket.emit('private-chat', toprivateuser, elem.value);
      var chat = document.getElementById('inchat');
      chat.innerHTML = chat.innerHTML + '<br/>' + username + ' private : ' + elem.value;

   }
   elem.value = '';
}

function sendPrivateMsg(user){
   toprivateuser = user;
   var chat = document.getElementById('inchat');
   chat.innerHTML = 'Enter private room with '+user+'<br/>';

}

socket.on('chat-message', function(fromuser, msg){
   var chat = document.getElementById('inchat');
   chat.innerHTML = chat.innerHTML + '<br/>' + fromuser + ' public : ' + msg;
});

socket.on('private-message', function(fromuser, msg){
   var chat = document.getElementById('inchat');

   if (toprivateuser !== fromuser){
      chat.innerHTML = 'Enter private room with '+fromuser+'<br/>';

   }
   toprivateuser = fromuser;
   
   chat.innerHTML = chat.innerHTML + '<br/>' + fromuser + ' : ' + msg;
});


socket.on('join-room', function(user){
   var chat = document.getElementById('inchat');
   chat.innerHTML = chat.innerHTML + '<br/>' + user + ' has joined ';
});

socket.on('user-list', function(userlist){
   var div = '';
   var list = document.getElementById('members');
   for (let x of userlist){
         div = '<div onclick = "sendPrivateMsg(\''+x+'\');">'+x+'</div>';
         list.innerHTML = list.innerHTML +  div + '<br/>';
   }  
});

*/
