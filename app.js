const { App } = require('@slack/bolt');
const Redis = require('ioredis');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const redis = new Redis();

app.command('/repeat', async({command, ack, say}) => {
  //console.log(command);
  ack();
  redis.set("repeater", JSON.stringify(command));
});

app.action('button_click', ({body, ack, say}) => {
  //console.log(body);
  ack();
  redis.del("repeater");
  say(`<@${body.user.id}> acked the message`);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
