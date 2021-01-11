import React, { useState, useEffect} from 'react'
import { API } from '../../config'
import RenderTodo from '../RenderTodo'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '-70%',
    marginLeft: '-20%',
    width: '500px',
    backgroundColor: 'yellow',
    border: '4px solid black',
    borderRadius: '25px',
    zIndex: '999'
  },
  button: {
    width: '100px',
    height: '55px'
  },
  actions: {
    marginLeft: '5%',
    marginBottom: '5%',
  },
}));



export default function Home(props) {
    const classes = useStyles();
    const [todoInput, setToDoInput] =useState('')
    const [data, setData] = useState(null)

    useEffect(()=>{
        let token = localStorage.getItem('token')
        if(token == null){
            props.history.push('/login')
        }else{
            getAllTodos()
        }
    },[])
    const logOut=()=>{
        localStorage.removeItem('token', ' ')
        props.history.push('/login')
    }

    const getAllTodos=async()=>{
        let token = localStorage.getItem('token')
        try{
            let resp = await fetch (API,{
                method:'GET',
                headers:{
                    "Content-Type" : "application/json",
                    Authorization:'token '+ token
                }
            })
            let json = await resp.json()

            setData(json)
        }catch(err){
            console.log(err)
        }
    }

    const createTodo = async()=>{
        let id = localStorage.getItem('id')
        let token = localStorage.getItem('token')
        let data = {
            author:id,
            title:todoInput,
            body:todoInput
        }
        try{
            let resp = await fetch(API,{
                method:'POST',
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json",
                    Authorization:'token ' + token
                }
            })
            let json = await resp.json()
            setToDoInput('')
            getAllTodos()
        }catch(error){
            console.log(error)
        }
    }
    const doneTodo=async(elId)=>{
        let idElement = elId
        let id = localStorage.getItem('id')
        let token = localStorage.getItem('token')

        let data = {
            username: id,
            status: true
        }

        try{
            let resp = await fetch (API+idElement+'/',{
                method:'PATCH',
                body:JSON.stringify(data),
                headers:{
                    "Content-Type" : "application/json",
                    Authorization:'token '+ token
                }
            })
            let json = await resp.json()
            setToDoInput('')
            getAllTodos()
        }catch(error){
            console.log(error)
        }
    }
    const deleteTodo=async(elId)=>{
        let idElement = elId
        let token = localStorage.getItem('token')
        try{
            let resp = await fetch (API+idElement+'/',{
                method:'DELETE',
                headers:{
                    "Content-Type" : "application/json",
                    Authorization:'token '+ token
                }
            })
            let json = await resp.json()
            setToDoInput('')
            getAllTodos()
        }catch(error){
            console.log(error)
        }
    }
    const editTodo=async(elId)=>{
        let idElement = elId
        let token = localStorage.getItem('token')
        try{
            let resp = await fetch (API+idElement+'/',{
                method:'PATCH',
                headers:{
                    "Content-Type" : "application/json",
                    Authorization:'token '+ token
                }
            })
            let json = await resp.json()
            setToDoInput('')
            getAllTodos()
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className="bgImage"
        style={{ 
            backgroundImage: `url("https://st3.depositphotos.com/1005049/31886/v/600/depositphotos_318866394-stock-illustration-pattern-with-sloth-hanging-on.jpg")` ,
            }}
        >
            <div
                style={{
                    marginTop: '5%',
                    backgroundColor: 'red',
                    border: '5px solid black',
                }}>
                <h1
                style={{
                        marginLeft: '40%',
                        fontSize: '45px',
                    }}
                >My to-do list</h1>
                <div 
                    style={{
                        marginLeft: '35%',
                        marginBottom: '5%',
                    }}>
                    <TextField 
                        style={{
                            marginLeft: '3%',
                        }}
                        className={classes.input}
                        value={todoInput}
                        onChange={(event)=>{
                            setToDoInput(event.target.value)
                        }}
                        id="outlined-search" 
                        label="Search field" 
                        type="search" 
                        variant="outlined" />
                    <Button
                        style={{
                            marginLeft: '5%',
                            width: '90px',
                            height: '55px'
                        }}
                        onClick={logOut}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<AddIcon/>}
                        onClick={()=>{
                            createTodo()
                    }}>ADD
                    </Button>
                </div>
            </div>
            <div
                style={{
                    marginTop: '5%',
                    marginLeft: '10%',
                    marginBottom: '5%',
                }}>
                <div>

                    <RenderTodo
                        data={data}
                        doneTodo={doneTodo}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                    />
                </div>
            </div>
            <Button
                style={{
                    width: '200px',
                    height: '100px',
                    marginTop: '5%',
                    marginLeft: '40%',
                    marginBottom: '5%',
                }}
                onClick={logOut}
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<ExitToAppIcon/>}
            >
                Exit
            </Button>
        </div>
    )
}