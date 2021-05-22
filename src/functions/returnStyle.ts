import {StyledType} from "../types/styledTypes/styledType"

export const returnStyle = (props:StyledType | undefined):string|undefined => {
    if(props){
        return(
            `
    position:${props.position};
    display:${props.display};
    flex-wrap:${props.flexWrap};
    width:${props.width};
    height:${props.height};
    margin-top:${props.marginTop};
    margin-bottom:${props.marginBottom};
    margin-right:${props.marginRight};
    margin-left:${props.marginLeft};
    padding-top:${props.paddingTop};
    padding-bottom:${props.paddingBottom};
    padding-right:${props.paddingRight};
    padding-left:${props.paddingLeft};
    background-color:${props.backgroundColor};
    overflow:${props.overflow};
    grid-template-rows:${props.gridTemplateRows};
    grid-template-columns:${props.gridTemplateColumns};
    grid-row:${props.gridRow};
    grid-column:${props.gridColumn};
    outline:${props.outline};
    color:${props.color};
    font-size:${props.fontSize};
    font-family:${props.fontFamily};
    top:${props.top};
    left:${props.left};
    visibility:${props.visibility};
            `
        )
    }
    return undefined

}

