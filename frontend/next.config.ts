import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /* プレフィックス NEXT_PUBLIC_ or SECRET_ */
  env: {
    // API URL
    NEXT_PUBLIC_API_URL: "http://localhost:5000/api"

    // SECRET API KEY (backendのみ)
    // SECRET_API_KEY: "xx",
  }
};

export default nextConfig;
