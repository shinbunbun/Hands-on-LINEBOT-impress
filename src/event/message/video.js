import { getContent } from '../../save-file.js';

// ビデオを処理する関数
export const videoEvent = async (event, appContext) => {
  // 返信するメッセージを作成
  const message = {
    type: 'text',
    text: 'ビデオを受け取りました！',
  };
  // ファイルを保存する
  const stream = await getContent(appContext.lineClient, event.message.id);

  await appContext.contentFileDownloader({
    stream, fileName: `${event.message.id}.mp4`, appContext, ContentType: 'video/mp4',
  });

  // 関数の呼び出し元（index）に返信するメッセージを返す
  return message;
};
