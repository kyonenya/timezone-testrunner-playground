# timezone-testrunner-playground

タイムゾーンまわりの日付処理の検証／Node.js 標準テストランナーの素振り

### クラサバで時刻がずれる問題

- 結論：dayjs を使ってはいけない
  - そもそも `dayjs("2022-01-01 00:00:00")` からして副作用関数
    - 「Day.js は、デフォルトでは、オブジェクトを生成すると、ローカルタイム扱いになります」
      - [タイムゾーンを意識した Day.js オブジェクトの生成 - Qiita](https://qiita.com/tearoom6/items/252afc24cd3f6edc68a5)
  - `.format()` も副作用関数
    - `.tz().format()` は参照透過。もちろん `toISOString()` も
  - もし dayjs を使うなら `dayjs('ISODateString').tz().format()` と `dayjs.tz('withoutTimezone').toISOString()` 以外使ってはいけない
    - しかしこの二つの処理では `.tz()` の意味が別だろ？ ~~無理やりメソッドチェーンにするからこんな曖昧な仕様になるんだよ~~
  - 結局のところ `dayjs` **オブジェクト**も `Date` オブジェクトと欠陥を抱えており、このライブラリには罠が多すぎる
    - どのメソッドとどのメソッドを組み合わせれば参照透過になるのか、どのメソッドを単体で使うとローカルタイムゾーンという副作用をもつのか、API からまったく見えてこない
- date-fns を使えば全て解決する
  - [JavaScript: date-fns でタイムゾーンを扱う - Qiita](https://qiita.com/suin/items/296740d22624b530f93a)
  - [tests/date-fns.test.ts](https://github.com/kyonenya/timezone-testrunner-playground/blob/main/tests/date-fns.test.ts)

### timezone

- [JavaScript: date-fns でタイムゾーンを扱う - Qiita](https://qiita.com/suin/items/296740d22624b530f93a)
  - この記事以外全部 fake
- [タイムゾーンを意識した Day.js オブジェクトの生成 - Qiita](https://qiita.com/tearoom6/items/252afc24cd3f6edc68a5)
  - `dayjs.tz('2018-01-24T18:53:00+09:00', 'Asia/Tokyo')` は使わないほうがいいとのこと、分かる
  - `tz()` はタイムゾーンなし文字列に対してタイムゾーンを付与するもの
- [Vercel 環境でタイムゾーンがズレる場合の対処法 | Tech Blog](https://blog.junpeko.com/consider-vercel-timezone)
  - 「Date オブジェクトはミリ秒の情報しか保持しておらず……」
- [Day.js の.tz.setDefault()が動かないと思ったけど使い方が間違ってただけだった | DevelopersIO](https://dev.classmethod.jp/articles/day-js-timezone-set-default/)
  - 「.tz() の引数（='Asia/Tokyo'）を省略できるものであり、.tz() 自体は都度呼んであげる必要がある」

### node:test

- [テストのスキップ - Node.js の標準 API にテストランナーが追加された](https://azukiazusa.dev/blog/node-js-api/#%E3%83%86%E3%82%B9%E3%83%88%E3%81%AE%E3%82%B9%E3%82%AD%E3%83%83%E3%83%97)
- [特定のディレクトリ内の TypeScript ファイルの Node 組み込みテストランナーを実行するには？· 問題 #3902 · nodejs/help](https://github.com/nodejs/help/issues/3902)
  - node-glob の CLI を使った方法：`"test": "glob -c \"node --loader tsx --no-warnings --test\" \"./tests/**/*.test.ts\"`
    - [node-test-with-typescript/package.json at main · scottwillmoore/node-test-with-typescript](https://github.com/scottwillmoore/node-test-with-typescript/blob/main/package.json)
    - [CLI - isaacs/node-glob: glob functionality for node.js](https://github.com/isaacs/node-glob#command-line-interface)
  - また、追加の依存関係をインストールしたくない非 Windows ユーザー向けの別のソリューションもあります。`"test": "find ./src -name '\*.spec.ts' -exec node --loader @swc-node/register/esm --test {} \\;"`
    - https://github.com/nodejs/help/issues/3902#issuecomment-1594672787
    - https://github.com/kyonenya/timezone-testrunner-playground/issues/1#issue-1793967196
  - ex. [node-test-with-typescript/ at main · scottwillmoore/node-test-with-typescript · GitHub](https://github.com/scottwillmoore/node-test-with-typescript/tree/main)
- [Node.js の標準 API にテストランナーが追加された](https://azukiazusa.dev/blog/node-js-api/)
- [nodejs/node-core-test: Node 18's node:test, as an npm package](https://github.com/nodejs/node-core-test)
  - polyfill
- [Node.js の assert の小話 - from scratch](https://yosuke-furukawa.hatenablog.com/entry/2021/12/27/182526)
  - node:assert/strict があるよ、という話
- [Node.js コアモジュールの import/require には `node` scheme がつけられる - from scratch](https://yosuke-furukawa.hatenablog.com/entry/2021/12/27/003424)
- [play-ts-using/src/index.ts at main · mizchi/play-ts-using · GitHub](https://github.com/mizchi/play-ts-using/blob/main/src/index.ts)
  - テスト例

### ESModule

- [0 から調べる--moduleResolution bundler](https://zenn.dev/akadori/scraps/412a5f8fc6ea63)
- [サーバーサイドで TypeScript の ESM（ES Modules）プロジェクトを esbuild で bundle する](https://zenn.dev/junkor/articles/2bcd22ca08d21d)
  - tsx を使ってる
- [0 から調べる--moduleResolution bundler](https://zenn.dev/akadori/scraps/412a5f8fc6ea63)
- [\*.ts 拡張子をそのまま書く方針が使えるようになった - Native ESM + TypeScript 拡張子問題: 歯にものが挟まったようなスッキリしない書き流し](https://zenn.dev/qnighy/articles/19603f11d5f264#*.ts-%E6%8B%A1%E5%BC%B5%E5%AD%90%E3%82%92%E3%81%9D%E3%81%AE%E3%81%BE%E3%81%BE%E6%9B%B8%E3%81%8F%E6%96%B9%E9%87%9D%E3%81%8C%E4%BD%BF%E3%81%88%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%AA%E3%81%A3%E3%81%9F)
- [ESModule かつ TypeScript で Node.js の環境構築を行う - Qiita](https://qiita.com/2san/items/8d493f89aaf455ab9af1)
- [2022 年度の TypeScript 製 ES Modules レシピ - Qiita](https://qiita.com/masato_makino/items/8451bf4e62ad27823af1)
  - fake
- [Next.js with ESM](https://zenn.dev/okunokentaro/scraps/258ca0269c51c3#comment-cde3955fcd6b58)

### TypeScript

- [TypeScript: TSConfig リファレンス - すべての TSConfig のオプションのドキュメント](https://www.typescriptlang.org/ja/tsconfig#watchOptions)
- [より良いディレクトリ監視と watchOptions の追加 - TypeScript v3.8.1-rc 変更点 - Qiita](https://qiita.com/vvakame/items/72da760526ec7cc25c2d#%E3%82%88%E3%82%8A%E8%89%AF%E3%81%84%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA%E7%9B%A3%E8%A6%96%E3%81%A8-watchoptions%E3%81%AE%E8%BF%BD%E5%8A%A0)
- [まだ ts-node 使ってるの？tsx の紹介 - Qiita](https://qiita.com/ssssota/items/115a906e960bcfabb46b)
- [esbuild-kit/tsx: ⚡️ TypeScript Execute (tsx): Node.js enhanced with esbuild to run TypeScript & ESM](https://github.com/esbuild-kit/tsx)
  - [Node.js Loader - esbuild-kit/tsx](https://github.com/esbuild-kit/tsx#nodejs-loader)

### pnpm

- [Node.js バージョン管理に fnm を利用する - くらげになりたい。](https://www.memory-lovers.blog/entry/2022/10/30/100000)
- [Corepack を使用する方法【npm】【yarn】【pnpm】 - Qiita](https://qiita.com/P-man_Brown/items/a75a042813f9a20768fd)
- [Corepack の使用 - インストール | pnpm](https://pnpm.io/ja/installation#corepack%E3%81%AE%E4%BD%BF%E7%94%A8)
