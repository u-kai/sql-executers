import { SQLExrcuters } from "components/pages/SQLExecuters";
import {Login} from "components/pages/Login"
import {RecoilRoot} from "recoil"
export const homeRoutes = [
    {
        path:"",
        exact:true,
        children:<Login />
    },
    {
        path:"executers",
        exact:false,
        children:<SQLExrcuters />
    },
   
]