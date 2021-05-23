import {atom} from "recoil"

export const sentencesState = atom<string[]>({
    key:"sentencesState",
    default: [""]
})