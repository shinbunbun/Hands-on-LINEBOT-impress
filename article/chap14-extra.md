# AWSのCredential作成方法について

ページ数の関係で書籍に記載できなかった、AWSのCredential作成方法について解説します。

1.AWSマネジメントコンソール（<https://ap-northeast-1.console.aws.amazon.com/console/home>）にアクセスします

2.検索バーに「IAM」と入力し、「IAM」を選択します

![検索](image/1.png)

3.左側のメニューから「ユーザー」を選択します

![ユーザー](image/2.png)

4.「ユーザーを追加」を選択します

![ユーザーを追加](image/3.png)

5.ユーザー名を入力して「アクセスキー - プログラムによるアクセス」にチェックをいれ、「次のステップ: アクセス権限」をクリックします

![ユーザーを追加](image/4.png)

6.「既存のポリシーを直接アタッチ」を選択します

![既存のポリシーを直接アタッチ](image/5.png)

7.「AdministratorAccess」を選択して、「次のステップ: タグ」をクリックします

![AdministratorAccessをアタッチ](image/6.png)

8.「次のステップ: 確認」を選択します

![次のステップ: 確認](image/7.png)

9.「ユーザーの作成」を選択します

![ユーザーの作成](image/8.png)

10.アクセスキーIDとシークレットアクセスキーが表示されるので、どこかにメモしておきます

![ユーザー](image/9.png)

11.<https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/getting-started-install.html>
html を参考にaws-cli を導入します

12.ローカルで`aws configure`コマンドを実行し、先ほどメモしたCredential情報を入力します
