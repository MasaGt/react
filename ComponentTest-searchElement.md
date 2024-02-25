### コンポーネントテストの中で、要素を取得する方法

- @testing-library/react の中にある screen オブジェクトがそのための関数を提供してくれている

- 要素の取得方法は主に下記の3種類   
    - getBy 系
    - queryBy 系
    - findBy 系

---

### 要素検索の一例

#### getByText

- 対象の文字列を含む要素を返却する
- 対象の文字列を含む要素が見つからない場合はエラー

<br>

例: 'Title' という文字列を含む要素を検索(完全一致)
```js
// テストコード
import { render, screen } from '@testing-library/react';
import { Component } from '対象コンポーネントのパス';

test("component test", () => {
    render(<Component />);

    // Title という文字列を含む要素を検索
    expect(screen.getByText('Title')).toBeInTheDocument();
});
```

- 文字列を渡すと完全一致でマッチするものを検索
- 正規表現で渡すと部分一致でマッチするものを検索

```js
// getByText() に正規表現を渡すこともできる

// Title ~~ という文字列を含む要素を検索
// ~~はなんでもいい文字
expect(screen.getByText(/Title.*/)).toBeInTheDocument();
```

#### getByRole

- 指定した role 属性の値で要素を検索する

<br>

例: ボタン要素を検索する
```js
// テストコード

test("find a button", () => {
    render(<Component />);

    expect(screen.getByRole('button')).toBeInTheDocument();
});
```

---

### getBy / queryBy / findBy の違い

- getBy の戻り値
    - 検索にヒットした要素
    
    - ヒットしなかったらエラー

- queryBy の戻り値
    - 検索にヒットした要素

    - **ヒットしなかったら null**

- findBy の戻り値
    - **非同期**で検索し、Promiseを返すので、await/then で後続処理を行う必要がある

    - (デフォルトで) 1000 ms 以内に要素がヒットしなかったらエラー

    - 使い方が少し他のより難しい

- どのように使い分ければ良いのか
    - 要素が存在しないことをテストしたい時は queryBy
    
    - スクリーンの更新を待つ必要がある場合は findBy 
        - 他の方法でも代替できるので、簡単な方を選ぶこと

    - それ以外は多くのケースで getBy で良さそう

---

### findBy系の使い方

- 基本的に findBy でのテストは 他の方法で書き換えられる

- test() に渡すコールバック関数には async キーワードをつけること  
    -> コールバック内で await を使いたいから

<br>

例: findBy を使ったテスト

```js
// テスト対象コンポーネント

export const MyComponent = () => {
    const [isClicked, setIsClicked] = useState(false);

    const onClick = () => {
        setIsClicked(() => { !isClicked });
    };

    return (
        <>
            {isClicked && <p>Button Cliked</p>}
            <button onClick={onClick}>show text</button>
        </>
    );
}
```

```js
// テストコード

test("button test", async () => {
    // ボタンを押すと、とあるテキスト要素が表示されるコンポーネントのテスト
    render(<MyComponent />);
    
    // ボタン押下前: とあるテキストが表示されていないことを確認
    expect(screen.getByText("Button Cliked")).not.toBeInTheDocument();

    // ボタン要素取得
    const button = screen.getByRole("button");

    // ボタン押下
    userEvent.click();

    // 1000ms秒待って、画面から要素を検索
    const result = await screen.findByText("Button Cliked");

    // 結果をマッチャーで評価
    expect(result).toBeInTheDocument();
});
```

<br>

例: 上記テストを findBy を使わずに書くと

```js
// テストコード

test("button test", async () => {
    // ボタンを押すと、とあるテキスト要素が表示されるコンポーネントのテスト
    render(<MyComponent />);
    
    // ボタン押下前: とあるテキストが表示されていないことを確認
    expect(screen.getByText("Button Cliked")).not.toBeInTheDocument();

    // ボタン要素取得
    const button = screen.getByRole("button");

    // ボタン押下(画面が更新されるまで待つ)
    await userEvent.click();

    // 画面から要素を検索
    const result = screen.getByText("Button Cliked");

    // 指定した要素が画面に存在するかのテスト
    expect(result).toBeInTheDocument();
});
```

<br>

- 以下のようなテストは **たぶん** findBy 系でしかできない
    - 初期表示時に非同期処理が動くコンポーネント系のテスト
```js
// テスト対象コンポーネント
export const MyComponent = () => {
    const [userInfo, setUserInfo] = useState(null);

    // ユーザー情報を初期処理で取得する　
    useFeect(() => {
        const getUser = async () => {
            const user = await axios.get('url');
            setUserInfo(user);
        }
        getUser();
    }, []);
    
    // ユーザー情報があれば画面に表示する
    return (
        <>
            {
                userInfo && 
                <p>userInfo.name</p>
                <p>userInfo.~~</p>
            }
        </>
    );
};
```

<br>

上記コンポーネントのテストはこんな感じ
```js
// テストコード

test("MyComponent test", async () => {
    
    // axiosのモック化
    jest.spyOn(axios, "get").mockResolvedValue({name: "sample", key: value ...});

    render(<MyComponent />);

    // ユーザー名が表示されているかどうかをテスト
    expect(await screen.findByText("sample")).toBeInTheDocument();
});
```