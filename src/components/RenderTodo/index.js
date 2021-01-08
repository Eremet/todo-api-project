import React from 'react'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import justDoIt from './images/images.png'
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

export default function RenderTodo(props) {
    const classes = useStyles();
    return (
        <div>
                {props.data ?
                    props.data.map(el=>{
                        return (
                            <Card 
                            style={{
                                marginTop: '5%',
                                width: '400px',
                                background: 'grey'
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
                                                value={el.id}
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                startIcon={<DeleteIcon />}
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
                                            >
                                                Edit
                                            </Button>
                                    </div>
                            </Card>
                        )
                    })
                    :<h3>Пока данных нет</h3>
                }
        </div>
    )
}