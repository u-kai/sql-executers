
export const wordDivide = (newCharacter:string) => {
    return newCharacter.split(" ")
}

export const removeLastValue = (list:string[]) => {
    return list.filter((_:string,i:number)=>i!==list.length-1)
}
export const removeLastChar = (sentence:string) => {
    return sentence.substr(0,sentence.length-1)
}
export const deleteLastWord = (sentence:string) => {
    const words = wordDivide(sentence)
    return removeLastValue(words).join(" ")
}