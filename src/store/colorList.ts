import {atom} from "recoil"

export const colorListState = atom<string[][]>({
    key:"colorListState",
    default: [[""]]
})