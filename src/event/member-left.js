import { log } from '../log.js';

// メンバー退出イベントが飛んできた時
export const memberLeftHandler = (event) => {
  // ログに出力
  log(`ユーザーが退出しました...\n退出したユーザー: ${event.left.members[0].userId}`);
};
