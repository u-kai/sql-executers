import styled from "styled-components"
import {VFC} from "react"

type StatusMessage = {
    fieldCount: number,
    affectedRows: number,
    insertId: number,
    info: string,
    serverStatus: number,
    warningStatus: number
  }

type Props = {
    statusMessage:StatusMessage[]
}

const messageType:["fieldCount","affectedRows","insertId","info","serverStatus","warningStatus"] = ["fieldCount","affectedRows","insertId","info","serverStatus","warningStatus"]
export const StatusMessage:VFC<Props> = (props) => {
    const {statusMessage} = props

    return (
        <>
        {statusMessage.map((message)=>(
            messageType.map((key,i)=>(
                <SQLStatusMessage key={`${key}${i}`}>{key}:{message[key].toString()}</SQLStatusMessage>
            ))
        ))}
        <br></br>
        </>
    )
}

const SQLStatusMessage = styled.div`

`