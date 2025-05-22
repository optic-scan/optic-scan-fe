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
      `${import.meta.env.VITE_API_URL}/auth/refresh`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      localStorage.setItem('client_access_id', data.accessToken);

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

export const formatDate = (dateString, format = 'day-month-year') => {
  const date = new Date(dateString);

  const optionsMap = {
    day: { day: 'numeric' },
    month: { month: 'short' },
    'month-long': { month: 'long' },
    year: { year: 'numeric' },
    'day-month': { day: 'numeric', month: 'short' },
    'month-year': { month: 'short', year: 'numeric' },
    'day-month-year': { day: 'numeric', month: 'short', year: 'numeric' },
    'day-month-year-long': { day: 'numeric', month: 'long', year: 'numeric' },
  };

  const options = optionsMap[format] || optionsMap['day-month-year'];

  return date.toLocaleDateString('en-GB', options);
};

export function formatDateToYearsMonths(dateString) {
  const examDate = new Date(dateString);
  const today = new Date();

  let years = today.getFullYear() - examDate.getFullYear();
  let months = today.getMonth() - examDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} Years ${months} Month`;
}
