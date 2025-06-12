// Auth.js 設定
// セッション管理だけどセキュアクッキーを使う

import { type AuthConfig } from "@auth/core";
import Google from "@auth/core/providers/google";

export const authConfig: AuthConfig = {
  providers: [
    Google({
      clientId: process.env.SECRET_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.SECRET_GOOGLE_CLIENT_SECRET ?? ""
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7
  },
  cookies: {
    sessionToken: {
      name: "__Secure-authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true
      }
    }
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    }
  },
  trustHost: true
};
