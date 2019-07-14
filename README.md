# App
https://slack.dev/bolt/ja-jp/tutorial/getting-started  
Boltフレームワーク入門として作った雑Slack用Botアプリ  
メンション相手がAckするまで定期的にメンション送り続ける

## 準備
1. Slack Appの準備
1. Redisを起動しておく

### Slack Appの準備
- OAuth & Permissionsの設定
  - Tokenを.env.sampleをコピーして設定
- Event Subscriptionsの設定
- Slach Commandsの設定
  - `/repeat`を追加
  
### 起動
- `$ node app.js`
- cronで`repeater.js`を任意の周期で実行する用に設定しておく
