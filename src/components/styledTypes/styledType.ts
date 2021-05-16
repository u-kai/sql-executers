type Overflow = "visible"|"hidden"|"scroll"|"auto"|undefined
export type StyledType = {
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
    visibility?:"visible"|"hidden"|"collapse"
}