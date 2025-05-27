import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /* プレフィックス NEXT_PUBLIC_ or SECRET_ */
  env: {
    // APU URL
    NEXT_PUBLIC_API_URL: "http://localhost:5000/api",

    // SECRET API KEY
    SECRET_API_KEY: "xxxx-xxxx",
  },
};

export default nextConfig;
