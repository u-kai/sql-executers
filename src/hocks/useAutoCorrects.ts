import {useState} from "react"
import {useIsDisplayAutoCorrects} from "./useIsDisplayAutoCorrects"
import {ChangeColorRegDatas} from "../datas/ChangeColorRegDatas"
export const useAutoCorrects = () => {
    const [autoCorrects, setAutoCorrect] = useState<string[]>([])
    const {isDisplayAutoCorrects,displayAutoCorrects,setIsDisplayAutoCorrects,notDisplayAutoCorrects} = useIsDisplayAutoCorrects()
    
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
            console.log("match")
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
            //displayAutoCorrects()
             
        }
        return false
        // notDisplayAutoCorrects()
        // return 
    }
    return {autoCorrects, sortAutoCorrect}
}
    
        
