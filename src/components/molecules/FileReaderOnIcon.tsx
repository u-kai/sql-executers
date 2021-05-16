import {ImageToButton} from "../molecules/ImageToButton"
import { LabelAndFileReader } from "components/molecules/LabelAndFileReader";
import {VFC} from "react"


type Props = {
    texts:string[]
    setTexts: (value: React.SetStateAction<string[]>) => void
}

export const FileReaderOnIcon:VFC<Props>  = (props) =>{
    const {texts,setTexts} = props
    
    return (
        <ImageToButton
            src={"../../../image/folder-blue-documents-icon.png"}>
                <LabelAndFileReader
                    texts={texts}
                    setTexts={setTexts}/>
        </ImageToButton>
    )
}
