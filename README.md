# いざ！防災ギア 叩き台

GitHub Pages / Cloudflare Pages にそのまま置ける静的サイトです。

## ファイル

- `index.html` サイト本体
- `styles.css` デザイン
- `script.js` クイズ挙動
- `assets/home-preparedness.png` ヒーロー画像
- `assets/articles/` 読み物用の写真素材
- `articles/` 防災xアウトドアの読み物サンプル
- `_headers` Cloudflare Pages 用のセキュリティ/キャッシュ設定
- `404.html` エラーページ
- `robots.txt` クローラー向け設定

## デザインコンセプト

「外で使える道具を、家族を守る備えへ。」を軸に、アウトドアギアの実用感と防災メディアの信頼感を組み合わせています。クイズはメイン機能ではなく、足りない装備を見つけるミニ診断として配置し、ギアカテゴリ・シーン別記事・比較記事・商品リンクへつなげる構成です。

## GitHub / Cloudflare Pages

静的サイトなのでビルドコマンドは不要です。

- GitHub リポジトリには、このフォルダの中身をサイトルートとして配置
- Cloudflare Pages の Build command は空欄
- Build output directory は `/` またはリポジトリ内でこのフォルダをルートにした場合は空欄相当
- サブディレクトリで管理する場合は、Cloudflare 側の出力ディレクトリに `outputs/iza-bousai-quiz` を指定
