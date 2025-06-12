import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /* プレフィックス NEXT_PUBLIC_ or SECRET_ */
  env: {
    // SECRET API KEY (backendのみ)
    SECRET_KEY_GOOGLE: "xx",
    SECRET_GOOGLE_CLIENT_ID: "xx",
    SECRET_GOOGLE_CLIENT_SECRET: "xx"
  },

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
            value: "http://localhost:3000"
          },
          // 許可するメソッド
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PATCH,DELETE,OPTIONS"
          },
          // 許可するリクエストヘッダ
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
