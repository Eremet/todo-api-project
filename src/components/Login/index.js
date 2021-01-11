import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { API } from '../../config'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import "typeface-cormorant";
import './index.css'


const useStyles = makeStyles(() => ({
      root: {
          marginLeft: '10%',
          width: '80%',
      },
      firsttitle: {
          fontSize: '40px',
          marginBottom: '-3%'
      },
      input: {
          width: '600px',
          Height: '30px'
      },
      textField: {
        width: '25ch',
      },
      todotext: {
          fontSize: '40px',
          color: 'grey',
          marginTop: '15%',
          marginLeft: '10%'
      },
  }));

  export default function Login(props) {
 
    const [values, setValues] = React.useState({
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const classes = useStyles();
    const [h, setH] = useState('Войти')
    const [p, setP] = useState('Зарегистрироваться')
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [authOrReg, setAuthOrReg] = useState('/login/')
    
    useEffect(()=>{
        let token = localStorage.getItem('token')
        if(token != null){
            props.history.push('/')
        }
    })

    const setParameters =()=>{
        if(authOrReg == '/login/'){
            setH('Регистрация')
            setAuthOrReg('/registration/')
            setP('Войти')
        }else{
            setH('Войти')
            setAuthOrReg('/login/')
            setP('Зарегистрироваться')
        }
        
    }

    const sendRequest = (e) =>{
        let val = e.target.value
        let data = {}
        if(val == '/login/'){
            data['username']=login
            data['password']=pass
        }else{
            data['username']=login
            data['password1']=pass
            data['password2']=pass
        }
        let url = 'dj-rest-auth'+val
        const requset = axios.post(API+url, data)
        .then((response)=>{
            console.log(response)
            localStorage.setItem('token', response.data.key)
            localStorage.setItem('id', response.data.user.id)
            props.history.push('/')
        },(error)=>{
            console.log(error)
        })
    }
    return (
            <div>
                <h1
                className={classes.todotext}
                >To-Do List</h1>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.firsttitle} color="textSecondary" gutterBottom>
                        {h}
                        </Typography>
                    
                    </CardContent>
                    <CardActions>
                    <TextField 
                        id="outlined-basic" 
                        label="login" 
                        variant="outlined"  
                        value={login}
                        className={classes.input}
                        onChange={(event)=>{
                            setLogin(event.target.value)
                    }}/>
                    <FormControl 
                        className={clsx(classes.margin, classes.textField)} 
                        variant="outlined" 
                        value={pass}
                        onChange={(event)=>{
                            setPass(event.target.value)
                        }}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                        labelWidth={70}
                    />
                    </FormControl>
                    <button
                        className='buttontrans'
                        value={authOrReg}
                        onClick={(event)=>{
                            sendRequest(event)
                        }}
                    >
                        Войти
                    </button>
                    </CardActions>
                    <CardActions>
                    <Button 
                        onClick={setParameters}
                        variant="outlined"
                        color="primary">
                    {p}</Button>
                    </CardActions>
                </Card>
            </div>
    )
}










 