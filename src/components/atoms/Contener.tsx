import styled from "styled-components"
import {VFC} from "react"


type Overflow = "visible"|"hidden"|"scroll"|"auto"|undefined
export type ContenerStyle = {
    width?:string
    height?:string
    overflow?:Overflow
    marginTop?:string
    marginBottom?:string
    marginRight?:string
    marginLeft?:string
    paddingTop?:string
    paddingBottom?:string
    paddingRight?:string
    paddingLeft?:string
    backgroundColor?:string
    flexWrap?:string
    display?:"flex"|"grid"
    gridTemplateRows?:string
    gridTemplateColumns?:string
    gridColumn?:string
    gridRow?:string
    position?:"relative"|"absolute"
    left?:string
    top?:string
}
type Props ={
    id?:string
    children:React.ReactNode
    onScroll?:(event: React.UIEvent<HTMLDivElement, UIEvent>)=>void
    contenerStyle?:ContenerStyle
}

export const Contener:VFC<Props> = (props)=>{
    const {id, children,onScroll,contenerStyle} = props
    return (
        <SContener 
        id={id}
        contenerStyle={contenerStyle}
        onScroll={onScroll}>
            {children}
        </SContener>

    )
}



const SContener = styled.div<{contenerStyle:ContenerStyle | undefined}>`
position:${props=>props.contenerStyle?.position};
display:${props=>props.contenerStyle?.display};
flex-wrap:${props=>props.contenerStyle?.flexWrap};
width:${props=>props.contenerStyle?.width};
height:${props=>props.contenerStyle?.height};
margin-top:${props=>props.contenerStyle?.marginTop};
margin-bottom:${props=>props.contenerStyle?.marginBottom};
margin-right:${props=>props.contenerStyle?.marginRight};
margin-left:${props=>props.contenerStyle?.marginLeft};
padding-top:${props=>props.contenerStyle?.paddingTop};
padding-bottom:${props=>props.contenerStyle?.paddingBottom};
padding-right:${props=>props.contenerStyle?.paddingRight};
padding-left:${props=>props.contenerStyle?.paddingLeft};
background-color:${props=>props.contenerStyle?.backgroundColor};
overflow:${props=>props.contenerStyle?.overflow};
grid-template-rows:${props=>props.contenerStyle?.gridTemplateRows};
grid-template-columns:${props=>props.contenerStyle?.gridTemplateColumns};
grid-row:${props=>props.contenerStyle?.gridRow};
grid-column:${props=>props.contenerStyle?.gridColumn};



`