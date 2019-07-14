const { App } = require('@slack/bolt');
const Redis = require('ioredis');

require('dotenv').config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const redis = new Redis();

redis.get("repeater")
  .then(async (result) => {
    if(result == null) {
      throw new Error("result is null");
    }
    command = JSON.parse(result);
    await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: command.channel_id,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": command.text
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Ack"
            },
            "action_id": "button_click"
          }
        }
      ]
    });

    process.exit();
  }).catch(err => {
    console.log(err);
    process.exit();
  });
