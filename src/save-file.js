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

// バケット名を取得
const { S3_BUCKET_NAME } = process.env;

// S3にファイルをアップロード
const saveFileToS3WithParam = (param, s3) => s3.upload(param).promise();

// ファイルをS3のダウンロードディレクトリにアップロード
export const saveContentFileToS3DownloadDir = ({
  stream, fileName, appContext, contentType,
}) => {
  const param = {
    Body: stream,
    Bucket: S3_BUCKET_NAME,
    Key: `download/${fileName}`,
    ContentType: contentType,
    ACL: 'private',
  };

  return saveFileToS3WithParam(param, appContext.s3Client);
};
