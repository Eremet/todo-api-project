import React, {useState} from 'react'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import justDoIt from './images/images.png'
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '../Modal';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

export default function RenderTodo(props) {
    const [todo, setTodo] = useState('')
    const [id, setId] = useState()
    const [showModal, setShowModal] = useState(false)
    const edit =(todo, id)=>{
        setTodo(todo)
        setShowModal(true)
        setId(id)
    }
    const classes = useStyles();

    return (
        <div>
                {props.data ?
                    props.data.map(el=>{
                        return (
                        <div
                            style={{
                                display: 'flex'
                            }}>    
                            <Card 
                            key={el.id}
                            style={el.status ? {
                                background: "green",
                                marginTop: '5%',
                                width: '400px',
                                zIndex: '-999'
                            }:{
                                background: "red",
                                marginTop: '5%',
                                width: '400px',
                                border: '4px solid black',
                                borderRadius: '25px',
                                }}>
                                <img 
                                src={justDoIt}
                                style={{
                                    marginTop: '5%',
                                    marginLeft: '10%',
                                }}
                                />
                                    <h2
                                    style={{
                                        marginLeft: '10%',
                                    }}
                                    >{el.title}</h2>
                                    <div>
                                        {!el.status ?
                                            <Button
                                                style={{
                                                    marginLeft: '7%',
                                                    marginBottom: '3%'
                                                }}
                                                value={el.id}
                                                variant="contained"
                                                color="secondary"
                                                className={classes.button}
                                                startIcon={<AssignmentTurnedInIcon />}
                                                onClick={event=>{
                                                    props.doneTodo(el.id)
                                                }}
                                            >
                                                Done
                                            </Button>
                                            :null
                                        }
                                        <Button
                                                style={{
                                                    marginBottom: '3%',
                                                    marginLeft: '3%',
                                                }}
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                startIcon={<DeleteIcon />}
                                                onClick={() => 
                                                {window.confirm('Delete the item?')
                                                if(false){
                                                    
                                                }else{
                                                    props.deleteTodo(el.id)
                                                }}}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                style={{
                                                    marginLeft: '3%',
                                                    marginBottom: '3%'
                                                }}
                                                value={el.id}
                                                variant="contained"
                                                color="default"
                                                className={classes.button}
                                                startIcon={<EditIcon />}
                                                onClick={()=>edit(el.todo, el.id)}
                                            >
                                                Edit
                                            </Button>
                                    </div>
                                
                            </Card>
                            <Modal
                                    name={todo}
                                    showModal={showModal}
                                    setShowModal={setShowModal}
                                    id={id}
                                    save = {props.save}
                                />
                        </div>
                        )
                    })
                    :<h3>Пока данных нет</h3>
                }
        </div>
    )
}