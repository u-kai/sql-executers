import React,{createContext,useState} from "react"

export const SentencesContext = createContext({})

export const SnetencesProvider = () => {
    const [sentences,setSentences] = useState<string[]>([])
    return(
        <SentencesContext.Provider
            value={{sentences,setSentences}}/>
    )
}