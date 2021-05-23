import {ChangeColorRegDatas} from "../datas/Datas"
import {useRecoilState} from "recoil"
import { colorListState } from "store/colorList"

export const useColorList = () => {
    const [colorList,setColorList] = useRecoilState(colorListState)
    const addRowColorList = () => {
        setColorList([...colorList,[]])
    }
    const removeRowColorList = () => {
        setColorList(removeLastList(colorList))
    }
    const updateColorList = (wordList:string[],index:number) => {
        let clones:string[][] = []
        colorList.map((color)=>{
            clones = [...clones,[...color]]
        })
        wordList.map((word,wordIndex)=>{
            clones[index][wordIndex] = whatWordColor(word)
        })
        setColorList([...clones])
    }

    return {colorList, addRowColorList, removeRowColorList, updateColorList ,setColorList}
}

export const whatWordColor = (word:string):string => {
    if(word.length === 0){
        return "black"
    }
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