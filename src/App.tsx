import { TextareaAndImage } from "components/molecules/TextareaAndImage";
import { TextareaCreate } from "components/organisms/TextareaCreate";
import { TextareaCreateProps } from "components/organisms/TextareaCreateprops";
import { TextareaInsert } from "components/organisms/TextareInsert";
import {FileReaderOnIcon} from "components/molecules/FileReaderOnIcon"
import { TextareaInsertProps } from "components/organisms/TextareInsertProps";
import { useState } from "react";
import {Button} from "components/atoms/Button"

function App() {
  const [toggle,setToggle] = useState(true)


  return (
    <>
    <Button
    onClick={()=>setToggle(!toggle)}
    ></Button>
    {toggle ? (
      <TextareaInsertProps></TextareaInsertProps>
    ):(
      <TextareaCreateProps></TextareaCreateProps>
    )}
    </>
  );
}

export default App;
