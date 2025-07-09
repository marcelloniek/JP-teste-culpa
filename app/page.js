"use client";

import { useState } from 'react';

const perguntas = [
  "小さな過ちや意図しない過去の間違いでも、自分自身を許すのが難しい。",
  "明確に自分の責任でない場合でも、状況や出来事に対して罪悪感を感じることが多い。",
  "周囲の人々が不幸や苦しみを感じていると、自分に責任があると思ってしまうことが頻繁にある。",
  "罪悪感が強すぎて、自分の長所を認めたり、他人からの褒め言葉を受け入れるのが難しい。",
  "過去の失敗を何度も頭の中で繰り返し、そのことで恥や後悔を頻繁に感じる。",
  "最近、自分は幸せになる資格がない、または自分がしたことやしなかったことに対して厳しく罰せられるべきだと思ったことがある。", // FLAG
  "過去の状況でもっとできたはずだと感じて、よく悲しんだり苦しくなったりする。",
  "頻繁な罪悪感や自己批判的な考えのせいで、感情面や自己評価が深刻に影響を受けている。",
  "間違いを犯して再び罪悪感を感じるのが怖くて、決断を下すのが難しい。",
  "過去の過ちを恥じたり非難されたりするのを恐れて、人や状況を避けてしまう。"
];

export default function TesteCulpa() {
  const [respostas, setRespostas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const registrarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[indiceAtual] = valor;
    setRespostas(novasRespostas);

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado(novasRespostas);
    }
  };

  const calcularResultado = (respostas) => {
    if (respostas[5] >= 3) { // FLAG
      setResultado("赤");
    } else {
      const soma = respostas.reduce((a, b) => a + b, 0);
      if (soma <= 20) setResultado("緑");
      else if (soma <= 35) setResultado("黄");
      else setResultado("赤");
    }
  };

  const reiniciarTeste = () => {
    setRespostas(Array(10).fill(0));
    setResultado(null);
    setIndiceAtual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">罪悪感テスト</h2>
          <p className="mb-4">{perguntas[indiceAtual]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registrarResposta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">質問 {indiceAtual + 1} / {perguntas.length}</p>
        </>
      ) : (
        <>
          
          <h2 className="text-xl font-semibold mb-4 text-center">結果: {resultado}</h2>
          <img
            src={
              resultado === "緑"
                ? "/images/semaforo-verde.png"
                : resultado === "黄"
                ? "/images/semaforo-amarelo.png"
                : "/images/semaforo-vermelho.png"
            }
            alt={`信号表示: ${resultado}`}
            className="w-40 h-auto mx-auto mb-4"
          />
          {resultado === "緑" && (
            <p className="text-center">あなたはこの問題に非常によく対処できており、感情的にも安定しています。他の人を支援することも可能です。</p>
          )}
          {resultado === "黄" && (
            <p className="text-center">取り組むべき感情的問題の兆候がありますが、決意と支援があれば克服可能です。</p>
          )}
          {resultado === "赤" && (
            <p className="text-center">この問題に関するあなたの感情的な問題は専門家の助けが必須です。早急に医師や心理士の支援を受けてください。</p>
          )}
          <button
            className="mt-6 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700 block mx-auto"
            onClick={reiniciarTeste}
          >
            テストをやり直す
          </button>
    
        </>
      )}
    </div>
  );
}
