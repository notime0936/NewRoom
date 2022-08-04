//const { options } = require("../../routes");

var socket = io();
const signingUp = document.getElementById('signUp');


var userData;
var currentMsgRoom;
var inputChatID;

var srcAvatar;
async function getAvatar(){
    const apiUrl = 'http://dungnguyenblue.com:3000/profilepic';
    fetch(apiUrl)
        .then(response => response.json())
        .then((data) => {
            console.log("this is new data"+data.path);
            srcAvatar = data;});
}

function updateAvatar(){
    getAvatar();
    document.getElementById("userProfilePic").src = srcAvatar.path.slice(7);
}

async function getUserName(roomName){
    const apiUrl = 'http://dungnguyenblue.com:3000/getusername';
    fetch(apiUrl)
        .then(response => response.json())
        .then((data) => userData = data
        /*{
            this.setStatename = data.name;
            socket.emit('change-room', data.name, roomName);
            console.log(user.name+" is fetch");
        }*/
        )
        .then(() => {socket.emit('change-room', userData.name, roomName)});
}

function enterRoom(roomname){
    //alert(roomname);
    getUserName(roomname);
    getAvatar();
    if (roomname == "CSE1325")
    {
        currentMsgRoom = "msg-oop";
        inputChatID = "input-chat-1";
    }
    if (roomname == "CSE3318")
    {
        currentMsgRoom = "msg-algo";
        inputChatID = "input-chat-2";
    }
    if (roomname == "CSE2315")
    {
        currentMsgRoom = "msg-ds";
        inputChatID = "input-chat-3";
    }
    if (roomname == "CSE3330")
    {
        currentMsgRoom = "msg-db";
        inputChatID = "input-chat-4";
    }
    
}



function sendMessage(){
    var elem = document.getElementById(inputChatID);
    socket.emit('chat-message', userData.name, elem.value); 
    elem.value = '';
}

socket.on('chat-message', function(fromuser, msg){
            console.log("from user "+fromuser+" "+ " "+msg+" "+currentMsgRoom);
            if (userData.name.localeCompare(fromuser) == 0){
                var chat = document.getElementById(currentMsgRoom);
                chat.innerHTML = chat.innerHTML + '<br/>' +
                            '<div class="sent-chats" id="sent-chat">'+
                                '<div class="sent-chats-img">'+
                                    '<img class="rounded-circle" src="'+srcAvatar.path.slice(7)+'">' +
                                '</div>'+
                                '<div class="sent-msg">'+
                                    '<div class="sent-msg-inbox">'+
                                        '<div class="sent-name">'+fromuser+'</div>'+
                                        '<p>' + msg + '</p>'+
                                    '</div>' +
                                '</div>' +
                            '</div>'+
                            '<br>'
            }
            else{
                var chat = document.getElementById(currentMsgRoom);
                chat.innerHTML = chat.innerHTML + '<br/>' + 
                            '<div class="received-chats">' +
                                '<div class="received-chats-img">'+
                                    '<img class="rounded-circle" src="../images/anime.jpg">'+
                                '</div>'+
                                '<div class="received-msg">' +
                                    '<div class="received-msg-inbox">' +
                                        '<div class="received-name">'+fromuser+'</div>'+
                                        '<p>' + msg + '</p>' +
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<br>'
            }
            

 });

 socket.on('join-room', function(user){
    console.log("join-room: "+user);
 });




 
