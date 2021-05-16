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
  const imageStyle:StyledType = {
    width:"120px",
    height:"100px",
    position:"absolute",
    top:"0px",
    left:"0px"
}
  console.log(test)
  return (
    <>
    <Button
    onClick={()=>setToggle(!toggle)}
    ></Button>
    {toggle ? (
      <EditerAndAutoCorrect></EditerAndAutoCorrect>
    ):(
      <ImageToButton
      src={"../../../image/folder-blue-documents-icon.png"}
      imageStyle={imageStyle}
      >
    <LabelAndFileReader
    texts={test}
    setTexts={setTest}></LabelAndFileReader>
      </ImageToButton>
    )}
    </>
  );
}

export default App;
