// src/App.tsx
import { useState } from 'react';
import { niku,yasai,houhou } from './zairyou';
import './App.css';
//**export defaultでどのファイルでも使えるようにしている
export default function App() {
// useStateはreactの機能で、状態を管理するためのもの
// useStateの引数は初期値で、ここでは空文字列を設定

  const [meat, setMeat] = useState('');
  const [vege, setVege] = useState('');
  const [method, setMethod] = useState('');
  const [spinning, setSpinning] = useState({ meat: false, vege: false, method: false });

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
// return pickRandom [鶏肉,豚肉,~]となってしまうので、使っている*/

  // スロット風アニメーション
  // 自分で作ってないのでまだ内容がわからない
  const slotIntervals = { meat: null as number | null, vege: null as number | null, method: null as number | null };
  const slotTimeouts = { meat: null as number | null, vege: null as number | null, method: null as number | null };

  const slotSpin = (type: 'meat' | 'vege' | 'method', arr: string[], setter: (v: string) => void) => {
    setSpinning(s => ({ ...s, [type]: true }));
    if (slotIntervals[type]) clearInterval(slotIntervals[type]!);
    if (slotTimeouts[type]) clearTimeout(slotTimeouts[type]!);
    slotIntervals[type] = setInterval(() => {
      setter(pickRandom(arr));
    }, 60);
    slotTimeouts[type] = setTimeout(() => {
      clearInterval(slotIntervals[type]!);
      setter(pickRandom(arr));
      setSpinning(s => ({ ...s, [type]: false }));
    }, 900 + Math.random() * 600);
  };

  // スロットを止める
  const stopSlot = (type: 'meat' | 'vege' | 'method', arr: string[], setter: (v: string) => void) => {
    if (slotIntervals[type]) clearInterval(slotIntervals[type]!);
    if (slotTimeouts[type]) clearTimeout(slotTimeouts[type]!);
    setter(pickRandom(arr));
    setSpinning(s => ({ ...s, [type]: false }));
  };

  // 全スロット回す
  const handleSpinAll = () => {
    slotSpin('meat', niku, setMeat);
    slotSpin('vege', yasai, setVege);
    slotSpin('method', houhou, setMethod);
  };

  // 不要なhandleResult, setResultを削除。リセットは空欄に戻す
  const handleReset = () => {
    setMeat('');
    setVege('');
    setMethod('');
  };
        <div className='result-buttons'>
          <button onClick={handleReset}>全てリセット</button>
        </div>

    return (
      <div className='container'>
        <h1 className='title'>何食べジャックポット</h1>
        {/* 全スロット回すボタンをスロット枠直上に密着配置 */}
        <div
          className={`slot-frame${spinning.meat ? ' spinning' : ''}`}>
            {meat || '---'}
            {/* ...止めるボタン... */}
          <button className='slot-all-btn' onClick={handleSpinAll} disabled={spinning.meat || spinning.vege || spinning.method}>
            何食べスロットを回す
          </button>
        </div>

        {/* スロット風リザルト画面 */}
        <div className='result-area'>
          <div className={`slot-frame${spinning.meat ? ' spinning' : ''}`}>
            {meat || '---'}
            {spinning.meat && (
              <button className='slot-stop-btn' onClick={() => stopSlot('meat', niku, setMeat)}>
                何
              </button>
            )}
          </div>
          <div className={`slot-frame${spinning.vege ? ' spinning' : ''}`}>
            {vege || '---'}
            {spinning.vege && (
              <button className='slot-stop-btn' onClick={() => stopSlot('vege', yasai, setVege)}>
                食べ
              </button>
            )}
          </div>
          <div className={`slot-frame${spinning.method ? ' spinning' : ''}`}>
            {method || '---'}
            {spinning.method && (
              <button className='slot-stop-btn' onClick={() => stopSlot('method', houhou, setMethod)}>
                るん
              </button>
            )}
          </div>
        </div>
        <div className='result-buttons'>
          <button onClick={handleReset}>リセット</button>
        </div>
      </div>
    );
}
