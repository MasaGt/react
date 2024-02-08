### コンポーネントのテスト方法

- React公式が推奨しているユニットテストの手法
    - Jest + React Testing Library

- Jest: よく使うJavaScriptのテストフレームワーク
    - 多分ロジックのテストとかに使う
    - テストの実行に欠かせないassertion関数やtest()などを提供する

- React Testing Library: 
    - コンポーネントのテストに利用できる
        - 対象のコンポーネントに対して想定される操作を行う関数を提供する

- 大まかなイメージ
    - テストの実行、結果の評価などのテストの根幹の機能はJestが担う
    - コンポーネントのレンダリング、イベントの発火などのUI部分の操作をReact Testing Libraryが提供する
<img src="./images/unit-test.png" />
    
---

### 準備

- create-react-app コマンドでプロジェクトを作成した場合、Jest と React Testing Libraryは標準でインストールされる

- 自分で1からReactプロジェクトを用意する場合、別途JestとReact Testing Libraryをインストールする必要がある
```bash
npm install -D jest

# コンポーネントをレンダリングするための関数や要素を見つける関数がまとめられているパッケージ
npm install -D @testing-library/react

# イベントを発火させる関数がまとめられているパッケージ
npm install -D @testing-library/user-event

# コンポーネントの結果評価(matchers)をする関数がまとめられているパッケージ
npm install -D @testing-library/jest-dom
```

#### matchersとは

- Jestを使っていると、結果の評価の際にtoBe()やtoBeTruthy()などを使って結果を評価している。これらの結果評価のための関数をマッチャー(matchers)
と呼ぶ

- @testing-library/jest-dom はJestにはないコンポーネントのためのマッチャーを提供するパッケージ
```js
// expectに渡したコンポーネントがscreenにあることを期待し評価するtoBeInTheDocument()
expect(component).toBeInTheDocument();
```


---

### 使い方
TODO: テストの例を追加する

```js
```

    