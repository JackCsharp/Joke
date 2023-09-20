import React, { useState } from 'react'
import DefaultButton from '../UI/Button/DefaultButton';
import DefaultInput from '../UI/Input/DefaultInput';

const LoginPanel = (login) => {
    const [userInput,setUserInput] = useState({login: '', password: ''})
    const Update = (e) => {
        e.preventDefault()
        login(userInput)
    }
    return(
        <div>
            <form>
            <DefaultInput value={userInput.login} onChange={e=> setUserInput(...userInput, userInput.login=e.target.value)} />
            <DefaultInput value={userInput.password} onChange={e=> setUserInput(...userInput, userInput.password=e.target.value)}/>
            <DefaultButton onClick={Update}>Log in</DefaultButton>
            </form>
        </div>
    )
}

export default LoginPanel;