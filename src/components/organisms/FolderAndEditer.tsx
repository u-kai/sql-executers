import {EditerAndAutoCorrectModi} from "../organisms/EditerAndAutoCorrectModifypropssenetence"
import {FileReaderOnIcon} from "../molecules/FileReaderOnIcon"
import {SaveFileOnIcon} from "../molecules/SaveFileOnIcon"
import styled from "styled-components"
import {useSentences,UseSentences} from "hocks/useSentences"
import {useState} from "react"
export const FolderAndEditer = () =>{
    const [sentences, setSentences] = useState([""])
    const [colorList,setColorList] = useState<string[][]>([[]])
    return (
        <Contener>
            <FolderContener
            start={2}
            end={3}
            children={
                <FileReaderOnIcon
                texts={sentences}
                setTexts={setSentences}/>
            }
                />
            <FolderContener
            start={3}
            end={4}
            children={
                <SaveFileOnIcon
                text={sentences.join("\n")}
                fileName="d"/>}/>
            <EditerContener
            children={EditerAndAutoCorrectModi({sentences:sentences,
                                                setSentences:setSentences,
                                                colorList:colorList,
                                                setColorList:setColorList})}></EditerContener>
        </Contener>
    )
}
const Contener = styled.div`
display:grid;
grid-template-rows:120px 1fr;
grid-template-columns:50px 150px 150px 1fr;
`
const EditerContener = styled.div`
grid-row:2/3;
grid-column:1/5;
`
const FolderContener = styled.div<{start:number,end:number}>`
grid-row:1/2;
grid-column:${props=>props.start}/${props=>props.end};
`