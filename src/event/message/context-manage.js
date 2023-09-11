import { error } from '../../log.js';
import { get } from '../../request.js';
import { createData, deleteData, readData } from '../../crud.js';
import { hasKey } from '../../haskey.js';

const contextMap = {
  memoMode: async (event, appContext) => {
    await createData(event.source.userId, 'memo', event.message.text, appContext);

    await deleteData(event.source.userId, 'context', appContext);

    return {
      type: 'text',
      text: `"${event.message.text}"というメッセージをdbに追加しました`,
    };
  },
  bookSearchMode1: async (event, appContext) => {
    try {
      // ユーザーのコンテキストを削除
      await deleteData(event.source.userId, 'context', appContext);
      // 環境変数からAPIキーを取得
      const calilAppKey = process.env.CALIL_APP_KEY;
      // ユーザーから送られてきたisbnを取得
      const isbn = event.message.text;
      // 蔵書検索APIを叩いてレスポンスを取得
      let checkAPIResponse = (await get(`https://api.calil.jp/check?appKey=${calilAppKey}&isbn=${isbn}&systemid=Univ_Aizu&callback=no`)).data;
      // 蔵書検索APIのレスポンスからsessionを取得
      const { session } = checkAPIResponse;
      // もしcontinueが1だったら（1回で蔵書検索が完了せず、ポーリングする必要がある場合）
      if (checkAPIResponse.continue === 1) {
        // 蔵書データが取得できるまで無限ループして、2秒おきに蔵書検索APIを叩く
        // eslint-disable-next-line no-constant-condition
        while (true) {
          // 2秒まつ
          // eslint-disable-next-line no-await-in-loop
          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });
          // 蔵書検索APIを叩く
          // eslint-disable-next-line no-await-in-loop
          checkAPIResponse = (await get(`https://api.calil.jp/check?appKey=${calilAppKey}&session=${session}&callback=no`)).data;
          // continueが0になったらループを抜ける
          if (checkAPIResponse.continue === 0) break;
        }
      }

      // 蔵書検索APIのレスポンスから本の状態を取得
      const bookStatus = checkAPIResponse.books[isbn].Univ_Aizu.libkey['４大'];
      // 蔵書検索APIのレスポンスから予約URLを取得
      // 返ってきたURLにそのままアクセスすると証明書エラーになってしまうため、URL中の'libeopsv'を'libopsv'に置換する
      const bookReserveUrl = checkAPIResponse.books[isbn].Univ_Aizu.reserveurl.replace('libeopsv', 'libopsv');
      // カリールのリンクを作成
      const calilUrl = `https://calil.jp/book/${isbn}`;

      // メッセージを返信
      return {
        type: 'text',
        text: `本の状態: ${bookStatus}\n予約ページ: ${bookReserveUrl}\nカリール: ${calilUrl}`,
      };
    } catch (e) {
      error(e);
      return {
        type: 'text',
        text: '蔵書検索でエラーが発生しました。',
      };
    }
  },
  bookSearchMode2: async (event, appContext) => {
    try {
      // ユーザーのコンテキストを削除
      await deleteData(event.source.userId, 'context', appContext);
      // 環境変数からAPIキーを取得
      const calilAppKey = process.env.CALIL_APP_KEY;
      // ユーザーから送られてきたisbnを取得
      const isbn = event.message.text;
      // 蔵書検索APIを叩いてレスポンスを取得
      let checkAPIResponse = (await get(`https://api.calil.jp/check?appKey=${calilAppKey}&isbn=${isbn}&systemid=Univ_Aizu&callback=no`)).data;
      // 蔵書検索APIのレスポンスからsessionを取得
      const { session } = checkAPIResponse;
      // もしcontinueが1だったら（1回で蔵書検索が完了せず、ポーリングする必要がある場合）
      if (checkAPIResponse.continue === 1) {
        // 蔵書データが取得できるまで無限ループして、2秒おきに蔵書検索APIを叩く
        // eslint-disable-next-line no-constant-condition
        while (true) {
          // 2秒まつ
          // eslint-disable-next-line no-await-in-loop
          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });
          // 蔵書検索APIを叩く
          // eslint-disable-next-line no-await-in-loop
          checkAPIResponse = (await get(`https://api.calil.jp/check?appKey=${calilAppKey}&session=${session}&callback=no`)).data;
          // continueが0になったらループを抜ける
          if (checkAPIResponse.continue === 0) break;
        }
      }

      // 蔵書検索APIのレスポンスから本の状態を取得
      const bookStatus = checkAPIResponse.books[isbn].Univ_Aizu.libkey['４大'];
      // 蔵書検索APIのレスポンスから予約URLを取得
      // 返ってきたURLにそのままアクセスすると証明書エラーになってしまうため、URL中の'libeopsv'を'libopsv'に置換する
      const bookReserveUrl = checkAPIResponse.books[isbn].Univ_Aizu.reserveurl.replace('libeopsv', 'libopsv');
      // カリールのリンクを作成
      const calilUrl = `https://calil.jp/book/${isbn}`;
      const openBDResponse = (await get(`https://api.openbd.jp/v1/get?isbn=${isbn}`)).data;
      const bookInfo = openBDResponse[0].summary;

      // メッセージを返信
      return {
        type: 'flex',
        altText: 'Flex Message',
        contents: {
          type: 'bubble',
          header: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: bookStatus,
                color: '#FFFFFF',
                weight: 'bold',
                size: '3xl',
              },
            ],
          },
          hero: {
            type: 'image',
            url: bookInfo.cover,
            size: 'xl',
            margin: 'none',
          },
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: bookInfo.title,
                    size: 'md',
                    weight: 'bold',
                    align: 'center',
                    wrap: true,
                  },
                  {
                    type: 'separator',
                    margin: 'md',
                  },
                  {
                    type: 'text',
                    text: '【著者情報】',
                    size: 'sm',
                    margin: 'md',
                  },
                  {
                    type: 'text',
                    text: bookInfo.author,
                    align: 'start',
                    size: 'sm',
                    wrap: true,
                    margin: 'none',
                  },
                  {
                    type: 'text',
                    text: '【出版社】',
                    size: 'sm',
                    margin: 'md',
                  },
                  {
                    type: 'text',
                    text: bookInfo.publisher,
                    align: 'start',
                    size: 'sm',
                    wrap: true,
                    offsetBottom: 'none',
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'none',
              },
              {
                type: 'separator',
                margin: 'none',
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'button',
                    action: {
                      type: 'uri',
                      label: '予約ページ',
                      uri: bookReserveUrl,
                    },
                    style: 'primary',
                    offsetBottom: '10px',
                    color: '#3cb371',
                  },
                  {
                    type: 'button',
                    action: {
                      type: 'uri',
                      label: '本の情報(カリール)',
                      uri: calilUrl,
                    },
                    style: 'primary',
                    color: '#3cb371',
                  },
                ],
                paddingTop: 'xxl',
              },
            ],
          },
          styles: {
            header: {
              // 貸出中かそうじゃないかでヘッダーの背景色が変わるようにしています
              backgroundColor: bookStatus === '貸出中' ? '#ff0000' : '#008000',
            },
            hero: {
              separator: false,
            },
          },
        },
      };
    } catch (e) {
      error(e);
      return {
        type: 'text',
        text: '蔵書検索でエラーが発生しました。',
      };
    }
  },
};

export const contextManage = async (event, appContext) => {
  let contextData = (await readData(event.source.userId, 'context', appContext)).Items[0];
  if (!contextData) {
    return undefined;
  }
  contextData = contextData.Data;

  if (hasKey(contextMap, contextData)) {
    return contextMap[contextData](event, appContext);
  }

  return undefined;
};
