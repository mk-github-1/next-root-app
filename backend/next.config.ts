import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        // 対象APIのパスパターン
        source: "/api/:path*",
        headers: [
          // CORSを許可するオリジン
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000",
          },
          // 許可するメソッド
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PATCH,DELETE,OPTIONS",
          },
          // 許可するリクエストヘッダ
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
