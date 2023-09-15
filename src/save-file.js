import fs from 'fs';

// ローカルにファイルを保存
const saveFileToLocal = (stream, downloadPath) => new Promise((resolve, reject) => {
  const writable = fs.createWriteStream(downloadPath);
  stream.pipe(writable);
  stream.on('end', () => resolve(downloadPath));
  stream.on('error', reject);
});

// LINE SDKのClientのgetMessageContentメソッドを呼び出してファイルを取得
export const getContent = (client, messageId) => client
  .getMessageContent(messageId);

// ファイルをローカルのダウンロードディレクトリに保存
export const saveContentFileToDownloadDir = ({ stream, fileName }) => saveFileToLocal(stream, `./download/${fileName}`);
