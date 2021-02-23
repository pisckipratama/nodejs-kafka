require('dotenv/config');
const kafka = require('kafka-node');
const socketIO = require('socket.io')(process.env.PORT || 8080);
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient();
const io = socketIO;

const consumer = new Consumer(
  client,
  [
    { topic: 'nodejs', partition: 0 }
  ],
  {
    autoCommit: true,
    encoding: "utf8"
  }
);

consumer.on('message', (message) => {
  console.log(`Receive Message from kafka : ${message.value} Topic : ${message.topic}`);
  if (message.topic === 'nodejs') {
    io.send(message.value);
  };
});