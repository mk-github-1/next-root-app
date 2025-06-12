import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // GitHub公開用に記載、通常はここのenv設定を削除して.envファイルに書きます。
  env: {
    NEXT_PUBLIC_API_URL: "http://localhost:5000/api"
  }
};

export default nextConfig;
