"use client";

/**************************************************
 * Sidebar component (共通)
 * ※Sidebar の状態管理付き
 *
 **************************************************/
import { JSX } from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import { useSettingSidebar } from "@/hooks/common/useSettingSidebar";
// import { setRenderTimerStart } from "@/hooks/common/useRenderTimer";

export default function Sidebar(): JSX.Element {
  /**************************************************
   * 状態 (State)、カスタムフック、共通関数
   *
   **************************************************/

  // const router = useRouter();
  const { isOpen, handleToggleOpen } = useSettingSidebar();

  /**************************************************
   * 関数・イベント ※Propsで渡す関数名はhandleから始める
   *
   **************************************************/

  // 描画時間 計測用
  // router.push("/users");
  // router.push("/ui-sample/modal-form");
  /*
  const handleClick = (): void => {
    setRenderTimerStart();
    router.push("/users");
  };
  */

  /**************************************************
   * return JSX.Element
   *
   **************************************************/
  return (
    <Box
      sx={{
        position: "relative",
        width: isOpen ? 240 : 80,
        paddingTop: isOpen ? "40px" : "20px",
        paddingLeft: isOpen ? "20px" : 0,
        backgroundColor: "ghostwhite",
        borderRight: "1px solid lightgray",
        overflowY: "scroll"
      }}>
      <IconButton
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          // ← 最前面
          zIndex: 10,
          backgroundColor: "white",
          boxShadow: 1,
          "&:hover": {
            backgroundColor: "lightgray"
          }
        }}
        onClick={handleToggleOpen}>
        {isOpen ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
      </IconButton>

      {isOpen && (
        <>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
          <h3>3. TypeScript の基本について</h3>
          <ul>
            <li>
              <Link href="/program-code-sample/program-code1">プログラムコード1</Link>
            </li>
            <li>
              <Link href="/program-code-sample/program-code2">プログラムコード2</Link>
            </li>
            <li>
              <Link href="/program-code-sample/program-code3">プログラムコード3</Link>
            </li>
            <li>
              <Link href="/program-code-sample/program-code4">プログラムコード4</Link>
            </li>
            <li>
              <Link href="/program-code-sample/program-code5">プログラムコード5</Link>
            </li>
          </ul>
          <h3>4. Web アプリの概念説明</h3>
          <ul>
            <li>
              <Link href="/json-convert-sample/json-convert">JSON相互変換</Link>
            </li>
          </ul>
          <h3>5. Next.js で利用する React フック</h3>
          <ul>
            <li>
              <Link href="/props-hook-sample/props">Props</Link>
            </li>
            <li>
              <Link href="/props-hook-sample/usestate">useState</Link>
            </li>
            <li>
              <Link href="/props-hook-sample/useref">useRef</Link>
            </li>
            <li>
              <Link href="/props-hook-sample/useeffect">useEffect</Link>
            </li>
            <li>
              <Link href="/props-hook-sample/memo">memo</Link>
            </li>
            <li>
              <Link href="/props-hook-sample/usecallback">useCallback</Link>
            </li>
            <li>
              <Link href="/props-hook-sample/custom-hook-useapirequest">カスタムフック - useApiRequest</Link>
            </li>
            <li>
              <span style={{ fontSize: "10px" }}>※useSettingSidebar は共通のSidebarで確認のため省略</span>
            </li>
          </ul>
          <h3>6. 共通ユーティリティ関数、共通コンポーネント</h3>
          <ul>
            <li>
              <Link href="/sanitize-sample/sanitize">文字列の無害化 (sanitize)</Link>
            </li>
            <li>
              <span style={{ fontSize: "10px" }}>※共通ユーティリティ関数 ajvValidate、共通コンポーネント ModalContainer、SnackbarContentContainter は8項で確認のため省略</span>
            </li>
          </ul>
          <h3>8. パーツごとのサンプル画面の作成</h3>
          <ul>
            <li>
              <Link href="/ui-sample/web-table">WEBテーブル (AG Grid利用)</Link>
            </li>
            <li>
              <Link href="/ui-sample/modal">モーダル画面の開閉 (MUI利用)</Link>
            </li>
            <li>
              <Link href="/ui-sample/modal-form">モーダル登録画面 (React hook form + AJV利用)</Link>
            </li>
          </ul>
          <h3>9. サンプルアプリの作成</h3>
          <ul>
            <li>
              <Link href="/users">User page</Link>
            </li>
          </ul>
          {/*
          <button onClick={handleClick}>User page(描画時間 確認用)</button>
          <button onClick={handleClick}>Modal form(描画時間 確認用)</button>
          */}
        </>
      )}
    </Box>
  );
}
