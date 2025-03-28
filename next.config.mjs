/** @type {import('next').NextConfig} */
const nextConfig = {
    // ... otras configuraciones ...
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          pathname: '/dfdzthwgu/image/upload/**',
        },
      ],
    },
  };
  
  export default nextConfig;