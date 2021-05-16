export const focusElement =(id:string):void=>{
    const focusElement = document.getElementById(id)
    if(focusElement){
        focusElement.focus()
    }else{
        console.log("not found")
    }
}