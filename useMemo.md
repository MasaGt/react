#### useMemoとは
  変数をメモ化するための手段  
  useMemo(() => {メモ化したい値}, [依存配列]);

サンプル:　時間のかかる処理を行った結果を表示するコンポーネント
```JavaScript
  const export Sample = () => {

    //時間のかかる処理
    const process = () => {
      //何らかの時間のかかる処理
      return val;
    }    

    //処理結果を保持する変数
    const result = process():

    return (
        <p>{result}</p>
    );
  };
```

このコンポーネントは再レンダリングされるたびに、processを実行する  
-> reult = process() で重い処理processが呼ばれている  
useMemoを利用することで、その処理結果をメモ化することができる  
-> 結果、初期表示時に一回だけprocessを実行するように改善可能

改善後
```JavaScript
  import { useMemo } from 'react';

  const export Sample = () => {

    //時間のかかる処理
    const process = () => {
      //何らかの時間のかかる処理
      return val;
    }    

    //処理結果を保持する変数
    const result = useMemo(() => process(), []):

    return (
        <p>{result}</p>
    );
  };
```

