import React, {useState} from 'react'
import Card from "@material-ui/core/Card"
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import never from "../Modal/images/never.jpg"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import { API } from '../../config'

const useStyles = makeStyles((theme) => ({
    button: {
      width: '100px',
      height: '55px'
    },
    actions: {
      marginLeft: '5%',
      marginBottom: '5%',
    },
    
  }));

export default function Modal(props) {

    const [val, setVal] = useState('')
    const [showModal, setShowModal] = useState(false)

    const saveEdit =()=>{
        setShowModal(false)
    }
    const classes = useStyles();

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

    const setToDoInput = useState('')

    const setData = useState(null)
    return (
        <Card style={
            !props.showModal ? 
            {display:'none'} :
            {
            marginTop: '5%',
            marginLeft: '10%',
            width: '500px',
            backgroundColor: 'yellow',
            border: '4px solid black',
            borderRadius: '25px',
            }
        }>
            <CardContent>
                <img src={never}  style={{
                    width: '200px',
                    height: '132px',
                    marginLeft: '25%',
                    border: '5px solid black',
                    borderRadius: '25px'
                }}/>
                <h4>{props.name}</h4>
            </CardContent>
            <CardActions className={classes.actions}>
                <TextField
                    id="outlined-basic" 
                    label="Outlined" 
                    variant="outlined" 
                    onChange={(event)=>{
                    setVal(event.target.value)
                }}
                />
                <Button
                    variant="contained"
                    color="green"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={event=>{
                        editTodo()
                    }}
                    onClick={ saveEdit }
                >
                Save
                </Button>
                <Button
                    variant="contained" 
                    color="secondary"
                    className={classes.button}
                    startIcon={<CancelPresentationIcon />}
                    onClick={()=>
                    props.setShowModal(false)
                    }
                >
                Cancel
                </Button>
            </CardActions>
        </Card>
    )
}
