import {VFC,useState} from "react"
import {AutoCorrect} from "../atoms/AutoCorrect"
import {AutoCorrectBox} from "../atoms/AutoCorrectBox"

type Props = {
    autoCorrects:string[]
    position:{
        x:number
        y:number
    }
    handleMouseDown:(e:React.MouseEvent<HTMLSpanElement>)=>void
    focusAutoCorrectsIndex:number
    // setFocusAutoCorrectsIndex:React.Dispatch<React.SetStateAction<number>>
    handleClick:(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}
export const AutoCorrects:VFC<Props> = (props) =>{
    const {autoCorrects, position,handleClick,
        handleMouseDown,focusAutoCorrectsIndex,} = props
    // const [autoCorrectFocusIndex,setAutoCorrectFocusIndex] = useState(0)
    // const handleMouseDown = (e:React.MouseEvent<HTMLSpanElement>)=>{
    //     const hoverId = e.currentTarget.id    
    //     setAutoCorrectFocusIndex(parseInt(hoverId.replace("hover","")))
    // }
    return(
        <AutoCorrectBox id="AutoCorrectsBox" posi={position}>
            {autoCorrects.map((value,i)=>(
                <AutoCorrect 
                    backgroundColor={i===focusAutoCorrectsIndex ? "white" : "black"}
                    opacity={i===focusAutoCorrectsIndex ? 1 : 1}
                    color={i===focusAutoCorrectsIndex ? "black":"white"}
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