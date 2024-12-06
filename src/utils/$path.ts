import type { Query as Query_14t6ck9 } from '../app/[facilityId]/calendar/@modal/(.)schedule/new/page';
import type { Query as Query_fbo8o } from '../app/[facilityId]/calendar/schedule/new/page';

const buildSuffix = (url?: {query?: Record<string, string>, hash?: string}) => {
  const query = url?.query;
  const hash = url?.hash;
  if (!query && !hash) return '';
  const search = query ? `?${new URLSearchParams(query)}` : '';
  return `${search}${hash ? `#${hash}` : ''}`;
};

export const pagesPath = {
  _facilityId: (facilityId: string | number) => ({
    "calendar": {
      "@modal": {
        "___schedule": {
          _scheduleId: (scheduleId: string | number) => ({
            "edit": {
              $url: (url?: { hash?: string }) => ({ pathname: '/[facilityId]/calendar/@modal/(.)schedule/[scheduleId]/edit' as const, query: { facilityId, scheduleId }, hash: url?.hash, path: `/${facilityId}/calendar/@modal/(.)schedule/${scheduleId}/edit${buildSuffix(url)}` })
            },
            $url: (url?: { hash?: string }) => ({ pathname: '/[facilityId]/calendar/@modal/(.)schedule/[scheduleId]' as const, query: { facilityId, scheduleId }, hash: url?.hash, path: `/${facilityId}/calendar/@modal/(.)schedule/${scheduleId}${buildSuffix(url)}` })
          }),
          "new": {
            $url: (url: { query: Query_14t6ck9, hash?: string }) => ({ pathname: '/[facilityId]/calendar/@modal/(.)schedule/new' as const, query: { facilityId, ...url.query }, hash: url.hash, path: `/${facilityId}/calendar/@modal/(.)schedule/new${buildSuffix(url)}` })
          }
        }
      },
      "schedule": {
        _scheduleId: (scheduleId: string | number) => ({
          "edit": {
            $url: (url?: { hash?: string }) => ({ pathname: '/[facilityId]/calendar/schedule/[scheduleId]/edit' as const, query: { facilityId, scheduleId }, hash: url?.hash, path: `/${facilityId}/calendar/schedule/${scheduleId}/edit${buildSuffix(url)}` })
          },
          $url: (url?: { hash?: string }) => ({ pathname: '/[facilityId]/calendar/schedule/[scheduleId]' as const, query: { facilityId, scheduleId }, hash: url?.hash, path: `/${facilityId}/calendar/schedule/${scheduleId}${buildSuffix(url)}` })
        }),
        "new": {
          $url: (url: { query: Query_fbo8o, hash?: string }) => ({ pathname: '/[facilityId]/calendar/schedule/new' as const, query: { facilityId, ...url.query }, hash: url.hash, path: `/${facilityId}/calendar/schedule/new${buildSuffix(url)}` })
        }
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/[facilityId]/calendar' as const, query: { facilityId }, hash: url?.hash, path: `/${facilityId}/calendar${buildSuffix(url)}` })
    },
    "users": {
      _userId: (userId: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/[facilityId]/users/[userId]' as const, query: { facilityId, userId }, hash: url?.hash, path: `/${facilityId}/users/${userId}${buildSuffix(url)}` })
      }),
      $url: (url?: { hash?: string }) => ({ pathname: '/[facilityId]/users' as const, query: { facilityId }, hash: url?.hash, path: `/${facilityId}/users${buildSuffix(url)}` })
    }
  }),
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash, path: `/${buildSuffix(url)}` })
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  icons: {
    arrow_bottom_svg: '/icons/arrow-bottom.svg',
    arrow_left_svg: '/icons/arrow-left.svg',
    arrow_right_svg: '/icons/arrow-right.svg',
    arrow_top_svg: '/icons/arrow-top.svg',
    bar_chart_4_svg: '/icons/bar-chart-4.svg',
    calendar_svg: '/icons/calendar.svg',
    check_svg: '/icons/check.svg',
    close_svg: '/icons/close.svg',
    contact_round_svg: '/icons/contact-round.svg',
    eye_closed_svg: '/icons/eye-closed.svg',
    eye_opened_svg: '/icons/eye-opened.svg',
    hamburger_svg: '/icons/hamburger.svg',
    menu_svg: '/icons/menu.svg',
    minus_svg: '/icons/minus.svg',
    search_svg: '/icons/search.svg',
    square_pen_svg: '/icons/square-pen.svg',
    timer_svg: '/icons/timer.svg',
    trash_2_svg: '/icons/trash-2.svg',
    user_svg: '/icons/user.svg',
    users_svg: '/icons/users.svg'
  },
  next_svg: '/next.svg',
  vercel_svg: '/vercel.svg'
} as const;

export type StaticPath = typeof staticPath;
