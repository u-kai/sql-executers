

type Props = {
    e:React.KeyboardEvent<HTMLInputElement>
    focusRowIndex:number
    incrementFocusRowIndex:()=>void
    decrementFocusRowIndex:()=>void
    // setFocusIndex:(value: React.SetStateAction<number>) => void
    // setColorList:(value: React.SetStateAction<string[][]>) => void
    sentences:string[]
    addRowDatas:()=>void
    removeRowDatas:()=>void
//     setSentences:(value: React.SetStateAction<string[]>) => void
}


const removeLastValue = (list:string[]) => {
    return list.filter((_:string,i:number)=>i!==list.length-1)
}
const removeLastList = (list:string[][]) => {
    return list.filter((_:string[],i:number)=>i!==list.length-1)
}



export const caseNotDisplayAutoCorrectsHandleKeyDown =(props:Props)=>{
    const {e,focusRowIndex,
            incrementFocusRowIndex,
            decrementFocusRowIndex,
            addRowDatas,
            sentences,removeRowDatas} = props

            const focusRowSentencesIsNull = ():boolean =>{
                return sentences[focusRowIndex] === "" 
            }

            const focusRowIndexIsInit = ():boolean => {
                return focusRowIndex === 0
            }
            const focusRowIndexIsEnd = ():boolean => {
                return focusRowIndex === sentences.length-1
            }
            // const removeRowSentence = () => {
            //     setSentences(removeLastValue(sentences))
            // }
            // const removeRowColorList = () => {
            //     setColorList(removeLastList(colorList))
            // }
            // const removeRowDatas = () => {
            //     removeRowSentence()
            //     removeRowColorList()
            // }
            // const addRowSentence = () => {
            //     setSentences([...sentences,""])
            // }
            // const addRowColorList = () => {
            //     setColorList([...colorList,[]])
            // }
            // const addRowDatas = () => {
            //     addRowSentence()
            //     addRowColorList()
            // }
            
    switch(e.key){
        case "Enter":
            incrementFocusRowIndex()
            if(!focusRowIndexIsEnd()){
                break
            }
            addRowDatas()
            break
        
        case "ArrowUp":
            if(focusRowIndexIsInit()){
                break
            }
            decrementFocusRowIndex()
            break
        
        case "ArrowDown":
            if(focusRowIndexIsEnd()){
                break
            }
            incrementFocusRowIndex()
            break
        
        case "Backspace":
            if(focusRowSentencesIsNull() && !focusRowIndexIsInit()){
                if(focusRowIndexIsEnd()){
                    removeRowDatas()
                }
                decrementFocusRowIndex()
            }
            break
        default:
            break

    }
}
