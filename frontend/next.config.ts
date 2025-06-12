import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /* プレフィックス NEXT_PUBLIC_ or SECRET_ */
  env: {
    // この設定はGitHub公開用で優先して選択されます
    // 通常は.envファイルに記載してください (GitHubへのプッシュは除外されます)
    NEXT_PUBLIC_API_URL: "http://localhost:3000/api"
  }
};

export default nextConfig;
