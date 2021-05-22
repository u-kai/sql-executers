import {EditerAndAutoCorrects} from "./EditerAndAutoCorrects"
import {FileReaderOnIcon} from "../molecules/FileReaderOnIcon"
import {SaveFileOnIcon} from "../molecules/SaveFileOnIcon"
import styled from "styled-components"
import {useState} from "react"
import {BasicTextFields} from "../atoms/TextFiled_MaterialUI"
import {VFC} from "react"

type Props = {
    sentences:string[]
    setSentences:React.Dispatch<React.SetStateAction<string[]>>
}
export const FolderAndEditer:VFC<Props> = (props) =>{
    const {sentences, setSentences} = props
    const [colorList,setColorList] = useState<string[][]>([[]])
    const [fileName,setFileName] = useState("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.value)
    }
    
    return (
        <Contener>
            <FolderContener
            start={2}
            end={3}
            children={
                <FileReaderOnIcon
                texts={sentences}
                setTexts={setSentences}
                colorList={colorList}
                setColorList={setColorList}/>
            }
                />
            <FolderContener
            start={3}
            end={4}
            children={
                <SaveFileOnIcon
                text={sentences.join("\n")}
                fileName={fileName}/>}/>
            <InputContener>
            <BasicTextFields
            label="File name"
            handleChange={handleChange}
            value={fileName}
            />
            </InputContener>
            <EditerContener
            children={EditerAndAutoCorrects({sentences:sentences,
                                                setSentences:setSentences,
                                                colorList:colorList,
                                                setColorList:setColorList})}></EditerContener>
        </Contener>
    )
}
const Contener = styled.div`
display:grid;
grid-template-rows:60px 70px 1fr;
grid-template-columns:10px 70px 70px  280px;
`
const EditerContener = styled.div`
grid-row:3/4;
grid-column:1/5;
`
const FolderContener = styled.div<{start:number,end:number}>`
grid-row:1/2;
grid-column:${props=>props.start}/${props=>props.end};
`
const InputContener = styled.div`
grid-row:2/3;
grid-column:1/2;
`
