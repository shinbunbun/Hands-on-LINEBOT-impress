// ファイル読み込み
import { hasKey } from '../haskey.js';
import { audioEvent } from './message/audio.js';
import { fileEvent } from './message/file.js';
import { imageEvent } from './message/image.js';
import { locationEvent } from './message/location.js';
import { stickerEvent } from './message/sticker.js';
import { textEvent } from './message/text.js';
import { videoEvent } from './message/video.js';

// メッセージタイプとHandler関数の対応オブジェクトを作成
const eventHandlers = {
  audio: audioEvent,
  file: fileEvent,
  image: imageEvent,
  location: locationEvent,
  sticker: stickerEvent,
  text: textEvent,
  video: videoEvent,
};

// メッセージタイプに応じたHandler関数を取得する関数
const getEventHandler = (event) => eventHandlers[event.message.type];

// メッセージイベントが飛んできた時に呼び出される
export const messageHandler = (event, appContext) => {
  // もし対応していないメッセージタイプのイベントが飛んできた場合
  if (!hasKey(eventHandlers, event.message.type)) {
    return {
      type: 'text',
      text: 'そのイベントには対応していません...',
    };
  }

  // メッセージタイプに応じて対応するHandler関数を取得
  const handler = getEventHandler(event);

  // Handler関数を呼び出して返信するメッセージを取得し、関数の呼び出し元（bot.jsのindex）にreturnする
  return handler(event, appContext);
};
