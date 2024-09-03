const buildSuffix = (url?: {query?: Record<string, string>, hash?: string}) => {
  const query = url?.query;
  const hash = url?.hash;
  if (!query && !hash) return '';
  const search = query ? `?${new URLSearchParams(query)}` : '';
  return `${search}${hash ? `#${hash}` : ''}`;
};

export const pagesPath = {
  "calendar": {
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
