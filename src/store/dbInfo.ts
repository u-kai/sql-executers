import {atom} from "recoil"

export const userState = atom<string>({
    key:"userState",
    default: "root"
})
export const passwordState = atom<string>({
    key:"passwordState",
    default: ""
})
export const hostState = atom<string>({
    key:"hostState",
    default: "localhost"
})
export const dbState = atom<string>({
    key:"dbState",
    default: "firstwebapp"
})
