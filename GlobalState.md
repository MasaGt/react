### グローバルなStateの管理の方法
- 多階層からなるコンポーネントにおいて、子コンポーネントが多層上の親コンポーネントのstateを参照するときに役立つ

- 親コンポーネントから子コンポーネントにstateのバケツリレーをするのはよろしくない  
-> なぜなら、バケツリレーの途中のコンポーネントではそのstateを使わないかもしれないから  
-> 特定のpropsを受け取るコンポーネントは再利用できないコンポーネントになってしまうかも  

- グローバルなstateを管理するにはいくつか方法がある(様々なライブラリがある)

- reactが元々持っているContexという機能でもグローバルなstateを実現できる



### Contextでのグローバルなstateの管理
contextでグローバルなstateを扱うためのステップ

1. React.createContextでContextオブジェクトを作成

2. 作成したContextのProviderコンポーネントを作成

3. 作成したProviderにグローバルで扱いたいstateなどを渡す

4. グローバルstateなどを扱いたいコンポーネント群の中で一番上の階層のコンポーネントをProviderコンポーネントで囲む

5. 参照したいコンポーネント側でReact.useContextを使う

<br/>

前提: コンポーネントは'モダンJavaScriptの基本から始める React実践の教科書 p.181 - p.183を利用'  
 
```
プロジェクト構成は以下

project
  |-public
  |-src
    |-components
        |-Card.jsx
        |-EditBtn.jsx
    |-App.jsx

コンポーネントの構成は
App.jsx
  |-Card.jsx
    |-EditBtn.jsx
```

App.jsxのstateをEditBtn側で参照したい
でもAppのstateをpropsのバケツリレーはしたくない



1 React.createContextでContextオブジェクトを作成  
componentsフォルダは以下にprovidersフォルダを作成しProviderコンポーネントを作る
```
project
    |-public
    |-components
        |-CardやEditBtnコンポーネント
        |-providers(フォルダ)
            |-AdminProvider.jsx(adminというstateを管理する)
```

```JavaScript
// AdminProvider.jsx

import { createContext } from 'react';

//Contextオブジェクトの作成
//createContextはデフォルト値を設定することができる
//今回は空のオブジェクトを設定
export const AdminContext = createContext({});

```
<br>

2 作成したContextのProviderコンポーネントを作成
```JavaScript
// AdminProvider.jsx

import { createContext } from 'react';
import { App } from '../../App';

//Contextオブジェクトの作成
export const AdminContext = createContext({});

//Providerコンポーネントの作成
//Providerコンポーネントは、配下にコンポーネントを囲めるようにprops受け取るようにする
export const AdminProvider = (props) => {
    //<AdminProvider>で囲んだ中の要素がchildrenで渡ってくる
    const {children} = props;
    return (
        <AdminContext.Provider>
            {//このContext.Providerの中でグローバルな値(Stateなど)を扱う}
            {children}
        </AdminContext.Provider>
    );
}

```
<br>

3 作成したProviderにグローバルで扱いたいstateなどを渡す
```JavaScript
// AdminProvider.jsx
import { useState } from 'react';
//途中まで省略

export const AdminProvider = (props) => {
    const {children} = props;

    const {isAdmin, setIdAdmin} = useState(false);

    //Context.Providerはpropsとしてvalueを受け取る
    //このvalueに入れるのが、実際に配下のコンポーネントに渡したい値。バケツリレーしていた値。
    return (
        <AdminContext.Provider value={{isAdmin, setIsAdmin}}>
            {children}
        </AdminContext.Provider>
    );
}
```
<br>

4 グローバルstateなどを扱いたいコンポーネント群の中で一番上の階層のコンポーネントをProviderコンポーネントで囲む
```JavaScript
//index.js
import ReactDOM from "react-dom";
import {App} from "./App";
import { AdminFlagProvider } from "./components/providers/AdminFlagProvider";

//今回はAppコンポーネント~EditBtnコンポーネントでisAdmin, setIsAdminを扱いたいので、index.jsxで<App>を<Provider>で囲む

//Tip: AdminFlagProviderでprops({children})を受け取るのでこういう書き方ができる
ReactDOM.render(
    <AdminFlagProvider>
        <App />
    </AdminFlagProvider>
    , document.getElementById('root'));
```


5 参照したいコンポーネント側でReact.useContextを使う
```JavaScript
//App.jsx
import {useContext} from 'react';
import { AdminFlagProvider } from "./components/providers/AdminFlagProvider";

export const App = () => {

    //Context内の値を取得(参照)
    const {isAdmin, setIsAdmin} = useContext(AdminFlagContext);

    const switchRole = () => {
        setIsAdmin(!isAdmin);
    };

    return {
        <>
            {
                isAdmin? 
                <span>管理者です</span>:
                <span>管理者以外です</span>
            }
            <button onClick={switchRole}>切り替え</button>
            <Card />
        </>
    }
}


```
```JavaScript
//EditBtn.jsx
import {useContext} from 'react';
import { AdminFlagProvider } from "./components/providers/AdminFlagProvider";

export const EditBtn = () => {

    //Context内の値を取得(参照)
    const {isAdmin} = useContext(AdminFlagProvider);
    return (
        <>
            <button disabled={isAdmin}>管理者のみが押せるボタン</button>
        </>
    );
}
```
<br>

### どのような情報をグローバル化すれば良いのか?
- どのページにいても常に必要とされるもの  
例: ログインユーザー情報(ユーザー名など)

### Contextを参照しているコンポーネントの再レンダリング
- useContextでContextを参照している場合、そのContextの値が何か更新されたとき、useContextでContextを参照しているすべてのコンポーネントは再レンダリングされる  
- よって何でもかんでも1つのContextに情報を詰め込むのは良くない

### Providerコンポーネントは他のProvierコンポーネントをネストできる
```JavaScript
<UserInfoProvider>
    <OtherProvider>
        コンポーネント
    </OtherProvider>
</UserInfoProvider>
```
