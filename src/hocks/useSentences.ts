import { sentencesState } from "store/sentences";
import {useRecoilState} from "recoil"

export type UseSentences = ()=>{
    sentences: string[];
    setSentences:React.Dispatch<React.SetStateAction<string[]>>
    addRowSentence: () => void;
    removeRowSentence: () => void;
    updateSentences: (newCharacter: string, index: number) => void;
}
export const useSentences:UseSentences = () => {
    const [sentences,setSentences] = useRecoilState(sentencesState)

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
    return { sentences, setSentences,addRowSentence, removeRowSentence,updateSentences }
}
const removeLastValue = (list:string[]) => {
    return list.filter((_:string,i:number)=>i!==list.length-1)
}