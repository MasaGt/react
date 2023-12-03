### Linterとは

- プログラムの静的解析ツール
    - 構文チェック
        - 到達不能コードや型が一致しない関数の呼び出しの指摘など
    - コーディングスタイル
        - インデントに一貫性がない場合の指摘など
    - パフォーマンス
        - 宣言されてから一度も参照されてない変数の指摘など

- Compiler と Linter の違い
    - compilerの主な機能はある言語から別の言語(主にマシン語)に変換
    - Linterは記法の指摘

---

### ESLintとは

- JavaScriptのためのLinter
    - ESLintの他にJSLint,JSHintなど様々なLinterがある

---

### VSCodeでESLintを使う

1. npm installでeslintをインストール
2. vscodeのプラグインでESLintをインストール
3. プロジェクト直下に.eslintrc(.json)という設定ファイルを作成 (対話形式でも作成できる)
4. 設定を追記してく
5. VSCode用のプラグインであるESLintのインストール

---

### 対話形式での.eslintrcの作成方法

1. eslintをインストール

2. [どれかの方法を使ってインストールしたeslintを実行](../../npm/npx.md)
```bash
# 一例
./node_module/.bin/eslint --init
```

3. yes/noで回答していく

---

### 基本的な設定

- 大事な項目

```json
{
    "env": {
        // プログラムの実行環境の指定
    },
    "extends": {
        // pluginのShareable configを適用する
    },
    "plugins": [
        // 追加するルールのセット
        // *plugins に追加しただけでルールは有効化されない
    ],
    "rules": {
        // 個別のルールの設定
    },
    "globals": {
        // 実行時に認識させたいグローバル変数
    }
}
```

<br>

- env: チェック対象のJavaScript/TypeScriptコードがどの実行環境で使われるかをESLintに伝えるためのオプション

- extends: ルールのプリセットを読み込むイメージ  
```
*shareable configs(既に書かれたeslintの設定ファイルみたいなもの)を読み込んで利用する。

*上から順位読み込まれるので、同じ設定項目があった場合、下のプリセットの設定が適用される
```

- plugins: 使いたいnpmパッケージ(ルールのセット)をここに書く
```
*plugins 自体はルールを読み込むだけで、どのルールを適用させるかの設定はない。したがって、pluginに書くだけでは何のルールも適用されない。

*最初から eslintにあるルールもある
```

- rule: plugin(ルールのセット)の中の個別項目の適用をしたい時にここに書く
```
rules: {
    "項目" : 設定値
}
で追記する

設定値   意味
  0   	off
  1   	warn
  2   	error
```

- globals: 実行時に認識させたいグローバル変数
```
globalsに何も設定しないと、extends/ruleの設定によってはwindowなどのグローバル変数を使った時にエラーか警告が出るかも
```

---

### 具体例

```json
{
    "env": {
        // 「ES6かつブラウザで動くコードがLint対象なんだな」のイメージ
        "browser": true,
        "es6": true 
    },
    "plugns": [
        // (最初から入っている)eslintと@types~~のルールを使いたい(まだ適用されていない)
        "@typescript-eslint"
    ],
    "extends": [
        // (最初から入っている)eslintのrecomendというプリセットのルールを適用する
        "eslint:recommended",
    ],
    "rules": {
        // @types~~にある "no-empty-function"を有効にする
        "@typescript-eslint/no-empty-function": 2
    },
    "globals": {
        // Linterに認識させるグローバル変数
        
        // 実はbrowser: trueの時点で下のグローバル変数は設定されている為、自分で設定するglobalsは不要
        "window": false,
        "alert": false
    }
}

```

---

### extendsの"plugin:"

extendsのところにだけ、"このプリセットはインストールしたプラグインの~~って名前のプリセットを適用します"　ということを伝えるために、"plugin:"をつける。
それ以外はパッケージ名からはじめて書いていい

```json
{
    "plugin": [
        // パッケージ名
        "@aaa-bbb"
    ],
    "extends": [
        /**
        * ソースコードがあるパッケージは
        * @aaa-bbb/es-lint/eslint-plugin/プリセット名
        */
        "plugin:@aaa-bbb/プリセット名"
    ],
    "rules": {
        "@aaa-bbb/設定項目" : 設定値
    }
}
```

---

### envの理解

envはあらかじめ用意されているグローバル変数を設定しておくものらしい
```
node_modules配下の
@eslint/eslint/conf  配下に
environments.js  がある。

"browser"に関するところで言えば、
グローバル変数 window などをread-onlyで認識しろという設定がしてあった。
```

---

### ちょっとした疑問

"eslint:recommended"とかってどこにあるの?
```
"eslint:recommended"だったら、node_modules配下の
@eslint/js/src/config  配下に
eslint-recommended.js
がある
```

---

### その他の設定項目

```json
{
    "parser": // 使用するパーサーの指定,
    "parserOptions": {
        // parserの細かいオプションを指定する
        
        /**
        * 例: JSXの構文も対象にしたい場合
        * "ecmaFeatures":
        *       "jsx": "true"
        */
    }
}
```

- parser
```
パーサーとは構文解析のプログラム  
コンパイラでも静的構文解析をするが、コンパイラのメインは言語変換  
ESLintでデフォルト以外のパーサーを使いたい時は指定する  
*TypeScript を構文チェックする場合に type キーワードなどは ECMAScript の構文ではないなためESLintのデフォルトのパーサーでは構文解析に失敗する
```

-parserOption
```
その他のオプション項目としては
ecmaVersion: 対象コードのEcmaScriptのバージョン
sourceType: モジュールのタイプを指定(scriptやmodule)
*sourceTypeでscriptを設定すると、import/export などのESモジュールを利用すると構文エラー
```