import axios from 'axios';

// axiosでgetリクエストを送る
export const get = (url) => axios.get(url);
