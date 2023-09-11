import { log } from '../log.js';

// フォロー解除イベントが飛んできた時
export const unfollowHandler = (event) => {
  // ログを出力
  log(`unfollowされました...\nuserId: ${event.source.userId}`);
};
