import {Input, Props as InputProps} from "../atoms/Input"
import {Label, Props as LabelProps} from "../atoms/Label"
import {VFC} from "react"
import styled from "styled-components"
type Props = {
    input:InputProps
    label:LabelProps
}
export const InputAndLabel:VFC<Props> = (props)=>{
    const {input, label} = props
    return(
        <SContener>
            <Label
            htmlFor={label.htmlFor}
            id={label.id}
            textContent={label.textContent}
            width={label.height}
            height={label.width}/>
            <Input
            id={input.id}
            type={input.type}
            
            />
            
        </SContener>
    )
}
const SContener = styled.div`
display: flex;
flex-wrap: wrap;
`