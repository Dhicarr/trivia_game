import { useState, useEffect } from "react";
import API from "./API";
import { FormControl, Select, MenuItem, Button, TextField } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import triviaList from "./TriviaList";
import axios from 'axios';


const TriviaGame = ({}) => {
  const [category, setCategory] = useState("any");
  const [questionsData, setQuestionsData] = useState("");
  const [view, setView] = useState("start");
  const [questionNum, setQuestionNum] = useState(1)
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [username, setUsername] = useState("");
  const [showSubmit, setShowSubmit] = useState(true);

  useEffect(() => {
    if(view==="leaderboard"){
      refreshLeaderboard();
    }
    console.log(view)
  }, [view]);

  const refreshLeaderboard = () => {
    API.get("/")
      .then((res) => {
        setLeaderboard(res.data);
        console.log(res.data)
      })
      .catch(console.error);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleStartQuiz = () => {
    axios.get((category=="any") ? 
    "https://opentdb.com/api.php?amount=40" : 
    ("https://opentdb.com/api.php?amount=40&category="+category))
    .then((res) => {
      setQuestionsData(res.data.results);
      setView("mainGame");
      setScore(0);
      setQuestionNum(1);
      setShowSubmit(true);
    })
  };

  const handleMainMenu = () => {
    setView("start")
  };

  const handleLeaderboard = () => {
    setView("leaderboard")
  };

  const handleSubmit = () => {
      let name=username
      let item = { name, score, category };
      API.post("/", item).then(() => {
        refreshLeaderboard();
        setShowSubmit(false);
      });
  };

  const handleChoiceSelect = (choice) => {
    if(choice == questionsData[questionNum-1].correct_answer){
      setView("correct");
      setScore(score+1)
      setQuestionNum(questionNum+1)
      setTimeout(
        () => setView("mainGame"), 
        500
      );
    }
    else{
      setView("gameOver")
    }
  };

  const randomQuestionView = (questionData) =>{
    const shuffleArray = (array)=> {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
    }
    let listOfChoices = JSON.parse(JSON.stringify(questionData.incorrect_answers));
    listOfChoices.push(questionData.correct_answer)
    shuffleArray(listOfChoices)
    
    return (
      <div className="buttonTray">
        {listOfChoices.map((choice, index) => {
          return (
            <Button
              className="button"
              onClick={()=>handleChoiceSelect(choice)}
              style={{margin:"5px", lineHeight:"1.4", fontSize:"1.2em", textTransform:"capitalize"}}
            >
              {decodeHtml(choice)}
            </Button>
            )
        })}
      </div>
    )
  }

  const decodeHtml = (html) =>  {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  return (
    <div className="triviaGame">
      {(view=="start") &&
        <div className="container">
          <div className="formContainer">
            <h1 style={{marginBottom:"0.7em"}}>Trivia Quiz</h1>
            <FormControl defaultValue="" className="triviaSelect">
              <Select 
                value={category} 
                onChange={handleCategoryChange}
                sx={{
                  textAlign:"center",
                  fontSize:"18px",
                  color: "white",
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                    border: 'solid 2px'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '.MuiSvgIcon-root ': {
                    fill: "white !important",
                  }
                }}
              >
                {Object.entries(triviaList).map(([key, value]) => {
                   return (<MenuItem value={key}>{value}</MenuItem>)
                })}
              </Select>
            </FormControl>
            <Button className="button" variant="outlined" style={{marginTop:"1em", width:"100%"}} onClick={handleStartQuiz}>
              Start
            </Button>
            <Button className="button" variant="outlined" style={{marginTop:"1em", width:"100%"}} onClick={handleLeaderboard}>
              Leaderboard
            </Button>
          </div>
        </div>
      }
      {(view=="mainGame") && 
        <div className="gameContainer">
          <div className="questionNumber">Question {questionNum}:</div>
          <div className="questionText" style={{marginBottom:"1.5em", fontWeight:"400"}}>
            {decodeHtml(questionsData[questionNum-1].question)}
          </div>
          {randomQuestionView(questionsData[questionNum-1])}
        </div>
      }
      {(view=="gameOver") && 
        <div className="gameContainer">
          <div style={{textAlign:"center", marginBottom:"10px"}}><CancelIcon style={{width:"50px", height:"50px"}}/></div>
          <div className="questionText" style={{fontWeight:"bold"}}>Game Over</div>
          <div className="questionText">Correct Answer: {decodeHtml(questionsData[questionNum-1].correct_answer)}</div>
          <div className="questionText">Score: {score}</div>
          {!showSubmit ?
            <div style={{color:"lightgreen"}}>
              Submitted Score
            </div>
            :
            <div>
              <div className="questionText">
                Submit Score?
              </div>
              <div style={{display:"flex"}}>
                <TextField
                  id="standard-name"
                  placeholder="Enter Your Name"
                  value={username}
                  type="contained"
                  style={{width:"100%"}}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  inputProps={{ maxLength: 12 }}
                  sx={{
                    textAlign:"center",
                    fontSize:"18px",
                    color: "white",
                    input: { color: 'white' },
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white !important',
                      border: 'solid 2px'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '.MuiSvgIcon-root ': {
                      fill: "white !important",
                    }
                  }}
                />
                <Button className="submitIconButton" onClick={handleSubmit}>
                  <ArrowForwardIcon className="submitIcon"/>
                </Button>
              </div>
            </div>
          }
          <Button className="button" variant="outlined" style={{marginTop:"1em", width:"100%"}} onClick={handleLeaderboard}>
            Leaderboard
          </Button>
          <Button variant="outlined" className="button" style={{marginTop:"1em", width:"100%", fontSize:"16px"}} onClick={handleStartQuiz}>Play Again</Button>
          <Button variant="outlined" className="button" style={{marginTop:"1em", width:"100%", fontSize:"16px"}} onClick={handleMainMenu}>Main Menu</Button>
        </div>
      }
      {(view=="correct") && 
        <div className="gameContainer" style={{border:'2px solid white', borderRadius:'0.5em'}}>
          <span style={{fontSize:"20px"}}>Correct!</span>
        </div>
      }
      {(view=="leaderboard") && 
        <div className="gameContainer">
          <h2>Leaderboard</h2>
          <table>
            <tr style={{borderBottom:"2px solid white"}}>
              <th>Name</th>
              <th>Score</th>
              <th>Category</th>
            </tr>
            {leaderboard.map((item, index) => {
              return (
                <tr style={{color:
                            index==0 ? "gold":
                            index==1 ? "silver":
                            index==2 ? "rgb(254 145 38)":
                            "white"
                          }}>
                  <td>{item.name}</td>
                  <td>{item.score}</td>
                  <td>{triviaList[item.category]}</td>
                </tr>
              )
            })}
          </table>
          <Button variant="outlined" className="button" style={{marginTop:"1em", width:"100%", fontSize:"16px"}} onClick={handleMainMenu}>Back</Button>
        </div>
      }
      <div className="wavesContainer">
          <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
              <defs>
                  <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
              </defs>
              <g className="parallax">
                  <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                  <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                  <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                  <use href="#gentle-wave" x="48" y="7" fill="#fff" />
              </g>
          </svg>
      </div>
      <div className="credits">By Richard Ma</div>
    </div>
  );
};

export default TriviaGame;