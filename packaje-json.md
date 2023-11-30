#### 各項目の簡単な説明  

```json
{
    "name": "my-app", 
    "version": "0.1.0",  
    "private": true,
    "dependencies": {  
        "react": "^17.0.1",
        "react-dom": "^17.0.1",
        "react-scripts": "4.0.3"
    },

    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    },
    "eslintconfig":  {
        "extends": "react-app"
    },
    "browserslist": [
        ">0.2%",
        "not dead",
        "not ie <= 11",
        "not op_mini all"
    ]
}
```

- name: プロジェクト名  
- version: プロジェクトバージョン
- private: このフラグが設定されている場合、npmにプロジェクトを公開できない  
    補足: npmには作成したライブラリを公開するという機能もあり、npm publishで自分が作成したパッケージをnpmに後悔することができる。もし間違ってnpm puclishを叩いた時にprivate: trueだったら公開されることはない。  
    **そもそも公開する際にはnpmのアカウント情報の作成、ログインが必要となるので、privateの設定はしなくていいかも**
- dependeincies: プロジェクトが依存(使う)パッケージ達
- scripts: 任意のshell scriptを実行するエイリアスコマンドを定義している。  
    run/test/build/test/eject　たちは予約語のようなもので、npm ~で実行することができる  
    自分で定義したコマンドについては、 npm run ~で実行することができる  
    **ejectはCreate React Appの設定をカスタマイズするために使用されるらしい(webpack や babel、ESLint などをカスタマイズできるらしい)**
- eslintconfig: ESLintの設定の定義
    LinterとはJavaScriptの文法エラーや潜在的な問題を検出するための静的解析ツール
- browserslist: プロジェクトがサポートするブラウザの一覧  
    この設定により、ビルドプロセスがブラウザごとに最適化されたコードを生成するらしい  