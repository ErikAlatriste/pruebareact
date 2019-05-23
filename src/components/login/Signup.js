import React from 'react';
import { Link } from 'react-router-dom';
import {Button, Dialog} from '@material-ui/core';
import { Email, Lock, AccountCircle, Call, Language } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import bio from '../../assets/logo.png';
import Typography from '@material-ui/core/Typography';

let authToken ='';

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            password_confirmation: '',
            phone: '',
            web: '',
            badLogin: '',
            dialogOpen:false,
            forgottenPwdEmail:'',
            checkEmail: '',
            emailClicked:{backgroundColor:'white',color:'black'},
            accountClicked:{backgroundColor:'white',color:'black'},
            passwordClicked:{backgroundColor: 'white',color:'black'},
            passwordconfirmClicked:{backgroundColor: 'white',color:'black'},
            phoneClicked:{backgroundColor: 'white',color:'black'},
            webClicked:{backgroundColor: 'white',color:'black'}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]:event.target.value})
    }

    handleClick(event) {
        if(event.target.name === 'email'){
            this.setState({emailClicked:{backgroundColor:'red',color:'white'}});
        } else if(event.target.name === 'username') {
            this.setState({accountClicked:{backgroundColor:'red',color:'white'}});
        } else if(event.target.name === 'password') {
            this.setState({passwordClicked:{backgroundColor:'red',color:'white'}});
        } else if(event.target.name === 'password_confirmation') {
            this.setState({passwordconfirmClicked:{backgroundColor:'red',color:'white'}});
        } else if(event.target.name === 'phone') {
            this.setState({phoneClicked:{backgroundColor:'red',color:'white'}});
        } else if(event.target.name === 'web') {
            this.setState({webClicked:{backgroundColor:'red',color:'white'}});
        } else {
            this.setState({dialogOpen:true})
        }
    }

    handleBlur(event) {
        if(event.currentTarget.name === 'email'){
            this.setState({emailClicked:{backgroundColor:'white',color:'black'}});
        } else if (event.currentTarget.name === 'username') {
            this.setState({accountClicked:{backgroundColor:'white',color:'black'}});
        } else if (event.currentTarget.name === 'password') {
            this.setState({passwordClicked:{backgroundColor:'white',color:'black'}});
        } else if (event.currentTarget.name === 'password_confirmation') {
            this.setState({passwordconfirmClicked:{backgroundColor:'white',color:'black'}});
        } else if (event.currentTarget.name === 'phone') {
            this.setState({phoneClicked:{backgroundColor:'white',color:'black'}});
        } else if (event.currentTarget.name === 'web') {
            this.setState({webClicked:{backgroundColor:'white',color:'black'}});
        }
    }

    handleClose(){
        this.setState({dialogOpen:false})
    }

    attemptLogIn(){
        console.log();
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"user": {"email":this.state.email,"password":this.state.password,"username":this.state.username,"password_confirmation":this.state.password_confirmation, "phone":this.state.phone,"web":this.state.web}})
            })
            .then(response =>{ response.json() })
            .then(data => { 
                console.log(data) 
                this.props.history.replace('/')
            });
    }

    render() {
        let display_message;
        if (this.state.badLogin){
            display_message = <p style={{marginBottom:0}}>{this.state.badLogin}</p>
        }
        document.body.style = 'background: #FFFFFF';
        return(
            <div align="center" className='centered-elements'>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
                <img className="img-logo" src={bio} alt="biologo" style={{margin:'auto',height:256,width:512}} />
                <Typography><h1 className="titulo-login">¡Bienvenido al Blog de React!</h1></Typography>
                <form onSubmit={(e)=>e.preventDefault()}>
                <table className='form-table' style={{backgroundColor: 'white'}}>
                      <tbody>
                        <tr className="login-table-tr tr-first" align="center">
                          <td className="login-table-td login-table-td-icon td-first" style={this.state.emailClicked}><Email style={{fontSize: 40}}></Email></td>
                          <td className="login-table-td login-table-td-input td-second">
                            <TextField type="email" name="email" label="Correo electrónico"
                              className="disable-selection email" variant="outlined"
                              onChange={this.handleChange} onClick={this.handleClick} onBlur={this.handleBlur}/>
                          </td>
                        </tr>

                        <tr className="login-table-tr tr-first" align="center">
                          <td className="login-table-td login-table-td-icon td-first" style={this.state.accountClicked}><AccountCircle style={{fontSize: 40}}></AccountCircle></td>
                          <td className="login-table-td login-table-td-input td-second">
                            <TextField type="text" name="username" label="Nombre de usuario"
                              className="disable-selection username" variant="outlined"
                              onChange={this.handleChange} onClick={this.handleClick} onBlur={this.handleBlur}/>
                          </td>
                        </tr>

                        <tr className="login-table-tr tr-second" align="center">
                          <td className="login-table-td login-table-td-icon td-first" style={this.state.passwordClicked}><Lock style={{fontSize: 40}}></Lock></td>
                          <td className="login-table-td login-table-td-input td-second">
                            <TextField type="password" name="password" label="Contraseña"
                              className="disable-selection password" variant="outlined"
                              onChange={this.handleChange} onClick={this.handleClick} onBlur={this.handleBlur}/>
                          </td>
                        </tr>

                        <tr className="login-table-tr tr-second" align="center">
                          <td className="login-table-td login-table-td-icon td-first" style={this.state.passwordconfirmClicked}><Lock style={{fontSize: 40}}></Lock></td>
                          <td className="login-table-td login-table-td-input td-second">
                            <TextField type="password" name="password_confirmation" label="Confirmacion de contraseña"
                              className="disable-selection password_confirmation" variant="outlined"
                              onChange={this.handleChange} onClick={this.handleClick} onBlur={this.handleBlur}/>
                          </td>
                        </tr>

                        <tr className="login-table-tr tr-second" align="center">
                          <td className="login-table-td login-table-td-icon td-first" style={this.state.phoneClicked}><Call style={{fontSize: 40}}></Call></td>
                          <td className="login-table-td login-table-td-input td-second">
                            <TextField type="password" name="phone" label="Telefono"
                              className="disable-selection phone" variant="outlined"
                              onChange={this.handleChange} onClick={this.handleClick} onBlur={this.handleBlur}/>
                          </td>
                        </tr>

                        <tr className="login-table-tr tr-second" align="center">
                          <td className="login-table-td login-table-td-icon td-first" style={this.state.webClicked}><Language style={{fontSize: 40}}></Language></td>
                          <td className="login-table-td login-table-td-input td-second">
                            <TextField type="password" name="web" label="Website"
                              className="disable-selection web" variant="outlined"
                              onChange={this.handleChange} onClick={this.handleClick} onBlur={this.handleBlur}/>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                    <p style={{color: 'black',textDecoration: 'underline', width:'440px', textAlign:'right', fontSize:"0.8em"}}>
                      <b onClick={this.handleClick} style={{cursor: 'pointer'}}>¿Olvidaste tu contraseña?</b>
                    </p>
                    <p style={{color: '#ef5350'}}>{display_message}</p>
                    <p style={{color: 'black',textDecoration: 'underline', width:'440px', textAlign:'right', fontSize:"0.8em"}}>
                        <Link to={`/`} >
                        Inicia Sesion
                        </Link>
                    </p>
                    <div style={{width: '440px'}}>
                      <Button align="right" className="login-button" onClick={() => this.attemptLogIn()} type="submit">Registrarte</Button>

                    </div>
                </form>

                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >

                    <div style={{width:'500px',height:'320px'}}>
                    <div className="outer" style={{width:'500px',height:'270px'}}>
                        <div className="middle">
                        <div className="inner">
                            <p>    </p>
                            <h2 style={{textAlign: 'center', fontWeight:'500'}}>Recuperar contraseña</h2>
                            <p style={{padding: '0 10% 0 10%'}}>Introduzca la dirección de correo electrónico asociados con su cuenta de Bio-alchemist</p>
                            <input type="email" name="forgottenPwdEmail" className="disable-selection" onChange={this.handleChange} style={{marginLeft: '40px', width:'80%', border:'solid 1px #4c4c4c', borderRadius:'3px'}}></input>
                            <p style={{padding: '0 10% 0 10%', color: '#ac5fd3'}}>{this.state.checkEmail}</p>
                            <div className="holder">
                            <Button id="pop-up-button" className="login-button" onClick={(e) => this.recoverPassword(e)}>Recuperar contraseña</Button>
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }


}

export default Signup;