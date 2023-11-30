### React Tutrilalからの学び

- react(パッケージについて)  
    jsxタグを使うのに必要なパッケージ  
    React18からは明示的にインポートしなくてもよくなった

- react-domについて　　
    jsxオブジェクトを対象のタグ配下に追加するための機能を提供してくれるパッケージ
    v18から使い方が少々変わる

```JavaScript
// v18以前
import reactDOM from 'react-dom';

reactDOM.render(jsxオブジェクト, documet.getElementById('対象のDOM'));
```

```JavaScript
// v18以降
import reactDOM from 'react-dom/client';

//対象のDOM取得
const root = reactDOM.root(documet.getElementById('対象のDOM'));

root.render(jsxオブジェクト);
```
