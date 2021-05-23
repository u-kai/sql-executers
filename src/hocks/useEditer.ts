import { useColorList } from "./useColorList"
import {useFocusRowIndex} from "./useFocusRowIndex"
import { sentencesState } from "store/sentences";
import {useRecoilState} from "recoil"


export const useEditer = (
    colorList:string[][],setColorList:React.Dispatch<React.SetStateAction<string[][]>>) =>{
    const removeLastValue = (list:string[]) => {
        return list.filter((_:string,i:number)=>i!==list.length-1)
    }
    const [sentences,setSentences] = useRecoilState(sentencesState)
    const addRowSentence = () => {
        setSentences([...sentences,""])
    }
    const removeRowSentence = () => {
        setSentences(removeLastValue(sentences))
    }
    const updateSentences = (newCharacter:string,index:number) => {
        console.log(index,newCharacter)
        let clone = sentences.slice() 
        clone[index] = newCharacter
        console.log(clone)
        setSentences([...clone])
    }     
    const { 
            addRowColorList, 
            removeRowColorList,
            updateColorList
        } = useColorList(colorList, setColorList,)
    const { focusRowIndex,
            focusElement,
            moveFocusToClickedElement,
            incrementFocusRowIndex,
            decrementFocusRowIndex
        } = useFocusRowIndex()

    const addInitRowDatas = () => {
        addRowSentence()
        addRowColorList()
    }
    const removeRowDatas = () => {
        removeRowSentence()
        removeRowColorList()
    }
    const isFocusRowSentencesNull = ():boolean =>{
        return sentences[focusRowIndex] === "" 
    }
    const isFocusRowIndexInit = ():boolean => {
        return focusRowIndex === 0
    }
    const isFocusRowIndexEnd = ():boolean => {
        return focusRowIndex === sentences.length-1
    }

    return {sentences, colorList, focusRowIndex,
            updateSentences, updateColorList, setColorList,
            addInitRowDatas, removeRowDatas,
            focusElement, moveFocusToClickedElement,
            incrementFocusRowIndex, decrementFocusRowIndex,
            isFocusRowSentencesNull, isFocusRowIndexInit, isFocusRowIndexEnd}
}

