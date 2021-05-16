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
function App() {
  const [toggle,setToggle] = useState(true)
  const [test,setTest] = useState(["testdayo","uhyohyo"])
  console.log(test)
  return (
    <>
    <Button
    onClick={()=>setToggle(!toggle)}
    ></Button>
    {toggle ? (
      <EditerAndAutoCorrect></EditerAndAutoCorrect>
    ):(
    <FileReaderOnIcon
    texts={test}
    setTexts={setTest}></FileReaderOnIcon>
    )}
    </>
  );
}

export default App;
