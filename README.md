## 概要
観た映画や気になる映画を管理できるアプリです。

映画鑑賞が趣味で、その映画をいつ観たのか、どんな気分の時にみるのがおすすめかといった記録を残せるアプリが欲しいと思いこのアプリを開発しました。
映画の情報をTMDB(the movie db)から取得し、Firebaseにお気に入り映画等をリストで管理できるようにしています

## 技術スタック
  ### フロントエンド
  * Next.js v14.1.1 (App Router)
  * React v18
  * TypeScript v5
  * Tailwind CSS v3.3.0
  * daisyUI v4.7.2

  ### 状態管理
  * React Redux v9.1.0
  * Redux Toolkit v2.2.1
    
 ### データフェッチ
  * Axios v1.6.7
  * SWR v2.2.5

  ### バックエンド
  * Firebase v10.8.1
  →今後Express or Ruby on Rails or Djangoに移行予定

  ### その他のライブラリ
  * date-fns v3.6.0
  * react-datepicker v6.6.0
  * react-icons v5.0.1
  * react-modal v3.16.1
  * react-toastify v10.0.4

  ### 開発環境
  * ESLint v8
  * Prettier

## 今後のバックエンド技術の選定について
現在、本アプリケーションではバックエンドにFirebaseを使用していますが、将来的に以下のいずれかの技術スタックへの移行を検討しています。

1. Express (Node.js) / MongoDB
2. Ruby on Rails / PostgreSQL
3. Django / PostgreSQL

## データ構造

<figure>

<img width="553" alt="スクリーンショット 2024-04-08 17 59 11" src="https://github.com/canopus-m-satoshi/movie-app/assets/58695418/8ae71a7d-5485-4ae0-b260-eee0405c3d4a">
<figcaption>※2024年4月8日時点</figcaption>
</figure>
