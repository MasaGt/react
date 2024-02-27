### toMatchInlineSnapshot() を使用したテストにて下記のエラーが出る

- 'jsx' isn't currently enabled 

---

### エラー再現手順

1. npx create-react-app でreactプロジェクト作成

2. テストコードを作成

3. npm run test でテスト実行

*テスト対象モジュールの MyModule は jsx ファイル
```js
// テストコード
test("test", () => {
    const { container } = render(<MyModule />);
    expect(container).toMatchInlineSnapshot();
});
```

---

### 解決策

- babel で jsx をトランスパイルしてテストする

- プリセットに @babel/preset-react を利用する

#### 手順

1. babel とその他必要なプリセットをインストール

```bash
npm install -D @babel/core @bable/preset-env @babel/preset-react
```

<br>

2. babel の設定ファイルか package.json に利用するプリセットを指定する

```json
// .bablerc
{
    "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```
もしくは
```json
// package.json
~,
"bable": {
    "presets": ["@babel/preset-env", "@babel/preset-react"]
},
~
```

3. npm run test でテスト実行でうまくテストが通ることを確認する

---

### 注意点

- 同じ内容をbabel.config.js で定義すると同じエラーが発生する

    -> toMatchInlineSnapshot を使う時は、プリセットの設定は .babelrc か package.json に記述しないといけない

- 上記のエラーに関する投稿
    - [Support for the experimental syntax 'jsx' isn't currently enabled when using toMatchInlineSnapshot in Jest 27 #11730](https://github.com/jestjs/jest/issues/11730)