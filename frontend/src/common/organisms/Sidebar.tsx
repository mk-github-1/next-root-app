import Link from "next/link";

export default function Sidebar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
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
        <li>
          <Link href="/program-code-sample/program-code6">プログラムコード6</Link>
        </li>
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
          <Link href="/props-hook-sample/usecontext">useContext</Link>
        </li>
        <li>
          <Link href="/props-hook-sample/custom-hook">カスタムフック</Link>
        </li>
        <li>
          <Link href="/ui-sample/modal-form">モーダル開閉(MUI利用)</Link>
        </li>
        <li>
          <Link href="/ui-sample/register-form">登録フォーム(React hook form + AJV利用)</Link>
        </li>
        <li>
          <Link href="/ui-sample/web-table">WEBテーブル(AG Grid利用)</Link>
        </li>
        <li>
          <Link href="/users">User page</Link>
        </li>
      </ul>
    </nav>
  );
}
