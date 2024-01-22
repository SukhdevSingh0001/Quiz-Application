import React, { useState } from 'react'
import './app.css'

let quizApp = [{
  Question: "India is a federal union comprising twenty-eight states and how many union territories?",
  options: ['6', '7', '8', '9'],
  Answer: "8",
},
{
  Question: "Which of the following is the capital of Arunachal Pradesh?",
  options: ['Itanagar', 'Dispur', 'Imphal', 'Panaji'],
  Answer: "Itanagar"
},
{
  Question: "What are the major languages spoken in Andhra Pradesh?",
  options: [' Odia and Telugu', 'Telugu and Urdu', 'Telugu and Kannada', ' All of the above languages'],
  Answer: 'Telugu and Urdu',
},
{
  Question: "Which planet is known as the Red Planet?",
  options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
  Answer: 'Mars',
},
{
  Question: "Who wrote the play Romeo and Juliet?",
  options: ['William Shakespeare', ' Jane Austen', 'Charles Dickens', ' Mark Twain'],
  Answer: 'William Shakespeare',
},
{
  Question: "What is the capital city of Japan?",
  options: ['Beijing', 'Tokyo', 'Seoul', ' Bangkok'],
  Answer: 'Tokyo',
},
{
  Question: "What is the largest organ in the human body?",
  options: ['Heart', 'Liver', 'Brain', '  Skin'],
  Answer: ' Skin',
},
{
  Question: "Who invented the telephone?",
  options: ['Isaac Newton', ' Nikola Tesla', 'Thomas Edison', ' Alexander Graham Bell'],
  Answer: 'Alexander Graham Bell',
},
{
  Question: "Which continent is the most populous?",
  options: ['Asia', 'Africa', ' Europe', ' North America'],
  Answer: 'Asia',
},
{
  Question: "What is the official language of Brazil?",
  options: ['Spanish', 'Portuguese', 'French', ' English'],
  Answer: 'Portuguese',
},


]

let SelectedValue;
let answerValue;
function App() {
  const [lengthQestion, Setlenght] = useState(1)
  const [totelLength, setTotellength] = useState(quizApp.length)
  const [marks, setmarks] = useState(0);
  const [data, setdata] = useState(quizApp[0])
  const [showOverlay, setShowOverlay] = useState(false);
  const [index, setindex] = useState(0);
  function chnagequestion(updatedindex) {
    setindex(updatedindex);
    setdata(quizApp[updatedindex]);
    if (updatedindex === quizApp.length) {
      setindex(0)
      setdata(quizApp[0])
    }
    document.querySelectorAll('.optionBox').forEach((option) => {
      option.style.backgroundColor = '';
    });
    if (SelectedValue === answerValue) {
      setmarks(marks + 5)
    }
    Setlenght(lengthQestion + 1)
    if (lengthQestion == totelLength) {
      Setlenght(totelLength)
    }


  }
  if (lengthQestion === totelLength) {
    document.getElementById("hidebutton").style.display = 'none';
  }
  if (totelLength === lengthQestion) {
    document.getElementById("showbutton").style.display = 'block';
  }


  function backQuestion(backIndex) {
    setindex(backIndex);
    setdata(quizApp[backIndex]);
    Setlenght(lengthQestion - 1);
    if (lengthQestion === 1) {
      Setlenght(1);
      setdata(quizApp[0]);
      setindex(0);
    }
    if (totelLength >= lengthQestion) {
      document.getElementById("hidebutton").style.display = 'block';
      document.getElementById("showbutton").style.display = 'none';
    }
  }
  function handleclick(e) {
    SelectedValue = e.target.innerHTML;
    answerValue = quizApp[index].Answer;
    document.querySelectorAll('.optionBox').forEach((option) => {
      option.style.backgroundColor = '';

    });

    if (e.target.style.backgroundColor === 'rgb(79 96 109)') {
      e.target.style.backgroundColor = '';

    } else {
      e.target.style.backgroundColor = 'rgb(79 96 109)';

    }


  }


  function Overlay({ marks, onClose, onRestart }) {
    return (
      <div className="overlay">
        <div className="overlay-content">
          <h1>Quiz Completed!</h1>
          <p>Your score: {marks}</p>
          <div className="closerestartbtn">

            <button onClick={onClose} >Close</button>
            <button onClick={onRestart}>Restart</button>
          </div>
        </div>
      </div>
    );
  }
  function sumbitbtn() {
    if (SelectedValue === answerValue) {
      setmarks(marks + 5)

    }


    setShowOverlay(true);
  }

  function closeOverlay() {
    setShowOverlay(false);
  }

  function restartQuiz() {
    Setlenght(1);
    setTotellength(quizApp.length);
    setmarks(0);
    setdata(quizApp[0]);
    setindex(0);
    setShowOverlay(false);
    document.getElementById("hidebutton").style.display = 'block';
    document.getElementById("showbutton").style.display = 'none';
  }


  return (
    <>
      <div className="quiz">


        <div className="qestions">
          <div className="length">
          <h3 id='heading'>{marks}</h3>
          <div style={{display:'flex'}}>

            <h3>{lengthQestion}</h3>
            <h3>/</h3>
            <h3>{totelLength}</h3>
          </div>

          </div>
          <span className='qes'>Qestion..{data.Question}</span>
          <div className="options">

            {data.options.map((option, optionindex) => {
              return <div className='optionBox' type='' onClick={(e) => { handleclick(e) }}  >{option}</div>
            })}
          </div>
          <div className="buttonsNextBack">
            <div>

              <button className='quizbutton' id='next' onClick={() => backQuestion(index - 1)}>Back</button>
            </div>
            <div>

              <button className='quizbutton' id='hidebutton' onClick={() => chnagequestion(index + 1)}
              >Next</button>
              <button className='quizbutton hide' id='showbutton' onClick={sumbitbtn}>Submit</button>
            </div>

          </div>
        </div>
        {showOverlay && (
          <Overlay marks={marks} onClose={closeOverlay} onRestart={restartQuiz} />
        )}
      </div>
    </>
  )
}

export default App
