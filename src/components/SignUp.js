import React,{useState} from "react";

function Login(){
    const [Id, setId] = useState('');
    const [Passwd, setPasswd] = useState('');


    const handleId = (e) =>{
        setId(e.target.value);
    }

    const handlePasswd = (e) => {
        setPasswd(e.target.value);
    }
    const onClickLogin = () =>{
        console.log("click login");
    }
    
    return(
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor="input_id">ID :</label>
                <input 
                type='text'
                name='input_id'
                value={Id}
                onChange={handleId}
                />
            </div>
            <div>
                <label htmlFor="input_Pw">Password :</label>
                <input 
                type='password'
                name='input_pw'
                value={Passwd}
                onChange={handlePasswd}
                />
            </div>
            <div>
                <button type="button" onClick={onClickLogin}>로그인</button>
            </div>
        </div>
    )
}

export default Login;