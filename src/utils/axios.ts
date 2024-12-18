import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: 'https://api.weatherbit.io/v2.0',
  // headers: {
  //   'Accept-Language': window.localStorage.getItem('i18nextLng') === 'en' ? 'en-US' : 'fa-Ir',
  // },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  bonus: '/bonus/',
  status: '/status/',
  user: '/user',
  stats: '/stats/',
  task: '/task/',
  leaderBoard: '/leaderboard/',
  referrals: '/referrals/',
  tg_auth: `/tg_auth/`,
  todayTournament: '/tournament/',
  amIWinner: '/tournament/am_i_winner/',
  tournamentLeaderBoard: '/tournament/leaderboard/',
  transferOnChain: `/tournament/transfer_onchain/`,
  updateWallet: `/update_wallet/`,
};
