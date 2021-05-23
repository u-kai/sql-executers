import {atom} from "recoil"

export const focusRowIndexState = atom<number>({
    key:"focusRowIndexState",
    default: 0
})