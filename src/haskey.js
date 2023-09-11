// オブジェクトに対応するキーがあるかを判定する関数
export const hasKey = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
