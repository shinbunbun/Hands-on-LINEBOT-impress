// AppContextクラスを作成
export class AppContext {
  constructor({
    lineClient, contentFileDownloader, dynamoDBContext, s3Client,
  }) {
    this.lineClient = lineClient;
    this.contentFileDownloader = contentFileDownloader;
    this.dynamoDBContext = dynamoDBContext;
    this.s3Client = s3Client;
  }
}
