import {useState} from "react"

export const useIsDisplayAutoCorrects = () => {
    const [isDisplayAutoCorrects, setIsDisplayAutoCorrects] = useState(false)
    const notDisplayAutoCorrects = ()=>{setIsDisplayAutoCorrects(false)}
    const displayAutoCorrects = () =>{setIsDisplayAutoCorrects(true)}
    return { isDisplayAutoCorrects, notDisplayAutoCorrects, displayAutoCorrects }
}