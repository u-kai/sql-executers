import {VFC,useState} from "react"
import {AutoCorrect} from "../atoms/AutoCorrect"
import {AutoCorrectBox} from "../atoms/AutoCorrectBox"

type Props = {
    autoCorrects:string[]
    position:{
        x:number
        y:number
    }
    handleClick:(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}
export const AutoCorrects:VFC<Props> = (props) =>{
    const {autoCorrects, position,handleClick} = props
    const [autoCorrectFocusIndex,setAutoCorrectFocusIndex] = useState(0)
    const handleMouseDown = (e:React.MouseEvent<HTMLSpanElement>)=>{
        const hoverId = e.currentTarget.id    
        setAutoCorrectFocusIndex(parseInt(hoverId.replace("hover","")))
    }
    return(
        <AutoCorrectBox id="AutoCorrectsBox" posi={position}>
            {autoCorrects.map((value,i)=>(
                <AutoCorrect 
                    opacity={i===autoCorrectFocusIndex ? 0.3 : 1}
                    color={i===autoCorrectFocusIndex ? "yellow":"white"}
                    id={`hover${i}`} 
                    handleClick={handleClick} 
                    handleMouseDown={handleMouseDown} 
                    key={`autoCorrect${i}`}>
                        {value + "\n"}
                    </AutoCorrect>
                ))}
            </AutoCorrectBox>
    )

}