# timezone-testrunner-playground

タイムゾーンまわりの日付処理の検証／Node.js 標準テストランナーの素振り

CodeSandbox（タイムゾーンが違う）上で実行して気づいたいくつかの Hydration Error を修正

### ESModule

- [esbuild-kit/tsx: ⚡️ TypeScript Execute (tsx): Node.js enhanced with esbuild to run TypeScript & ESM](https://github.com/esbuild-kit/tsx)
- [サーバーサイドで TypeScript の ESM（ES Modules）プロジェクトを esbuild で bundle する](https://zenn.dev/junkor/articles/2bcd22ca08d21d)
  - tsx を使ってる
- [Native ESM + TypeScript 拡張子問題: 歯にものが挟まったようなスッキリしない書き流し](https://zenn.dev/qnighy/articles/19603f11d5f264)
- [ESModule かつ TypeScript で Node.js の環境構築を行う - Qiita](https://qiita.com/2san/items/8d493f89aaf455ab9af1)
- [2022 年度の TypeScript 製 ES Modules レシピ - Qiita](https://qiita.com/masato_makino/items/8451bf4e62ad27823af1)
  - fake
- [Next.js with ESM](https://zenn.dev/okunokentaro/scraps/258ca0269c51c3#comment-cde3955fcd6b58)

### node:test

- [nodejs/node-core-test: Node 18's node:test, as an npm package](https://github.com/nodejs/node-core-test)
- [Configuration – CodeSandbox](https://codesandbox.io/docs/learn/sandboxes/configuration)
- [Node.js の assert の小話 - from scratch](https://yosuke-furukawa.hatenablog.com/entry/2021/12/27/182526)
- [play-ts-using/src/index.ts at main · mizchi/play-ts-using · GitHub](https://github.com/mizchi/play-ts-using/blob/main/src/index.ts)
  - テスト例
- [特定のディレクトリ内の TypeScript ファイルの Node 組み込みテストランナーを実行するには？· 問題 #3902 · nodejs/help](https://github.com/nodejs/help/issues/3902)
  - 例：[node-test-with-typescript/ at main · scottwillmoore/node-test-with-typescript · GitHub](https://github.com/scottwillmoore/node-test-with-typescript/tree/main)

### pnpm

- [Corepack を使用する方法【npm】【yarn】【pnpm】 - Qiita](https://qiita.com/P-man_Brown/items/a75a042813f9a20768fd)
- [Corepack の使用 - インストール | pnpm](https://pnpm.io/ja/installation#corepack%E3%81%AE%E4%BD%BF%E7%94%A8)
