// モジュールの読み込み
import express from 'express';
import { middleware } from '@line/bot-sdk';
import 'dotenv/config';

// ファイルの読み込み
import { webhook } from './webhook.js';
import { log } from '../log.js';

const PORT = process.env.PORT || 3000;
const { CHANNEL_SECRET } = process.env;
const app = express();

// /にアクセスがあった時、Deploy succeededと返す
app.get('/', (_req, res) => { res.send('Deploy succeeded'); });
// /webhookにアクセスがあったとき、bot.jsのindexを呼び出す
app.post('/webhook', middleware({
  channelSecret: CHANNEL_SECRET,
}), webhook);

app.listen(PORT);
log(`Server running at ${PORT}`);
