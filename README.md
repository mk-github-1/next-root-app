# next-root-app

Next.js を frontend + backend のサブプロジェクトにまとめたサンプル

## 利用方法

・Windows で NVM をインストール

https://github.com/coreybutler/nvm-windows/releases

nvm-setup.zip

---

・PowerShell を実行し、NVM で Node.js 22 をインストール、選択

**(NVM コマンドで Node.js をインストール)**

```PowerShell
nvm insall 22
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
cd backendend
npm install
```

---

・その後、Visual Studio Code のデバッグボタンで、Next.js: debug compounds を選択して実行すると、デバッグ実行することができます。
