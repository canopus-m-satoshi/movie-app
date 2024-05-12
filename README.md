## 概要

観た映画や気になる映画を管理できるアプリです。

映画鑑賞が趣味で、その映画をいつ観たのか記録を残せるアプリが欲しいと思いこのアプリを開発しました。
映画の情報を TMDB(the movie db)から取得し、Firebase にお気に入り映画等をリストで管理できるようにしています。

現時点ではログイン/映画検索/リスト登録等最低限の機能のみの実装なので、今後機能を増やしていく予定です。

## 技術スタック

### フロントエンド

- Next.js v14.1.1 (App Router)
- React v18
- TypeScript v5
- Tailwind CSS v3.3.0
- daisyUI v4.7.2

### 状態管理

- React Redux v9.1.0
- Redux Toolkit v2.2.1

### データフェッチ

- Axios v1.6.7
- SWR v2.2.5

### バックエンド

- Firebase v10.8.1
  → 今後 Express or Ruby on Rails or Django に移行(したい)

### その他のライブラリ

- date-fns v3.6.0
- react-datepicker v6.6.0
- react-icons v5.0.1
- react-modal v3.16.1
- react-toastify v10.0.4
- server-only v0.0.1

### 開発環境

- ESLint v8
- Prettier

## 今後のバックエンド技術の選定について

現在、本アプリケーションではバックエンドに Firebase を使用していますが、Backend側のスキルもある程度は必要だと思うので、将来的に以下のいずれかの技術スタックへの移行を検討しています。


1. Express (Node.js) / MongoDB
2. Ruby on Rails / PostgreSQL
3. Django / PostgreSQL

## データ構造
![MovieApp_data_structure drawio](https://github.com/canopus-m-satoshi/movie-app/assets/58695418/327e4799-9518-452d-a4e6-f5e227cfab49)


※2024年5月12日時点

