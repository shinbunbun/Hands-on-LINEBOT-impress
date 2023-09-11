import { log } from '../log.js';

// 退出イベントが飛んできた時
export const leaveHandler = () => {
  // ログに出力
  log('botがグループから退出しました');
};
