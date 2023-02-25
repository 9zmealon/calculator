import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';

function App() {

  const [screenData,setScreenData] = useState({
    operator: "",
    num: "",
    prevNum: ""
  });

  const btnValues = [
    ["C","+-","%","/"],
    [7,8,9,"x"],
    [4,5,6,"-"],
    [1,2,3,"+"],
    [0,".","="]
  ];


//Reset or "C" Button
  const resetClickHandler = () =>{
    let reset = {
          operator: "",
          num: "",
          prevNum: ""};
    setScreenData(reset);
  }
  
//Invert or "+-" button 
  const invertClickHandler = () =>{
    let reset = {operator: "",num: 0 - parseFloat(screenData.num),prevNum: ""};
    setScreenData(reset)
  }

  //Num or "0-9" Button
  const numClickHandler = (e) =>{    
    let tempData = {
      operator: screenData.operator,
      num:screenData.num+e.target.value,
      prevNum: parseFloat(screenData.prevNum),      
    };
    setScreenData(tempData); 
  };

  //Operator button
  const operatorClickHandler = (e) =>{
    screenData.operator === "" 
    ? setScreenData({operator: e.target.value,num: "",prevNum: parseFloat(screenData.num)})
    : equalsClickHandler(e);
  };


  //"=" or equals button 
  const equalsClickHandler = (e) =>{
    let equals;

    screenData.operator === "+"
      ? (equals = parseFloat(screenData.prevNum) + parseFloat(screenData.num))
      : screenData.operator === "-"
      ? (equals = parseFloat(screenData.prevNum) - parseFloat(screenData.num))
      : screenData.operator === "x"
      ? (equals = parseFloat(screenData.prevNum) * parseFloat(screenData.num))
      : screenData.operator === "/"
      ? (equals = parseFloat(screenData.prevNum) / parseFloat(screenData.num))
      : (equals = parseFloat(screenData.num));

    let tempData = {
      operator: e.target.value === "=" ? "" : e.target.value,
      num: equals,      
      prevNum: ""
    };
    setScreenData(tempData);
  } 


  //comma clickHandler for "."
  const commaClickHandler = (e) => {
    //convert to array
    let decimalNum;
    let numToArr = String(screenData.num)
      .split("");
      numToArr.includes(".")
      ? decimalNum = screenData.num
      : decimalNum = screenData.num + "."
      setScreenData({
        operator:screenData.operator,
        num: decimalNum,       
        prevNum:screenData.prevNum
      });
  };


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
            value={screenData.num === "" ? screenData.operator : screenData.num}
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
                : btn === "="
                ? equalsClickHandler
                : btn === "/" || btn === "x" || btn === "-" || btn === "+"
                ? operatorClickHandler
                : btn === "."
                ? commaClickHandler
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
