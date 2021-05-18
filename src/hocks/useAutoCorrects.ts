import {useState} from "react"
import {useIsDisplayAutoCorrects} from "./useIsDisplayAutoCorrects"
import {ChangeColorRegDatas} from "../datas/ChangeColorRegDatas"
export const useAutoCorrects = () => {
    const [autoCorrects, setAutoCorrect] = useState<string[]>([])
    const {displayAutoCorrects} = useIsDisplayAutoCorrects()
    const sortAutoCorrect = (testStr:string)=>{
        let keyList:string[] = []
        let primaryList:string[] = []
        let noPrimaryList:string[] = []
        const index = testStr.length - 1
        for(let key in ChangeColorRegDatas){
            if(ChangeColorRegDatas[key][index]===undefined){
                continue
            }
            const pattern:RegExp = ChangeColorRegDatas[key][index]
            if(pattern.test(testStr)){
                keyList.push(key)
                displayAutoCorrects()
            }
        }
        const reg = new RegExp(testStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "i")
        keyList.map((key:string)=>{
            if(reg.test(key)){
                primaryList.push(key)
            }else{
                noPrimaryList.push(key)
            }
        })
        setAutoCorrect((primaryList.concat(noPrimaryList)))
    }
    return {autoCorrects, sortAutoCorrect}
}