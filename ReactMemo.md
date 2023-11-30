#### Reacr.memoとは

- コンポーネントのメモ化  
    同じpropsで再度レンダリングが行われるとき、前回のレンダリング結果を再利用するようになる  

```JavaScript
    //App.jsx(親コンポーネント)
    import { memo } from 'react';
    import { Child } from 'Child.jsx のパス';
    const App = memo(() => {
        return (
            <>
                <Child />
            </>
        );
    });


    //Child.jsx(子コンポーネント)
    import { memo } from 'react';

    export const Child = memo(() => {
        return (
            // Childコンポーネントの要素
        );
    });
```


- 注意点  
    propsが頻繁に更新され、再レンダリングの多いコンポーネントのメモ化はあまり意味がない  
    それどころか、React.memoがオーバーヘッドになることがある  
    ->　メモ化されたコンポーネントは、
    1.propsを記憶、
    2.propsを比較  
    する処理が行われるから  
    メモ化するなら、propsの更新頻度が低かったり、多くの子コンポートを持つコンポーネントをメモ化すると良い

