import {VFC} from "react"
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
    handleClick:(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}
export const AutoCorrects:VFC<Props> = (props) =>{
    const {autoCorrects, position,handleClick,
        handleMouseDown,focusAutoCorrectsIndex,} = props
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