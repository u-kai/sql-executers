// import {useEditer} from "hocks/useEditer"
// import {useAutoCorrecters} from "hocks/useAutoCorrecters"
// import { useSentences } from "hocks/useSentences"

// export const useFunctions = () => {
//     const {isFocusRowIndexEnd,addInitRowDatas,
//             incrementFocusRowIndex,decrementFocusRowIndex,
//             isFocusRowSentencesNull,isFocusRowIndexInit,removeRowDatas} = useEditer(useSentences)

//     const {initAutoCorrects,
//         decrementFocusAutoCorrectsIndex,incrementFocusAutoCorrectsIndex} = useAutoCorrecters()
    
//     const CaseNotDisplayAutoCorrectsHandleKeyDown:{[key:string]:()=>void} = {
//         "Enter":()=>{
//             if(isFocusRowIndexEnd()){
//                 addInitRowDatas()
//             }
//             incrementFocusRowIndex()
//         },
//         "ArrowUp":()=>{
//             if(!isFocusRowIndexInit()){
//                 decrementFocusRowIndex()
//             }
//         },
//         "ArrowDown":()=>{
//             if(!isFocusRowIndexEnd()){
//                 incrementFocusRowIndex()
//             }
//         },
//         "Backspace":()=>{
//             if(isFocusRowSentencesNull() && !isFocusRowIndexInit()){
//                 if(isFocusRowIndexEnd()){
//                     removeRowDatas()
//                 }
//                 decrementFocusRowIndex()
//             }
//         }
//     }



//     return {
//         CaseNotDisplayAutoCorrectsHandleKeyDown}
// }
export const s = console.log("d")