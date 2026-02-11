import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          destination: '/api/accept-md?path=:path*',
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
