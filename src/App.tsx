import { TextareaAndImage } from "components/molecules/TextareaAndImage";
import { TextareaCreate } from "components/organisms/TextareaCreate";
import { TextareaCreateProps } from "components/organisms/TextareaCreateprops";
import { TextareaInsert } from "components/organisms/TextareInsert";
import {FileReaderOnIcon} from "components/molecules/FileReaderOnIcon"
import { TextareaInsertProps } from "components/organisms/TextareInsertProps";
import { useState } from "react";
import {Button} from "components/atoms/Button"
import {EditerAndAutoCorrect} from "components/organisms/EditerAndAutoCorrect"
import { ImageToButton } from "components/molecules/ImageToButton";
import {StyledType} from "components/styledTypes/styledType"
import { LabelAndFileReader } from "components/molecules/LabelAndFileReader";
import { SaveFileOnIcon } from "components/molecules/SaveFileOnIcon";
import {AutoCorrects} from "components/molecules/AutoCorrects"
import {InputAndCopy} from "components/molecules/InputAndCopy"
import { InputAndCopyAndLabel } from "components/organisms/InputAndCopyAndLabel";
import {EditerAndAutoCorrectModi} from "components/organisms/EditerAndAutoCorrectModifypropssenetence"
import { FolderAndEditer } from "components/organisms/FolderAndEditer";
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
    <>
    <Button
    onClick={()=>setToggle(!toggle)}
    ></Button>
    {toggle ? (
      // <EditerAndAutoCorrectModi></EditerAndAutoCorrectModi>
      <FolderAndEditer></FolderAndEditer>
      // <InputAndCopyAndLabel
      // style={inputstyle}
      // index={1}
      // handleChange={handleChange}
      // colorList={["red","black"]}
      // sentence={char}
      // ></InputAndCopyAndLabel>
      // <InputAndCopy
      // handleChange={handleChange}
      // sentence={char}
      // colorList={["red","black"]}
      // index={1}
      // style={inputstyle}
      // />
    
      // autoCorrects={["hello worle","konnnithiha","ni-hao"]}
      // position={{x:100,y:100}}
      // handleClick={(e)=>console.log(e)}
  

  
      // <SaveFileOnIcon
      // text={test[0]}
      // fileName={fileName}
      // ></SaveFileOnIcon>
      // <EditerAndAutoCorrect></EditerAndAutoCorrect>
    ):(
      null
    // <FileReaderOnIcon
    // texts={test}
    // setTexts={setTest}></FileReaderOnIcon>
    // )}
    )}
  </>
  );
}

export default App;
