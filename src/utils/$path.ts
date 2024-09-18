import type { Query as Query_1xgx4wc } from '../app/calendar/@modal/(.)schedule/new/page';
import type { Query as Query_qyswzp } from '../app/calendar/schedule/new/page';

const buildSuffix = (url?: {query?: Record<string, string>, hash?: string}) => {
  const query = url?.query;
  const hash = url?.hash;
  if (!query && !hash) return '';
  const search = query ? `?${new URLSearchParams(query)}` : '';
  return `${search}${hash ? `#${hash}` : ''}`;
};

export const pagesPath = {
  "calendar": {
    "@modal": {
      "___schedule": {
        _scheduleId: (scheduleId: string | number) => ({
          "edit": {
            $url: (url?: { hash?: string }) => ({ pathname: '/calendar/@modal/(.)schedule/[scheduleId]/edit' as const, query: { scheduleId }, hash: url?.hash, path: `/calendar/@modal/(.)schedule/${scheduleId}/edit${buildSuffix(url)}` })
          },
          $url: (url?: { hash?: string }) => ({ pathname: '/calendar/@modal/(.)schedule/[scheduleId]' as const, query: { scheduleId }, hash: url?.hash, path: `/calendar/@modal/(.)schedule/${scheduleId}${buildSuffix(url)}` })
        }),
        "new": {
          $url: (url: { query: Query_1xgx4wc, hash?: string }) => ({ pathname: '/calendar/@modal/(.)schedule/new' as const, query: url.query, hash: url.hash, path: `/calendar/@modal/(.)schedule/new${buildSuffix(url)}` })
        }
      }
    },
    "schedule": {
      _scheduleId: (scheduleId: string | number) => ({
        "edit": {
          $url: (url?: { hash?: string }) => ({ pathname: '/calendar/schedule/[scheduleId]/edit' as const, query: { scheduleId }, hash: url?.hash, path: `/calendar/schedule/${scheduleId}/edit${buildSuffix(url)}` })
        },
        $url: (url?: { hash?: string }) => ({ pathname: '/calendar/schedule/[scheduleId]' as const, query: { scheduleId }, hash: url?.hash, path: `/calendar/schedule/${scheduleId}${buildSuffix(url)}` })
      }),
      "new": {
        $url: (url: { query: Query_qyswzp, hash?: string }) => ({ pathname: '/calendar/schedule/new' as const, query: url.query, hash: url.hash, path: `/calendar/schedule/new${buildSuffix(url)}` })
      }
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/calendar' as const, hash: url?.hash, path: `/calendar${buildSuffix(url)}` })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash, path: `/${buildSuffix(url)}` })
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  icons: {
    arrow_left_svg: '/icons/arrow-left.svg',
    arrow_right_svg: '/icons/arrow-right.svg',
    check_svg: '/icons/check.svg',
    close_svg: '/icons/close.svg',
    hamburger_svg: '/icons/hamburger.svg',
    menu_svg: '/icons/menu.svg',
    minus_svg: '/icons/minus.svg',
    search_svg: '/icons/search.svg',
    square_pen_svg: '/icons/square-pen.svg',
    trash_2_svg: '/icons/trash-2.svg',
    user_svg: '/icons/user.svg'
  },
  next_svg: '/next.svg',
  vercel_svg: '/vercel.svg'
} as const;

export type StaticPath = typeof staticPath;
