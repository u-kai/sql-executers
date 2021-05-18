import {useState} from "react"
import {ChangeColorRegDatas} from "../datas/Datas"

export const useColorList = () => {
    const [colorList, setColorList] = useState<string[][]>([[]])

    const addRowColorList = () => {
        setColorList([...colorList,[]])
    }
    const removeRowColorList = () => {
        setColorList(removeLastList(colorList))
    }
    const updateColorList = (wordList:string[],index:number) => {
        wordList.map((word,wordIndex)=>{
            colorList[index][wordIndex] = whatWordColor(word)
        })
        setColorList([...colorList])
    }

    return {colorList, addRowColorList, removeRowColorList, updateColorList}
}

const whatWordColor = (word:string):string => {
    for (let key in ChangeColorRegDatas){
        if(!isExistRegData(word,key)){
            continue
        }
        if(isWordMatch(key,word)){
            return "red"
        }
    }
    return "black"
}

const isExistRegData = (word:string,key:string):boolean => {
    const index = word.length - 1
    if(ChangeColorRegDatas[key][index]===undefined){
        return false
    }
    return true
}

const isWordMatch = (key:string,word:string) => {
    return key === word || key.toLocaleLowerCase() === word
}
const removeLastList = (list:string[][]) => {
    return list.filter((_:string[],i:number)=>i!==list.length-1)
}