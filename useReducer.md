### useReducer とは

- state の管理をできるフック
    - useState との違いは?
        - useState は簡単に state を 管理/更新できる
        - useReducer は複雑な state の更新ロジックを実現できるらしい

- action と 初期値 を受け取り、 state と dispatch を返す
    - reducer: state の変更処理関数
    - 初期値: state の初期値
    - state: useState のような state
    - dispatch: reducer のトリガー

```js
const [state, dispatch] = useReducer(reducer, initVal);
```

- reducer は引数に state と action を受け取り、新しい state を返却する
    - state: 現在のstateの値
    - action: dispatch 関数から渡される引数
    - 新しい state

```js
const reducer = (state, action) => {
    if (actionに関する条件式など) {
        stateの更新処理
    } else if (actionに関する条件式など2) {
        stateの更新処理
    }

    return 更新したstate;
}
```
---

### useReducer の利用例

- カウンターコンポーネントを例に useReducer を利用する

- reducer の中で、 state を返さないと、次から state の値は undefined になるので注意
    ```js
    const reducer = (state, atcion) => {
        // action が 'increment' じゃないケースの時、stateは undefined に更新されてしまう
        if (action == 'increment') {
            return state + 1;
        }
    };
    ```

```js
import React, { useReducer } from 'react';

export default Counter = () => {

    // stateの変更処理内容
    const reducer = (state, action) => {
        if (action == 'increment') {
            state++;
        }
        return state;
    }

    const [state, dispatch] = useReducer(reducer, { count: 0 });
    return (
        <div className="">
            <h1>Counter: {state.count}</h1>
            <button onClick={() => { dispatch('increment') }}>+</button>
            
        </div>
  );
}
```

- initVal にはオブジェクトしか渡せない訳ではない
    - 下記のように単一の値も設定できる

```js
const [count, dispatch] = useReducer(reducer, 0);
```
