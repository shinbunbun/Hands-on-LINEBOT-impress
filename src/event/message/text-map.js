// ユーザーのプロフィールを取得する関数
const getUserProfile = (event, client) => client.getProfile(event.source.userId);

// 受け取ったメッセージと返信するメッセージ(を返す関数)をマッピング
export const messageMap = {
  こんにちは: () => ({
    type: 'text',
    text: 'Hello, world',
  }),
  複数メッセージ: () => ([
    {
      type: 'text',
      text: 'Hello, user',
    },
    {
      type: 'text',
      text: 'May I help you?',
    },
  ]),
  クイックリプライ: () => ({
    type: 'text',
    text: 'クイックリプライ（以下のアクションはクイックリプライ専用で、他のメッセージタイプでは使用できません）',
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'camera',
            label: 'カメラを開く',
          },
        },
        {
          type: 'action',
          action: {
            type: 'cameraRoll',
            label: 'カメラロールを開く',
          },
        },
        {
          type: 'action',
          action: {
            type: 'location',
            label: '位置情報画面を開く',
          },
        },
      ],
    },
  }),
  スタンプメッセージ: () => ({
    type: 'sticker',
    packageId: '446',
    stickerId: '1988',
  }),
  画像メッセージ: () => ({
    type: 'image',
    originalContentUrl: 'https://shinbunbun.info/images/photos/7.jpeg',
    previewImageUrl: 'https://shinbunbun.info/images/photos/7.jpeg',
  }),
  音声メッセージ: () => ({
    type: 'audio',
    originalContentUrl:
      'https://github.com/shinbunbun/Hands-on-LINEBOT/blob/master/media/demo.m4a?raw=true',
    duration: 6000,
  }),
  動画メッセージ: () => ({
    type: 'video',
    originalContentUrl: 'https://github.com/shinbunbun/Hands-on-LINEBOT/blob/master/media/demo.mp4?raw=true',
    previewImageUrl: 'https://raw.githubusercontent.com/shinbunbun/Hands-on-LINEBOT/master/media/thumbnail.jpg?raw=true',
  }),
  位置情報メッセージ: () => ({
    type: 'location',
    title: 'my location',
    address: '〒160-0004 東京都新宿区四谷一丁目6番1号',
    latitude: 35.687574,
    longitude: 139.72922,
  }),
  イメージマップメッセージ: () => ([
    {
      type: 'imagemap',
      baseUrl:
        'https://github.com/shinbunbun/Hands-on-LINEBOT/blob/master/media/imagemap.png?raw=true',
      altText: 'This is an imagemap',
      baseSize: {
        width: 1686,
        height: 948,
      },
      actions: [
        {
          type: 'uri',
          area: {
            x: 590,
            y: 179,
            width: 511,
            height: 585,
          },
          linkUri: 'https://shinbunbun.info/about/',
        },
        {
          type: 'message',
          area: {
            x: 0,
            y: 0,
            width: 458,
            height: 948,
          },
          text: 'しんぶんぶん！！！',
        },
        {
          type: 'message',
          area: {
            x: 1230,
            y: 0,
            width: 456,
            height: 948,
          },
          text: 'しんぶんぶん！！！',
        },
      ],
    },
    {
      type: 'text',
      text: '画像の色々なところをタップしてみよう！',
    },
  ]),
  ボタンテンプレート: () => ({
    type: 'template',
    altText: 'ボタンテンプレート',
    template: {
      type: 'buttons',
      thumbnailImageUrl: 'https://shinbunbun.info/images/photos/7.jpeg',
      imageAspectRatio: 'rectangle',
      imageSize: 'cover',
      imageBackgroundColor: '#FFFFFF',
      title: 'ボタンテンプレート',
      text: 'ボタンだお',
      defaultAction: {
        type: 'uri',
        label: 'View detail',
        uri: 'https://shinbunbun.info/images/photos/',
      },
      actions: [
        {
          type: 'postback',
          label: 'ポストバックアクション',
          data: 'button-postback',
        },
        {
          type: 'message',
          label: 'メッセージアクション',
          text: 'button-message',
        },
        {
          type: 'uri',
          label: 'URIアクション',
          uri: 'https://shinbunbun.info/',
        },
        {
          type: 'datetimepicker',
          label: '日時選択アクション',
          data: 'button-date',
          mode: 'datetime',
          initial: '2021-06-01t00:00',
          max: '2022-12-31t23:59',
          min: '2021-06-01t00:00',
        },
      ],
    },
  }),
  確認テンプレート: () => ({
    type: 'template',
    altText: '確認テンプレート',
    template: {
      type: 'confirm',
      text: '確認テンプレート',
      actions: [
        {
          type: 'message',
          label: 'はい',
          text: 'yes',
        },
        {
          type: 'message',
          label: 'いいえ',
          text: 'no',
        },
      ],
    },
  }),
  カルーセルテンプレート: () => ({
    type: 'template',
    altText: 'カルーセルテンプレート',
    template: {
      type: 'carousel',
      columns: [
        {
          thumbnailImageUrl: 'https://shinbunbun.info/images/photos/7.jpeg',
          imageBackgroundColor: '#FFFFFF',
          title: 'タイトル1',
          text: '説明1',
          defaultAction: {
            type: 'uri',
            label: 'View detail',
            uri: 'https://shinbunbun.info/',
          },
          actions: [
            {
              type: 'postback',
              label: 'ポストバック',
              data: 'postback-carousel-1',
            },
            {
              type: 'uri',
              label: 'URIアクション',
              uri: 'https://shinbunbun.info/',
            },
          ],
        },
        {
          thumbnailImageUrl:
            'https://shinbunbun.info/images/photos/10.jpeg',
          imageBackgroundColor: '#FFFFFF',
          title: 'タイトル2',
          text: '説明2',
          defaultAction: {
            type: 'uri',
            label: 'View detail',
            uri: 'https://shinbunbun.info/',
          },
          actions: [
            {
              type: 'postback',
              label: 'ポストバック',
              data: 'postback-carousel-2',
            },
            {
              type: 'uri',
              label: 'URIアクション',
              uri: 'https://shinbunbun.info/',
            },
          ],
        },
      ],
      imageAspectRatio: 'rectangle',
      imageSize: 'cover',
    },
  }),
  画像カルーセルテンプレート: () => ({
    type: 'template',
    altText: '画像カルーセルテンプレート',
    template: {
      type: 'image_carousel',
      columns: [
        {
          imageUrl: 'https://shinbunbun.info/images/photos/4.jpeg',
          action: {
            type: 'postback',
            label: 'ポストバック',
            data: 'image-carousel-1',
          },
        },
        {
          imageUrl: 'https://shinbunbun.info/images/photos/5.jpeg',
          action: {
            type: 'message',
            label: 'メッセージ',
            text: 'いえい',
          },
        },
        {
          imageUrl: 'https://shinbunbun.info/images/photos/7.jpeg',
          action: {
            type: 'uri',
            label: 'URIアクション',
            uri: 'https://shinbunbun.info/',
          },
        },
      ],
    },
  }),
  'Flex Message': () => ({
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
            text: 'Flex Message',
            color: '#FFFFFF',
            weight: 'bold',
          },
        ],
      },
      hero: {
        type: 'image',
        url: 'https://pbs.twimg.com/profile_images/1236928986212478976/wDa51i9T_400x400.jpg',
        size: 'xl',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'しんぶんぶん',
            size: 'xl',
            weight: 'bold',
            align: 'center',
          },
          {
            type: 'text',
            text: '会津大学学部二年',
            align: 'center',
          },
          {
            type: 'separator',
            margin: 'md',
          },
          {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'button',
                action: {
                  type: 'uri',
                  label: 'ホームページ',
                  uri: 'https://shinbunbun.info/',
                },
                style: 'primary',
                offsetBottom: '10px',
              },
              {
                type: 'button',
                action: {
                  type: 'uri',
                  label: 'Twitter',
                  uri: 'https://twitter.com/shinbunbun_',
                },
                style: 'primary',
                color: '#1DA1F2',
              },
            ],
            paddingTop: '10px',
          },
        ],
      },
      styles: {
        header: {
          backgroundColor: '#008282',
        },
      },
    },
  }),
  プロフィール: async (event, appContext) => {
    // ユーザーのプロフィール情報を取得
    const profile = await getUserProfile(event, appContext.lineClient);
    // 返信するメッセージを作成
    return {
      type: 'text',
      text: `あなたの名前: ${profile.displayName}\nユーザーID: ${profile.userId}\nプロフィール画像のURL: ${profile.pictureUrl}\nステータスメッセージ: ${profile.statusMessage}`,
    };
  },
  ここはどこ: (event) => ({
    type: 'text',
    text: `ここは${event.source.type}だよ！`,
  }),
};
