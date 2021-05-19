import {useState} from "react"


export const useAutoCorrectPosition = () => {
    const [autoCorrectsPosition,setAutoCorrectsPosition] = useState({x:0,y:0})
    const getAutoCorrectsPosition = (focusRowIndex:number,prefixId="tailPosition") => {
        const tail = document.getElementById(`${prefixId}${focusRowIndex}`)
        const ajustTop = 20
        let x = 0
        let y = 0
        if(tail){
            x = window.pageXOffset + (tail.getBoundingClientRect().left)
            y = window.pageYOffset + (tail.getBoundingClientRect().top) - ajustTop
        }
        return {x,y}
    }
    const getAndSetAutoCorrectsPosition = (focusRowIndex:number,prefixId="tailPosition") => {
        const {x,y} = getAutoCorrectsPosition(focusRowIndex,prefixId)
        setAutoCorrectsPosition({x:x,y:y})
    }
    return {autoCorrectsPosition, getAndSetAutoCorrectsPosition}
}