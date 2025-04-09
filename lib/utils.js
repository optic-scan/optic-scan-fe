import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const fetchWithRefresh = async (url, options = {}) => {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${localStorage.getItem('client_access_id')}`,
    },
  });

  if (res.status === 403) {
    const refreshRes = await fetch(
      `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      localStorage.setItem('accessToken', data.accessToken);

      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${data.accessToken}`,
        },
      });
    } else {
      throw new Error('Session expired');
    }
  }

  return res;
};
