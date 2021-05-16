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
function App() {
  const [toggle,setToggle] = useState(true)
  const [test,setTest] = useState(["testdayo","uhyohyo"])
  const fileName = "yeha.sql"
  return (
    <>
    <Button
    onClick={()=>setToggle(!toggle)}
    ></Button>
    {toggle ? (
      <SaveFileOnIcon
      text={test[0]}
      fileName={fileName}
      ></SaveFileOnIcon>
      // <EditerAndAutoCorrect></EditerAndAutoCorrect>
    ):(
    <FileReaderOnIcon
    texts={test}
    setTexts={setTest}></FileReaderOnIcon>
    )}
    </>
  );
}

export default App;
