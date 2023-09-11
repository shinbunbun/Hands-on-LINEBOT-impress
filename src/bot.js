// 各イベントごとの処理をするファイルの読み込み
import { messageHandler } from './event/message.js';
import { unsendHandler } from './event/unsend.js';
import { postbackHandler } from './event/postback.js';
import { joinHandler } from './event/join.js';
import { leaveHandler } from './event/leave.js';
import { followHandler } from './event/follow.js';
import { unfollowHandler } from './event/unfollow.js';
import { memberJoinedHandler } from './event/member-joined.js';
import { memberLeftHandler } from './event/member-left.js';
import { error, log } from './log.js';
import { hasKey } from './haskey.js';

// イベントタイプとHandler関数の対応オブジェクトを作成
const eventHandlers = {
  message: messageHandler,
  unsend: unsendHandler,
  postback: postbackHandler,
  join: joinHandler,
  leave: leaveHandler,
  follow: followHandler,
  unfollow: unfollowHandler,
  memberJoined: memberJoinedHandler,
  memberLeft: memberLeftHandler,
};

// イベントタイプに応じたHandler関数を取得する関数
const getEventHandler = (event) => eventHandlers[event.type];

// 返信処理を行う関数
const replyMessage = (event, message, appContext) => appContext.lineClient
  .replyMessage(event.replyToken, message)
  .then(() => {
    log('Reply succeeded');
  })
  .catch((err) => error(`返信エラー: ${err}`));

// /webhookにPOSTされた時に呼びされる関数
// eventsは配列になっているため、mapで1つずつ処理をする
// 例えば同時に2つメッセージが送信された場合は、配列に入った状態で1つのWebhookイベントで飛んでくることがある
export const bot = (events, appContext) => events.map(async (event) => {
  // もし対応していないタイプのイベントが飛んできた場合は何もせず次のイベント処理へ
  if (!hasKey(eventHandlers, event.type)) return new Promise();

  // イベントタイプに応じて対応するHandler関数を取得
  const handler = getEventHandler(event);
  let message;

  // エラーハンドリング
  try {
    // Handler関数を呼び出して返信するメッセージを取得
    message = await handler(event, appContext);
  } catch (err) {
    log(err);
    message = {
      type: 'text',
      text: 'エラーが発生しました',
    };
  }

  // もしmessageがundefinedだった場合は、返信処理をせずに次のイベント処理へ
  if (message === undefined) return new Promise(() => { });

  // 返信するメッセージをログに出力
  log(`返信メッセージ: ${JSON.stringify(message)}`);

  // メッセージを返信
  return replyMessage(event, message, appContext);
});
