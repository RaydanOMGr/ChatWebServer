let websock;
let uuid = undefined;

function connect() {
    websock = new WebSocket("ws://192.168.178.70:7000");
    websock.addEventListener("message", (msg) => {
        let data = JSON.parse(msg.data);
        if(data.id === undefined || data.id === null) {
            console.error("Invalid packet received.");
            console.debug(msg.data);
            return;
        }

        if(data.id === 0) {
            print(data.message)
        } else if(data.id === 1) {
            uuid = data.assignedUUID;
            send({ "username": "testuser", "id": 2 })
        } else if(data.id === 3) {
            send({ "id": 3 })
        }
    });
    websock.addEventListener("open", () => {
        print("Connected to server!")
    });
    websock.addEventListener("error", (err) => {
        print("Oops! An error occured! " + err.type);
    });
    websock.addEventListener("close", () => {
        print("Connection to the server has been broken!")
    });
}

function sendMessage(elementId) {
    console.log('sending message');
    if(uuid === undefined) return;
    console.log('uuid exists')
    let textarea = document.getElementById(elementId);
    let message = textarea.value;

    websock.send(
        JSON.stringify(
            { "sessionUUID": uuid, "message": message, "id": 0 }
        )
    )
}

function print(...message) {
    let mess = document.createElement("p");
    for(let i = 0; i < message.length; i++) {
        const msg = message[i];
        mess.innerText += msg.toString() + (i <= message.length ? "" : " ");
    }
    document.getElementById("chat").appendChild(mess);
}

function send(jsonObject) {
    jsonObject.sessionUUID = uuid;
    websock.send(
        JSON.stringify(jsonObject)
    );
}