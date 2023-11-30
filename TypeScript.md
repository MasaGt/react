### ReactっプロジェクトをTypeScriptで作る
    - npx create-react-app [プロジェクト名] --teplate typescript
    - ファイルの拡張子がJavaScriptと異なる  
        .js => .ts  
        .jsx => .tsx  

### 型定義ファイル  
オブジェクトの型定義にtypeキーワードが使える

```TypeScript
type Uer = {
    id: number,
    name: string,
    ...
}
```
<br>
このような型のデータを複数コンポーネントで利用したい場合、全てのコンポーネントファイルにtypeで型定義をするのではなく、型定義ファイルを1つ作成し、利用するコンポートはその型定義ファイルをインポートすれば良い  

<br>

```
project
|- public
|- src
    |- components
    |- types
        |- ここに型定義ファイルを置く
    |- App.tsx
    |-index.ts
```
<br>

型定義のエクスポート
```TypeScript
//User.ts
export type User = {
    id: number,
    name: string
};
```
<br>

型定義のインポート
```TypeScript
import type {User} from 'User.tsのパス'
```
**importではtypeをつけなくても機能するが、明示的に型定義のみをインポートする場合はつけておいた方がいい**