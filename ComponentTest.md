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

### 基本的な使い方

- "@testing-library/react"のrender関数を使ってテスト対象コンポーネントをレンダリングする

```js
import { render } from "@testing-library/react";
import { Component } from "path of this component";

test("test case1", () => {
    // コンポーネントをレンダリングする
    render(<Component />);
});
```

<br>

- - "@testing-library/react"のscreenオブジェクトは仮想の画面にレンダリングされた要素を検索したり、debugで確認できたりする

```js
import { render, screen } from "@testing-library/react";
import { Component } from "path of this component";

test("test case1", () => {
    render(<Component />);

    // 引数の文字列を持つ最初の要素を取得する
    const msgElem = screen.getByText("Hello");
    
    // 仮想の画面にどのような構造でdomがレンダリングされているか確認できる
    screen.debug();

});
```

<br>

- Jestや@testing-library/jest-domで提供されているmaxtchersを利用して結果を評価する
```js
import { render, screen } from "@testing-library/react";
import { Component } from "path of this component";

test("test case1", () => {
    render(<Component />);
    const msgElem = screen.getByText("Hello");

    // @testing-library/jest-domが提供する関数で指定するクラス名が付与されているかをチェックする
    expect(msg.Elem).toHaveClass('message');
});

```

---

###  ユーザーイベントを発火させる

- [参照元](https://zenn.dev/k_log24/articles/4c1cd37ff0ca50)

- "@testing-library/user-event"にある fireEvent オブジェクトからユーザーイベントを発火できる
```js
import { fireEvent } from '@testing-library/react';

fireEvent.click(screen.getByRole('button'));
```

<br>

- "@testing-library/react"にある userEvent オブジェクトからもユーザーイベントを発火できる
```js
import userEvent from '@testing-library/user-event';

userEvent.click(screen.getByRole('button'));
```

<br>

- fireEventとuserEventのどちらがいいのか
    - 特に制約がなければuserEventを使ったほいがいい
        - 理由1: Testing Library公式でそう勧められているから
        - 理由2: userEventの方が簡潔に書けるらしい
        - 理由3: 実際のユーザーの操作により近いのはuserEventの方だから

- 上記の詳しい解説

    - 公式での説明は[こちらを参照](https://testing-library.com/docs/dom-testing-library/api-events/)

    - userEventの方が簡潔に書ける例
    ```js
    // input項目に対してtestという文字を入力する

    // fireEvent
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });

    // userEvent
    userEvent.type(screen.getByRole('textbox'), 'test')
    ```

    - fireEventとuserEventの明確な違い
        - fireEventはdisableなインプット項目に対してもinputイベントを発火できてしまう(ユーザーはそのような操作はできないのにも関わらず)

        - userEventはdisableなインプット項目に対してinputイベントを発火できない(実際のユーザーと同じ状況での操作)

        - textBoxに複数文字を入力する操作がテストで必要な場合
            - fireEvent() は1度に全ての文字が入力される
            - userEvent() は1文字ずつ入力するのをシミュレートするため、複数の入力イベントが発火する
---

### userEvent　と fireEvent の注意点

- userEvent は非同期で画面の更新が行われるので、場合によっては await で画面の更新を待つ必要がある

<br>

例: ボタン押下でテキストの要素を 表示 / 非表示 に切り替えるコンポーネント

```js
// テスト対象コンポーネント

export const MyComponent = () => {
    const [isClicked, setIsClicked] = useState(false);

    const onClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <>
            {isClicked && <p>Button Clicked</p>}
            <button onClick={onClick}>switch text</button>
        </>
    )
}
```

<br>

以下はうまくテストができないコード

```js
// テストコード　

test("MyComponent test", () => {
    render(<MyComponent />);

    const button = screen.getByRole("button");
    
    // クリックしたら、非同期のsetIsClickが動く
    // しかし、以下のコードはその処理の結果&画面の更新を待たずに後続処理へ続く
    userEvent.click(button);

    expect(screen.getByText("Button Clicked")).toBeInTheDocument();
    /**
     * fail
     * -> クリックしてから、画面の更新を待たずにexpectしたから
     */
});
```

<br>

上記の問題を防ぐためには4つ方法がある
1. await で userEvent の画面更新を待つ
    ```js
    // テストコード
    test("test", () => {
        render(<MyComponent />);
        const button = screen.getByRole("button");

        // await で画面の更新を待ってから後続処理を行う
        userEvent.click(button);

        expect(screen.getByText("Button Clicked")).toBeInTheDocument();
    });
    ```

<br>

2. findBy 系の要素検索関数を利用する  
    - Warning: ~~ was not wrapped in act という警告が表示される事がある
    ```js
    // テストコード
    test("test", () => {
        render(<MyComponent />);
        const button = screen.getByRole("button");
        userEvent.click(button);

        // findByで 1000 ms 待ってから画面の要素を検索する
        expect(await screen.findByText("Button Clicked")).toBeInTheDocument();
    });
    ```

<br>

3. waitFor を使う
    - await キーワードと一緒に使うこと (waitForがPromiseを返すかもしれないかららしい)
    ```js
    // テストコード

    test("test", async () => {
        render(<MyComponent />);
        const button = screen.getByRole("button");
        userEvent.click(button);

        // 画面の更新を待ってから行いたい処理をwaitForで囲む
        // 実際は、コールバック内のexpectの条件が満たされるまでwaitForのコールバックを何回も呼び出すみたい
        await waitFor(() => {
            expect(screen.getByText("Button Clicked")).toBeInTheDocument();
        });
    });
    ```
<br>

4. userEvent の代わりに fireEvent を使う
    ```js
    // テストコード
    import { firEvent } from "@testing-library/react";

    test("test", () => {
        render(<MyComponent />);
        const button = screen.getByRole("button");

        // クリックイベント発火
        // fireEventは画面の更新が終わるまで待つ
        // (内部がactで囲まれているかららしい)
        fireEvent.click(button);

        expect(screen.getByText("Button Clicked")).toBeInTheDocument();
    });
    ```

---

### act と waitFor

前提: 以下のようなコンポーネントがあるとする  

- ボタンと、そのボタンのクリック数を表示するコンポーネント

```js
export const Counter = () => {
    const [count, setCount] = useState(0);
    const onClick = () => {
        setCount((num) => num++);
    };

    retrun (
        <>
            <p>count: {count}</p>
            <button onClick={onClick}>add count</button>
        </>
    )
}
```

#### act 

    -   何かの処理によって、コンポーネントの 非同期処理 / 再レンダリング が発生し、その結果がコンポーネントに反映されるまで待ちたい時に囲むヘルパーメソッド(多分 1000 ms 待つと思う)

    - 基本的には React Testing Library を使えば、内部を act でラップしている関数があるので、それを利用することで、 act の　入れ子を防ぐことができる

```js
// テストコード
test("act() sample", () => {
    render(<Counter />);

    const btn = scree,getByRole("button", {name: "add count"});

    // コンポーネントへの再レンダリングを発生させる処理を囲む
    act(() => {
        userEvent.click(btn);
    });

    expect(screen.gteByText("count:1")).toBeInTheDocument();
});
```

#### waitFor
    - 何かの処理によって、コンポーネントの 非同期処理 / 再レンダリング が発生し、　その後の処理で待ちたい場合に使うメソッド

    - 基本的にマッチャーの結果を再レンダリングまで待ちたい場合に使う

    - 実際はコールバックに渡されたマッチャーが成功するまで、もしくは 1000 ms 経過するまでコールバック関数を呼び続けるというもの

```js
// テストコード
test("waitFor() sample", async () => {
    render(<Counter />);

    const btn = screen.getByRole("button", {name: "add count"});

    userEvent.click(btn);
    
    
    // コールバックの関数の実行を再レンダリングされるまで待ちたい
    // 実際はコールバックの関数を1000ms経過するまで何度も呼び出している
    await waitFor(() => {
        expect(screen.gteByText("count:1")).toBeInTheDocument();
    });
});
```

<br>

#### 使い分け

- 基本的には waitFor でアサーションを囲むことが多い
    -> もしくは findBy 系を使うこともある

- act に関しては、 Time のモッキングの際に jest.runAllTimers() などを利用する際に act で囲む必要がある場合に使う程度