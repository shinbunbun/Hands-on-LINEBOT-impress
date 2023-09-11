import { createHmac } from 'crypto';
import aws from 'aws-sdk';
import line from '@line/bot-sdk';
import { AppContext } from '../app-context.js';
import { bot } from '../bot.js';
import { error, log } from '../log.js';
import { DynamoDBContext } from '../db.js';
import { saveContentFileToS3DownloadDir } from '../save-file.js';

const { CHANNEL_SECRET } = process.env;
const { CHANNEL_ACCESS_TOKEN } = process.env;

// 署名検証をする関数
const verifySignature = (event) => {
  const signature = createHmac('sha256', CHANNEL_SECRET).update(JSON.stringify(event.body)).digest('base64');
  const signatureHeader = event.headers['x-line-signature'];
  return signature === signatureHeader;
};

const response = {
  statusCode: 200,
  body: '',
};

// eslint-disable-next-line consistent-return
export const webhookHandler = async (event) => {
  // リクエストボディからイベントを取り出し
  const { events } = event.body;

  // 受け取ったイベントの中身を出力
  log(events);

  // 署名検証に失敗した場合は200を返して終了
  if (!verifySignature(event)) return response;

  // DynamoDB DocumentClientのインスタンスを生成
  const dynamoDocument = new aws.DynamoDB.DocumentClient();

  // DynamoDBのContextを作成
  const dynamoDBContext = new DynamoDBContext(dynamoDocument);

  // bot-sdkのクライアントを作成
  const lineClient = new line.Client({
    channelAccessToken: CHANNEL_ACCESS_TOKEN,
  });

  // ファイルのダウンローダーを作成
  const contentFileDownloader = saveContentFileToS3DownloadDir;

  // S3のクライアントを作成
  const s3Client = new aws.S3();

  // AppContextを作成
  const appContext = new AppContext({
    dynamoDBContext,
    lineClient,
    contentFileDownloader,
    s3Client,
  });

  // エラーハンドリング
  try {
    // イベントを処理する関数を呼び出す
    await Promise.all(bot(events, appContext));
  } catch (e) {
    error(`返信処理でエラーが発生しました: ${e}`);
  }

  return response;
};
