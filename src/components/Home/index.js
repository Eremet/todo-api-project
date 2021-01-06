import React, {useState, useEffect} from 'react'

export default function Home(props) {

    useEffect(()=>{
        let token = localStorage.getItem('token')
        if(token == null){
            props.history.push('/login')
        }
    },[])
    const logOut=()=>{
        localStorage.removeItem('token', '')
        props.history.push('/login')
    }
    return (
        <div>
            <h1>Home</h1>
            <p onClick={logOut}>Выйти</p>
        </div>
    )
}
