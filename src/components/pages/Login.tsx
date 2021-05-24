import styled from "styled-components"
import {useState} from "react"
import {ContainedButtons} from "../atoms/Bottun_MatirialUI"
import {BasicTextFields} from "../atoms/TextFiled_MaterialUI"
import {postDataAndReturnResposeJson} from "functions/tableFunctions"
import {useHistory} from "react-router-dom"
import {SimpleAlerts} from "../atoms/Alert_MaterialUI"
import {userState,hostState,passwordState,dbState} from "store/dbInfo"
import {useRecoilState} from "recoil"

export const Login = () => {
    // const {user,password,host,db} = props
    const [user,setUser] = useRecoilState(userState)
    const [password,setPassword] = useRecoilState(passwordState)
    const [host,setHost] = useRecoilState(hostState)
    const [db,setDB] = useRecoilState(dbState)
    const [error,setError] = useState("")
    const url = "submitUser"
    const history = useHistory()
    const inputList:["user","password","host","db"] = ["user","password","host","db"]
    const stateList = [user,password,host,db]
    const setFunctions = {
        "user":(e: React.ChangeEvent<HTMLInputElement>)=>setUser(e.target.value),
        "password":(e: React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value),
        "host":(e: React.ChangeEvent<HTMLInputElement>)=>setHost(e.target.value),
        "db":(e: React.ChangeEvent<HTMLInputElement>)=>setDB(e.target.value)
    }
    const onClick = () => {
        const sendData = {
            user:user,
            password:password,
            host:host,
            db:db
        }
        postDataAndReturnResposeJson(sendData,url)
        .then((results:{results:{message:string}}|undefined)=>{
            if(results?.results){
                setError(results.results.message)
            }else{
                history.push("/executers")
            }
        })
    }

    return(
        <Contener>
            <InputContener>
            <Title>
                Connection MySQL
            </Title>
            {inputList.map((state,i)=>(
                <TextFieldContener>
                     <BasicTextFields
                        type={state==="password" ? ("password") : ("text")}
                        value={stateList[i]}
                        label={state}
                        handleChange={setFunctions[state]}/>
                </TextFieldContener>
            ))}
            <ButtonContener>
            <ContainedButtons
                value={"connection"}
                onClick={onClick}
            />
            </ButtonContener>
            </InputContener>
            <ErrorContener>
                {error.length !== 0 ? (
                    <SimpleAlerts message={error} severity={"error"}/>
                ):(
                    null
                )}
            </ErrorContener>
        </Contener>
    )
}

const Contener = styled.div`
width:100%;
height:100%;
display:grid;
grid-template-rows:30% 60% 1fr;
grid-template-columns:38% 24% 38%;
`
const InputContener = styled.div`
width:350px;
height:400px;
grid-row:2/3;
grid-column:2/3;
// display:flex;
// align-items:center;
// justify-content:center;
border:solid 2px #95949a;
overflow:auto;
`
const ErrorContener = styled.div`
position:absolute;
left:35%;
top:1%;
`
const TextFieldContener = styled.div`
width:100%;
height:50px;
display:flex;
justify-content:center;
padding-bottom:20px;
`
const ButtonContener = styled.div`

display:flex;
justify-content:center;
`

const Title = styled.div`
font-size:30px;
font-weight:bold;
display:flex;
justify-content:center;
border-bottom:solid 2px #95949a;
`