## TypeORM コマンド

**(package.json)**

```json:package.json
{
  "scripts": {
    "typeorm": "typeorm-ts-node-commonjs"
  }
}
```

・DDL 生成 (マイグレーションファイル作成 / 更新)

```PowerShell
npm run typeorm migration:generate -- --dataSource src/data-source.ts --pretty migrations/InitialSchema
```

・マイグレーションファイルの実行 / 再実行

```PowerShell
npm run typeorm migration:run -- --dataSource src/data-source.ts
```

・ロールバック

```PowerShell
npm run typeorm migration:revert -- --dataSource src/data-source.ts
```

・スキーマ適用状況の確認

```PowerShell
npm run typeorm migration:show  -- --dataSource src/data-source.ts
```

※データソースの設定(migrationsTableName)でテーブル名は自由に変更可能らしい
