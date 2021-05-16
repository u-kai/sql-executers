import {ImageToButton} from "../molecules/ImageToButton"
import {VFC} from "react"

type Props = {
    fileName:string
    text:string
}

export const SaveFileOnIcon:VFC<Props> = (props) => {
    const {text,fileName} = props
    const downloadFile = () =>{
        const confirmSave = confirm("保存しますか？")
        if(confirmSave){
            const blob = new Blob([text],{type:"text/plain"})
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.download = `${fileName}.sql`
            a.href = url
            a.click()
            a.remove()
            URL.revokeObjectURL(url)
        }
    }
    return(
        <ImageToButton
            hoverWord={"ファイルに保存"}
            src="../../../image/folder-blue-download-icon.png"
            onClick={downloadFile}/>
    )
}

