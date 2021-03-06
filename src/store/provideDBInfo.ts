import {userState,hostState,passwordState,dbState} from "store/dbInfo"
import {useRecoilValue} from "recoil"

export const useDBInfo = () => {
    const user = useRecoilValue(userState)
    const password = useRecoilValue(passwordState)
    const host = useRecoilValue(hostState)
    const db = useRecoilValue(dbState)
    return {
        user:user,
        password:password,
        host:host,
        database:db
    }
}


