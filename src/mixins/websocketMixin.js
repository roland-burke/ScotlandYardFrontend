/* eslint-disable */
export const WebsocketMixin = {
    methods: {
        sendObjectOverWebsocket: function (json, msg) {
            const obj = {
                event: msg,
                data: json
            };
            if (this.$store.getters.getWebsocket.readyState === WebSocket.OPEN) {
                this.$store.getters.getWebsocket.send(JSON.stringify(obj));
            } else {
                console.log("Could not send data. Websocket is not open.");
            }
        },
        sendMessageOverWebsocket: function (msg) {
            const obj = {
                event: msg,
            };
            if (this.$store.getters.getWebsocket.readyState === WebSocket.OPEN) {
                this.$store.getters.getWebsocket.send(JSON.stringify(obj));
            } else {
                console.log("Could not send data. Websocket is not open.");
            }
        },
    }
}