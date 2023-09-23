//socket.io
const socket = io(); //step 5

let chatBox = document.querySelector(".chatBox");

let textInp = document.querySelector(".inp");

let sendBtn = document.querySelector(".sendBtn");

let userName;

//take username

while (userName == null) {
  userName = prompt("please enter your name");
}

//Append Data And Name

const appendData = (msg, type) => {
  let out_in = document.createElement("div");

  chatBox.appendChild(out_in);

  out_in.classList.add(`${type}`, "msg");

  let msgDiv = document.createElement("div");

  let user = document.createElement("h1");

  user.innerText = msg.name;

  msgDiv.classList.add("chats");

  msgDiv.innerText = msg.input;

  out_in.appendChild(user);

  out_in.appendChild(msgDiv);
};

const sendMsg = (inputval) => {
  if (inputval == "") {
    return -1;
  }

  let msg = {
    input: inputval,

    name: userName,
  };

  socket.emit("msg", msg); // send msg to server

  appendData(msg, "outgoing");
};

sendBtn.addEventListener("click", (e) => {
  const inpValue = textInp.value;

  e.preventDefault();

  textInp.value = "";

  sendMsg(inpValue);
});

socket.on("msg", (msg) => {
  //step 6th msg recive from server.js
  appendData(msg, "incoming");
});
