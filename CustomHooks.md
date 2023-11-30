### カスタムフックとは  
- 処理をコンポーネントから分離することのできる機能  
- 共通の処理をhooksとして抽出することで、複数のコンポーネントにその処理を利用できる  

### カスタムフックの実装例

```
プロジェクト構成
project
|-public
|-src
    |-components
    |-hooks
        |-ここにロジックを分離していく
    |-App.jsx
```


```JavaScript
//App.jsx
//ユーザー情報をapiを叩いて取得し、表示する
//取得中はローディング表示、
//取得時にエラーが出ればユーザー情報の代わりに独自のエラーメッセージを表示する

import { useState } from "react";
import axios from 'axios';

export const App = () => {
    
    //ユーザー情報(オブジェクトの配列)
    const [userList, setUserList] = useState([]);

    //ローディングフラグ
    const [isLiading, setIsLoading] = useState(false);

    //エラーフラグ
    const [isError, setIsError] = useState(false);

    //ボタン押下時、ユーザー情報取得
    const getUsers = () => {
        //フラグ設定
        setIsLoading(true);
        serIsError(false);

        //apiを叩いて、ユーザー情報取得
        axios.get('apiのurl')
        .then(result => {
            return {ユーザー情報(オブジェクト)};
        })
        .catch(error => {
            setIsError(true);
        })
        .finally(() => {
            serIsLoading(false);
        });
    };

    return (
        <>
            <button onClick={getUsers}>ユーザー情報取得</button>
            {isError && <p>ユーザー取得エラー</p>}
            {
                isLoading?
                (<p>ローディング中です</p>):
                (userList.map((user) => {
                    return (<p>{ユーザー情報(user.nameとか)}</p>);
                }))
            }
        </>
    );
};
```
<br>

**ユーザー情報取得処理（ロード中やエラー時の制御など）をコンポーネントから分離させたい**  

```
hooksフォルダ以下にuseFetchUsers.jsを作成する
project
|-src
    |-hooks
        |-useFetchUsers.js
```
<br>

Steo1: 空のhooksファイルを作成する
**カスタムフックでは複数の関数や値を返す事が多いので、オブジェクト(または配列)をreturnする事が多い**
```JavaScript
//useFetchUsers.js
import { useState } from 'react';
import axios from 'axios';

export const useFetchUsers = () => {
    return {};
    //またはreturn [];
}
```
<br>

Step2: カスタムフックに分離したい処理を書いていく
```JavaScript
export const useFetchUsers = () => {

    //ユーザー情報(オブジェクトの配列)
    const [userList, setUserList] = useState([]);

    //ローディングフラグ
    const [isLiading, setIsLoading] = useState(false);

    //エラーフラグ
    const [isError, setIsError] = useState(false);

    //ボタン押下時、ユーザー情報取得
    const getUsers = () => {
        //フラグ設定
        setIsLoading(true);
        serIsError(false);

        //apiを叩いて、ユーザー情報取得
        axios.get('apiのurl')
        .then(result => {
            return {ユーザー情報(オブジェクト)};
        })
        .catch(error => {
            setIsError(true);
        })
        .finally(() => {
            serIsLoading(false);
        });
    };

    return {userList, isLiading, isError, getUsers};
    //または、return [userList, isLiading, isError, getUsers];
}
```
<br>

Step3: コンポーネント側でカスタムフックをインポートし、ロジックを利用する
```JavaScript
// App.jsx
import { useFetchUsers } from './hooks/useFetchUsers';

export const App = () => {

    //カスタムフックを呼ぶ
    const {userList, isLiading, isError, getUsers} = useFetchUsers();
    //もし配列を返却するカスタムフックの場合
    //const [userList, isLiading, isError, getUsers] = useFetchUsers();

    return (
        <>
            <button onClick={getUsers}>ユーザー情報取得</button>
            {isError && <p>ユーザー取得エラー</p>}
            {
                isLoading?
                (<p>ローディング中です</p>):
                (userList.map((user) => {
                    return (<p>{ユーザー情報(user.nameとか)}</p>);
                }))
            }
        </>
    );
}

```