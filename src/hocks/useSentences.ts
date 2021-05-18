import {useState} from "react"

export const useSentences = () => {
    const [sentences, setSentences] = useState<string[]>([""])

    const addRowSentence = () => {
        setSentences([...sentences,""])
    }
    const removeRowSentence = () => {
        setSentences(removeLastValue(sentences))
    }
    const updateSentences = (newCharacter:string,index:number) => {
        sentences[index] = newCharacter
        setSentences([...sentences])
    } 
    return { sentences, addRowSentence, removeRowSentence,updateSentences }
}
const removeLastValue = (list:string[]) => {
    return list.filter((_:string,i:number)=>i!==list.length-1)
}