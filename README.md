# timezone-testrunner-playground

タイムゾーンまわりの日付処理の検証／Node.js 標準テストランナーの素振り

CodeSandbox（タイムゾーンが違う）上で実行して気づいたいくつかの Hydration Error を修正

### ESModule

- [0から調べる--moduleResolution bundler](https://zenn.dev/akadori/scraps/412a5f8fc6ea63)
- [サーバーサイドで TypeScript の ESM（ES Modules）プロジェクトを esbuild で bundle する](https://zenn.dev/junkor/articles/2bcd22ca08d21d)
  - tsx を使ってる
- [まだ ts-node 使ってるの？tsx の紹介 - Qiita](https://qiita.com/ssssota/items/115a906e960bcfabb46b)
- [esbuild-kit/tsx: ⚡️ TypeScript Execute (tsx): Node.js enhanced with esbuild to run TypeScript & ESM](https://github.com/esbuild-kit/tsx)
- [0 から調べる--moduleResolution bundler](https://zenn.dev/akadori/scraps/412a5f8fc6ea63)
- [\*.ts 拡張子をそのまま書く方針が使えるようになった - Native ESM + TypeScript 拡張子問題: 歯にものが挟まったようなスッキリしない書き流し](https://zenn.dev/qnighy/articles/19603f11d5f264#*.ts-%E6%8B%A1%E5%BC%B5%E5%AD%90%E3%82%92%E3%81%9D%E3%81%AE%E3%81%BE%E3%81%BE%E6%9B%B8%E3%81%8F%E6%96%B9%E9%87%9D%E3%81%8C%E4%BD%BF%E3%81%88%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%AA%E3%81%A3%E3%81%9F)
- [ESModule かつ TypeScript で Node.js の環境構築を行う - Qiita](https://qiita.com/2san/items/8d493f89aaf455ab9af1)
- [2022 年度の TypeScript 製 ES Modules レシピ - Qiita](https://qiita.com/masato_makino/items/8451bf4e62ad27823af1)
  - fake
- [Next.js with ESM](https://zenn.dev/okunokentaro/scraps/258ca0269c51c3#comment-cde3955fcd6b58)

### node:test

- [特定のディレクトリ内の TypeScript ファイルの Node 組み込みテストランナーを実行するには？· 問題 #3902 · nodejs/help](https://github.com/nodejs/help/issues/3902)
  - 例：[node-test-with-typescript/ at main · scottwillmoore/node-test-with-typescript · GitHub](https://github.com/scottwillmoore/node-test-with-typescript/tree/main)
- [Node.js の標準 API にテストランナーが追加された](https://azukiazusa.dev/blog/node-js-api/)
- [nodejs/node-core-test: Node 18's node:test, as an npm package](https://github.com/nodejs/node-core-test)
  - polyfill
- [Node.js の assert の小話 - from scratch](https://yosuke-furukawa.hatenablog.com/entry/2021/12/27/182526)
- [play-ts-using/src/index.ts at main · mizchi/play-ts-using · GitHub](https://github.com/mizchi/play-ts-using/blob/main/src/index.ts)
  - テスト例

### pnpm

- [Node.js バージョン管理に fnm を利用する - くらげになりたい。](https://www.memory-lovers.blog/entry/2022/10/30/100000)
- [Corepack を使用する方法【npm】【yarn】【pnpm】 - Qiita](https://qiita.com/P-man_Brown/items/a75a042813f9a20768fd)
- [Corepack の使用 - インストール | pnpm](https://pnpm.io/ja/installation#corepack%E3%81%AE%E4%BD%BF%E7%94%A8)
