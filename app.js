const express = require('express');
const kafka = require('kafka-node');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Producer = kafka.Producer;
const client = new kafka.KafkaClient();
const producer = new Producer(client);

producer.on('ready', () => {});

producer.on('error', (err) => {
  console.log('Producer is in error state');
  console.error(err);
});

const indexRoute = require('./src/routes/index');
app.use('/', indexRoute);

app.listen(3001, () => {
  console.log('server running');
});
