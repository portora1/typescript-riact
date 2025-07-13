// src/App.tsx
// reactを基本構造として使うよという意味
import { useState } from 'react';
import { niku,yasai,houhou } from './zairyou';
import './App.css';
//**export defaultでどのファイルでも使えるようにしている
// かつこのファイルのメインコンテンツであるということ
// fanction App(){この部分}　この部分がアプリの構造部分　コンポーネント */
export default function App() {

// mとsを定義しておく
  const [meat, setMeat] = useState('');
  const [vege, setVege] = useState('');
  const [method, setMethod] = useState('');
  const [result, setResult] = useState('');

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

  const handleRandomMeat = () => setMeat(pickRandom(niku));
  const handleRandomVege = () => setVege(pickRandom(yasai));
  const handleRandomMethod = () => setMethod(pickRandom(houhou));

  const handleResult = () => {
    if (meat && vege && method) {
      setResult(`${meat} ✖️ ${vege} ✖️ ${method}`);
    } else {
      setResult('全てランダムにしてから結果を表示してください');
    } 
    };
    const handleReset = () => {
      setMeat(pickRandom(niku));
      setVege(pickRandom(yasai));
      setMethod(pickRandom(houhou));
      setResult('');
    };

    return (
    <div className='container'>
      <h1 className='title'>何食べる？</h1>
      {/* ランダムメニュー表示ボタン */}
      <div className='content'>
      <div className='random-bottuons'>
      <button onClick={handleRandomMeat}>肉をランダム</button>
      <button onClick={handleRandomVege}>野菜をランダム</button>
      <button onClick={handleRandomMethod}>調理法をランダム</button>
      </div>
    
    <div className='display-items'>
      <div className='item'>
        <p>{meat}</p>
      <button onClick={handleRandomMeat}>肉を引き直す</button>
      </div>
      <div className='item'>
        <p>{vege}</p>
      <button onClick={handleRandomVege}>野菜を引き直す</button>
      </div>
      <div className='item'>
        <p>{method}</p>
      <button onClick={handleRandomMethod}>調理法を引き直す</button>
      </div>
    </div>
    <div className='result-buttons'>
      <button onClick={handleResult}>結果</button>
      <button onClick={handleReset}>引き直す</button>
    </div>
      <p className='menu'>{result}</p>    
    </div>
  </div>
  );
}
//チャットGPTに画像を送れる制限が来たため終了