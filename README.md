# next-root-app

6/12 22:30 next.config.ts の設定修正中済み、どの環境でも動作できることを確認

Next.js を next-root-app フォルダ内に frontend、backend ごとに作成したサンプル

## 利用方法

・Windows で NVM をインストール

https://github.com/coreybutler/nvm-windows/releases

nvm-setup.zip

---

・PowerShell を実行し、NVM で Node.js 22 をインストール、選択

**(NVM コマンドで Node.js をインストール)**

```PowerShell
nvm install 22
nvm use
```

---

・Visual Studio Code を実行し、next-root-app フォルダを開いた後、ターミナルでフォルダ移動し、npm install をする

**(frontend に npm install)**

```PowerShell
cd frontend
npm install
```

**(backend に npm install)**

```PowerShell
cd ..
cd backend
npm install
```

---

・その後、Visual Studio Code のデバッグボタンで、

```
Next.js: debug compounds
```

を選択して実行すると、デバッグ実行をすることができます。
※その他では frontend、backend が同時起動できなく、ブラウザも自動で開かないので注意

・dev 実行時、画面遷移の際に初回画面ロード時に若干時間がかかります。(約 5 秒以内ぐらい)

## Web 公開しているほうはこちらにあります

・Web 記事
https://zenn.dev/mofuweb/articles/nextjs-typescript-guide-1-1

・GitHub
https://github.com/mofuweb1/next-root-app

・StackBlitz
https://stackblitz.com/edit/stackblitz-starters-joyxqrm2
