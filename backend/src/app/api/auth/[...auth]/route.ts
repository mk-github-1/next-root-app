// セッション管理だけどセキュアクッキーを使う

import { Auth } from "@auth/core";
import NextAuth from "next-auth";
import Google from "@auth/core/providers/google";

import { authConfig } from "@/settings/authjs/authConfig";
import { NextRequest } from "next/server";

/* 認証順序案
・ログインボタンを押す	 フロントエンド	ユーザーがGoogleログインを開始する
・/api/auth/signin/google にアクセス	 フロント → バックエンド	backendがGoogle認証にリダイレクト
・Googleアカウントで認証	 ブラウザ上のGoogle	認証処理自体はユーザーとGoogleが直接やりとり
・/api/auth/callback/google に戻る	 Google → バックエンド	backendが認証トークンを受け取りセッションを生成
・frontendにリダイレクト + Cookie発行	 バックエンド	セキュアCookieでセッションを保持
・frontendが /api/session を叩く	 フロント → バックエンド	Cookieをもとにログイン状態を確認・表示
*/

export async function GET(request: NextRequest): Promise<Response> {
  return await Auth(request, authConfig);
}

export async function POST(request: NextRequest): Promise<Response> {
  return await Auth(request, authConfig);
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google]
});

// backend/api/session.ts
/*
import { getServerSession } from "@auth/core"
import authConfig from "./authConfig"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authConfig)
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" })
  }
  return res.json(session)
}
 */

/*
// frontend/pages/login.tsx
export default Login = () => {
  const handleLogin = () => {
    window.location.href = "https://backend.example.com/api/auth/signin/google"
  }

  return (
    <div>
      <button onClick={handleLogin}>Googleでログイン</button>
    </div>
  )
}
 */

// frontend/hooks/useSession.ts
/*
export const useSession = () => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    fetch("https://backend.example.com/api/session", {
      credentials: "include", // Cookieを送信
    })
      .then((res) => res.json())
      .then(setSession)
  }, [])

  return session
}
 */
