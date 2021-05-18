import {useState} from "react"

export const useIsDisplayAutoCorrects = () => {
    const [isDisplayAutoCorrects, setIsDisplayAutoCorrects] = useState(false)
    const notDisplayAutoCorrects = ()=>{setIsDisplayAutoCorrects(false)}
    const displauAutoCorrects = () =>{setIsDisplayAutoCorrects(true)}
    return { isDisplayAutoCorrects, notDisplayAutoCorrects, displauAutoCorrects }
}