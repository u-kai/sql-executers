import {useState} from "react"
import { useColorList } from "./useColorList"
import {useFocusRowIndex} from "./useFocusRowIndex"
import {useSentences} from "./useSentences"
export const useEditer = () =>{
    const { sentences,
            addRowSentence, 
            removeRowSentence,
            updateSentences
        } = useSentences()
    const { colorList, 
            addRowColorList, 
            removeRowColorList,
            updateColorList
        } = useColorList()
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
            updateSentences, updateColorList, 
            addInitRowDatas, removeRowDatas,
            focusElement, moveFocusToClickedElement,
            incrementFocusRowIndex, decrementFocusRowIndex,
            isFocusRowSentencesNull, isFocusRowIndexInit, isFocusRowIndexEnd}
}

