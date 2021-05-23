import {ImageToButton} from "../molecules/ImageToButton"
import { LabelAndFileReader } from "components/molecules/LabelAndFileReader";
import {VFC} from "react"
import { colorListState } from "store/colorList";
import {useRecoilState} from "recoil"


export const FileReaderOnIcon = () =>{
    return (
        <ImageToButton
            src={"../../../image/folder-blue-documents-icon.png"}>
                <LabelAndFileReader
                    />
        </ImageToButton>
    )
}
