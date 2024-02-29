### Reactでは様々なスタイルの当て方がある

1. インラインスタイル
    JavaScriptにもあるように、要素のタグ内にスタイル定義を書き込む方法  

2. CSS Modules
    CSSを作成し、それをモジュールとしてJS/JSX側で読み込み利用する方法

3. Styled JSX (CSS in JS)  
    jsxタグを作成し、その中にスタイルをcssで定義していく方法  

4. Styled Component (CSS in JS)  
    スタイルを当てたコンポーネントをjs/jsxファイル内で作成する  
    タグに対してスタイルを当てる感じがする  

5. Emotion (CSS in JS)
    インラインスタイル/Styled JSX/Styled Component どの方法でも書けるライブラリのような感じ

6. TailWind CSS  
    CSSフレームワーク(Bootstrapみたいな感じ)  
    すでにスタイルが定義されていて、それをjsxのclassに指定してコンポーネントにスタイルを当てていく  
    導入までがめんどくさい　
    スタイルを使用するコンポーネント側でCSSファイルをimportする必要がある