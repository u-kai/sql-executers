import styled from "styled-components"
import {VFC} from "react"

type Props = {
    otherList:string[]
}

export const OtherList:VFC<Props> = (props) =>{
    const {otherList} = props
    return (
        <>
        {otherList.length === 0 ? (null) : (
            <Contener>
        {otherList.map((other,i)=>(
            <div>
            <OtherResults key={`${other}${i}`}>{other}</OtherResults>
            </div>
            ))}
            </Contener>
        )}
        </>
    )
}

const Contener = styled.div`
padding-bottom:20px;
`

const OtherResults = styled.span`
//padding-bottom:5px;
border-bottom:solid #e7e7eb 1px;
`