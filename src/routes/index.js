const express = require('express');
const router = express.Router();
const kafka = require('kafka-node');

const Producer = kafka.Producer;
const client = new kafka.KafkaClient();
const producer = new Producer(client);

router.get('/', (req, res) => {
  res.json({ greeting: 'kafka consumer' });
});

router.post('/msg', (req, res) => {
  let { topic, message } = req.body;
  message =
    typeof parseInt(message) === 'number'
      ? parseInt(message)
      : JSON.stringify(message);

  let payloads = [{ topic, messages: message, partition: 0 }];

  producer.send(payloads, (err, data) => {
    res.json({ status: 'ok', data });
  });
});

module.exports = router;
