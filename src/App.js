import './App.css';
import React, {useState} from 'react';

function App() {

  const [screenData,setScreenData] = useState({
    operator: "",
    num: "",
    prevNum: ""
  });

  //claculator Buttons
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
    // if (screenData.operator!== "" && screenData.num !== "" && screenData.prevNum === "")
    // {
    //   let tempvla = {operator: screenData.operator,num: "",prevNum: screenData.num};
      
    //   resetClickHandler();
    //   setScreenData(tempvla);    
    // }
    // let tempData = {
    //   operator: screenData.operator,
    //   num:screenData.num+e.target.value,
    //   prevNum: parseFloat(screenData.prevNum),      
    // };
    // setScreenData(tempData); 
    if (screenData.operator!== "" && screenData.num !== "" && screenData.prevNum === "")
    {
      let tempvla = {operator: screenData.operator,num: "",prevNum: screenData.num};        
      
      let tempData = {
        operator: tempvla.operator,
        num:e.target.value,
        prevNum: tempvla.prevNum,      
      };
      setScreenData(tempData);   
    }
    else{let tempData = {
      operator: screenData.operator,
      num:screenData.num+e.target.value,
      prevNum: parseFloat(screenData.prevNum),      
    };
    setScreenData(tempData); }
    
  };

  //Operator button
  const operatorClickHandler = (e) =>{

    screenData.operator === "" 
    ? setScreenData({operator: e.target.value,num: "",prevNum: parseFloat(screenData.num)})
    : screenData.operator !== e.target.value && screenData.num === ""
    ? setScreenData({operator: e.target.value,num: "",prevNum: screenData.prevNum})
    : screenData.operator !== "" && screenData.prevNum !== "" && screenData.num !== ""
    ? equalsClickHandler(e)
    : setScreenData(...setScreenData);
  };
  

  //percentage Calculation
  const percentClickHandler = (e) =>{
    let tempData = {operator: "",num: parseFloat(screenData.num/100),prevNum: parseFloat(screenData.num)};
    setScreenData(tempData);
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
      num: equals.toString(),      
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
                : btn === "%"
                ? percentClickHandler
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
