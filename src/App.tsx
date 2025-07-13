// src/App.tsx
// reactを基本構造として使うよという意味
import { useState } from 'react';
import { niku,yasai,houhou } from './zairyou';
import './App.css';
//**export defaultでどのファイルでも使えるようにしている
// かつこのファイルのメインコンテンツであるということ
// fanction App(){この部分}　この部分がアプリの構造部分　コンポーネント */
export default function App() {

// menuとsetmenuを定義しておく
  const [menu, setMenu] = useState('');
//** ランダム表示のための機能
// Tにすると数字(number)でも文字(string)でも使えるらしい
// arr以降で　1つ取り出す　という動作を行なっているが
// ここの処理を変えると取り出す個数や重複させるかさせないかを選べる*/
  function pickRandom<T>(arr: T[]) : T{
    return arr[Math.floor(Math.random() * arr.length)];
  }
//** ランダムに選んで最終的に文字列(string)で返すという機能
// ``で囲むことによって、変数を埋め込むことができる
// const で定義したものをそのまま埋め込めるので、これを使わないと
// return pickRandom [鶏肉,豚肉,~]となってしまうので、使っている
//   */
  function makeRandomMenu(): string{
    return `${pickRandom(niku)} ✖️ ${pickRandom(yasai)} ✖️ ${pickRandom(houhou)}`;
  }


    return (
    <div className='container'>
      <h1 className='title'>何食べる？</h1>
      {/* ランダムメニュー表示ボタン */}
      <div className='content'>
      <button
      onClick={() => setMenu(makeRandomMenu())}
      className='button'
      >
        ランダムメニューを表示
      </button>
      {/*メニュー表示 */}
      <p className='menu'>{menu}</p>
      </div>    
    </div>
  );
}