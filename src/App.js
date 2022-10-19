import './App.css';

import {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {

  const [counter, setCounter] = useState(0);

  const [isStarted, setIsStarted] = useState(false);
  
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState('');
 
  const [result, setResult] = useState({
    correct: 0,
    notCorrect: 0
  });
  const [inputData, setInputData] = useState('');

// useEffect(()=> {
//   for (let i=0; i < 5; i++) {
//     getQuestion();
//     console.log(questions);
//     console.log(i)
//   }
//   // for (let i=0; i < 5; i++) {
//   //   question(i);
//   // }
//   console.log('times');
// }, []);


function getQuestion () {
    const a = Math.round(Math.random() * 100);
    const b = Math.round(Math.random() * 100);
    const c = a * b;
    setAnswers([...answers, +c])
    return `${a} * ${b} = ?`;// `${c}`;
}

function handleSubmit (e) {
  e.preventDefault();
  setAnswers([...answers, inputData]);
  answers[counter] == inputData? setResult({...result, correct: result.correct + 1}) : setResult({...result, notCorrect: result.notCorrect + 1});
  setCounter(counter + 1);

  setInputData('');
  console.log(answers);
  setQuestion(getQuestion());
  counter == 99? setIsFinished(!isFinished) : setIsFinished(isFinished);
  
  
}

function handleChange (e) {
  setInputData(e.target.value)
}

// function askQuestion (i) {
//     const answer = prompt(`сколько будет ${questions[i][0]}`, '');
//     if (questions[i][1] == answer) {
//         setResult({ ...result, correct: result.correct + 1 });
//     } else {
//         setResult({ ...result, notCorrect: result.notCorrect + 1 });
//         setAnswers(...answers, [questions[i], answer]);
//     }
// }

function handleStartButton () {
  setQuestion(getQuestion());
  setIsStarted(!isStarted);
}
  return (
    <div className="App">
      <header className="header">
        {isStarted?
          <div className='header__counter'>{counter}</div>
          :
          ''
        }
        
      </header>
      <main className='main'>
        {isStarted?
          !isFinished?
          <form className='exercise' onSubmit={handleSubmit}>
            <label className='exercise__label'>
              {question}
              <input className='exercise__input' type="text" name="name" onChange={handleChange} value={inputData}/>
            </label>
            <input className='exercise__input exercise__input_type_submit' type="submit" value="Ответить" />
          </form>
          :
          <ul className='exercise__result'>
            <li className='exercise__result-item'>
              Правильно: {result.correct}
            </li>
            <li className='exercise__result-item'>
              Не правильно: {result.notCorrect}
            </li>
          </ul>
        :
          <button className='exercise__start-button' onClick={handleStartButton}>Go</button>
        }
      
      </main>
    </div>
  );
}

export default App;

