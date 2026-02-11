import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: '/:path((?!api|_next).)*',
          destination: '/api/accept-md/:path*',
          has: [
            {
              type: 'header',
              key: 'accept',
              value: '(.*)text/markdown(.*)',
            },
          ],
        },
      ],
    };
  },
};

export default nextConfig;
