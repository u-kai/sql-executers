import {useState} from "react"
import {ChangeColorRegDatas} from "../datas/Datas"

export const useAutoCorrects = () => {
    const [autoCorrects, setAutoCorrect] = useState<string[]>([])
    const findAutoCorrect = (word:string) => {
        let matchAutoCorrects:string[] = []
        const wordLength = word.length - 1
        for (let key in ChangeColorRegDatas){
            if(ChangeColorRegDatas[key][wordLength]===undefined){
                continue
            }
            const pattern:RegExp = ChangeColorRegDatas[key][wordLength]
            if(pattern.test(word)){
                matchAutoCorrects = [...matchAutoCorrects,key]
            }
        }
        return matchAutoCorrects
    }

    const sortAutoCorrect = (word:string) => {
        const matchAutoCorrects = findAutoCorrect(word)
        if(matchAutoCorrects.length !== 0){
            let primaryList:string[] = []
            let noPrimaryList:string[] = []
            const reg = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "i")
            matchAutoCorrects.map((key:string)=>{
                if(reg.test(key)){
                    primaryList = [...primaryList,key]
                }else{
                    noPrimaryList = [...noPrimaryList,key]
                }
            })
            setAutoCorrect(([...primaryList,...noPrimaryList]))
            return true             
        }
        return false
    }
    return {autoCorrects, sortAutoCorrect}
}
    
        
