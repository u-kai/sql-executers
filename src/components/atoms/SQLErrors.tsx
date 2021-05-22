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
        <>
        {errors.map((error)=>(
            errorType.map((type,i)=>(
                <Errors key={`${type}${i}`}>{type}:{error[type]}</Errors>
            ))
        ))}
        <br></br>
        </>
    )
}
const Errors = styled.div`
color:red;

`