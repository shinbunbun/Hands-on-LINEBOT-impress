import { getContent } from '../../save-file.js';

// オーディオを処理する関数
export const audioEvent = async (event, appContext) => {
  // 返信するメッセージを作成
  const message = {
    type: 'text',
    text: 'オーディオを受け取りました！',
  };
  // ファイルを保存する
  const stream = await getContent(appContext.lineClient, event.message.id);
  await appContext.contentFileDownloader({
    stream, fileName: `${event.message.id}.mp3`, appContext, contentType: 'audio/mpeg',
  });
  // 関数の呼び出し元（index）に返信するメッセージを返す
  return message;
};
