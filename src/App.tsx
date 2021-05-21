import { TextareaAndImage } from "components/molecules/TextareaAndImage";
import { TextareaCreate } from "components/organisms/TextareaCreate";
import { TextareaCreateProps } from "components/organisms/TextareaCreateprops";
import { TextareaInsert } from "components/organisms/TextareInsert";
import {FileReaderOnIcon} from "components/molecules/FileReaderOnIcon"
import { TextareaInsertProps } from "components/organisms/TextareInsertProps";
import { useState } from "react";
import {Button} from "components/atoms/Button"
import {EditerAndAutoCorrects} from "components/organisms/EditerAndAutoCorrects"
import { ImageToButton } from "components/molecules/ImageToButton";
import {StyledType} from "components/styledTypes/styledType"
import { LabelAndFileReader } from "components/molecules/LabelAndFileReader";
import { SaveFileOnIcon } from "components/molecules/SaveFileOnIcon";
import {AutoCorrects} from "components/molecules/AutoCorrects"
import {InputAndCopy} from "components/molecules/InputAndCopy"
import { InputAndCopyAndLabel } from "components/organisms/InputAndCopyAndLabel";
// import {EditerAndAutoCorrectModi} from "components/organisms/EditerAndAutoCorrects"
import {EditersAndButton} from "components/organisms/EditersAndButton"
import { FolderAndEditer } from "components/organisms/FolderAndEditer";
import {ButtonAppBar} from "components/atoms/ButtonAppBar-MaterialUI";
import { SQLExrcuters } from "components/pages/SQLExecuters";
function App() {
  const [toggle,setToggle] = useState(true)
  const [test,setTest] = useState(["testdayo","uhyohyo"])
  const fileName = "yeha"
  const inputstyle:StyledType = {
    outline:"solid",
    // position:"absolute"
  }
  const [char,setChar] = useState("")
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    console.log(e)
    setChar(e.target.value)
  }
  return (
    <SQLExrcuters></SQLExrcuters>
  //   <>
  //   <Button
  //   onClick={()=>setToggle(!toggle)}
  //   ></Button>
  //   {toggle ? (
  //     // <EditerAndAutoCorrectModi></EditerAndAutoCorrectModi>
  //     <EditersAndButton></EditersAndButton>
  //     // <InputAndCopyAndLabel
  //     // style={inputstyle}
  //     // index={1}
  //     // handleChange={handleChange}
  //     // colorList={["red","black"]}
  //     // sentence={char}
  //     // ></InputAndCopyAndLabel>
  //     // <InputAndCopy
  //     // handleChange={handleChange}
  //     // sentence={char}
  //     // colorList={["red","black"]}
  //     // index={1}
  //     // style={inputstyle}
  //     // />
    
  //     // autoCorrects={["hello worle","konnnithiha","ni-hao"]}
  //     // position={{x:100,y:100}}
  //     // handleClick={(e)=>console.log(e)}
  

  
  //     // <SaveFileOnIcon
  //     // text={test[0]}
  //     // fileName={fileName}
  //     // ></SaveFileOnIcon>
  //     // <EditerAndAutoCorrect></EditerAndAutoCorrect>
  //   ):(
  //     <TextareaInsertProps></TextareaInsertProps>
  //     // <ButtonAppBar
  //     // buttons={["INSERT","CREATE"]}
  //     // onClicks={[(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>console.log("INSERT"),(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>console.log("CREATE")]}></ButtonAppBar>
  //   // <FileReaderOnIcon
  //   // texts={test}
  //   // setTexts={setTest}></FileReaderOnIcon>
  //   // )}
  //   )}
  // </>
  );
}

export default App;
