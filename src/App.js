import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';

function App() {

  const [screendata,setScreenData] = useState({
    sign: "",
    num: 0,
    res: 0
  });

  const btnValues = [
    ["C","+-","%","/"],
    [7,8,9,"x"],
    [4,5,6,"-"],
    [1,2,3,"+"],
    [0,".","="]
  ];



  const resetClickHandler = () =>{
    let reset = {
          sign: "",
          num: 0,
          res: 0};
    setScreenData(reset);
  }
  
  const invertClickHandler = () =>{
    let reset; 
    screendata.sign === "" 
        ? reset = {sign: "-",num: screendata.num,res: 0}          
        : reset = {sign: "",num: screendata.num,res: 0};
    setScreenData(reset)
  }
  const numClickHandler = (e) =>{
    let scrData = {
      sign: screendata.sign,
      num:e.target.value,
      res: 0      
    }
    setScreenData(scrData);
  }




  return (
    <div className="App">

      {/* //Calculator frame */}
      {/* <Wrapper>
          <Screen>
            
          </Screen>

          <ButtonBox>
            <Button></Button>
            <Button></Button>
            <Button></Button>
            <Button></Button>▐...
          </ButtonBox>
      </Wrappeer> */}



      {/* //Screen or Display */}
      <div>
          <input 
            value={screendata.sign+screendata.num}
          />
      </div>
     
      <br/> 


      {/* //Button */}
      <div className='ButtonBox'>
       {btnValues.flat().map((btn,i)=>{
          return(
              <button 
              key={i}
              value={btn}
              onClick={
                btn === "C"
                ? resetClickHandler 
                : btn === "+-"
                ? invertClickHandler
                // : btn === "%"
                // ? percentClickHandler
                // : btn === "="
                // ? equalsClickHandler
                // : btn === "/" || btn === "x" || btn === "-" || btn === "+"
                // ? signClickHandler
                // : btn === "."
                // ? commaClickHandler
                : numClickHandler
              }
              >{btn}</button>
          )
       })} 
        

      </div>


    </div>
  );
}

export default App;
