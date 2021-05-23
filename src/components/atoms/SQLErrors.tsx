import styled from "styled-components"
import {VFC} from "react"

const errorType:["code","sqlState","errno","sqlMessage"] = ["code","sqlState","errno","sqlMessage"]
type SQLError = {code:string,sqlState:string,errno:number,sqlMessage:string}
type Props = {
    errors:SQLError[]
}
export const SQLErrors:VFC<Props> = (props) =>{
    const {errors} = props
    return (
        <Contener>
        {errors.map((error)=>(
            errorType.map((type,i)=>(
                <LineContener>
                <Errors key={`${type}${i}`}>{type}:{error[type]}</Errors>
                </LineContener>
            ))
        ))}
        </Contener>
    )
}

const LineContener = styled.div`
padding-bottom:5px;
`

const Contener = styled.div`
margin-bottom:20px;

`
const Errors = styled.span`
color:red;
border-bottom:solid red 1px;
`