### Strictモード時のコンポーネントのレンダリング
- StrictModeが有効な場合は、コンポーネントが2回レンダリングされる

### 対応策
- StrictModeをオフにする  
index.js(tsc)にて、<App>などが<React.StrictMode>で囲まれているので、それを削除する