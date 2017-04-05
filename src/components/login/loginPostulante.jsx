import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import Auth from '../../services/Auth';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import nativeToast from 'native-toast'
import AdmisionService from '../../services/AdmisionService';
import UserService from '../../services/Users';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  floatingLabelStyle: {
    color: "white",
  }

};

export default class LoginPostulante extends React.Component{
	constructor () {
		super();
		this.state = {
			
			admisiones:[],
			email:'',
			password:'',
			loading:false,
			message:{
				open:false,
				message:''
			}
		};
	}

	componentDidMount(){
		UserService.originParam(this.props.params.origin);
		let service = new AdmisionService();
		service.getAll({},(error,data)=>{
			this.setState({admisiones:data});
		});
	}

	cleanUsername(username){
		if(username){
			return username.toLowerCase().trim();
		}
		return null;
	}

	handleLogin( e ){
		this.setState({loading:true});
		e.preventDefault();
		let _self = this;
		const reqBody = {
			"dni": this.cleanUsername(this.state.email),
			"password": this.state.password
		};
		Auth.loginAnonymous( reqBody, ( error, data )=>{
			_self.setState({ loading:false } );
			if(error){
				nativeToast({
					message: error.message,
					position: 'top',
					timeout: 5000,
					type: 'warning'
				});
			}  			
			
		});
	}


	

	handleChange(key, event){
		let state = this.state;
		state[key] = event.target.value;
		this.setState(state);
	}
	handleChangeSelect(key, event, index, value){
		let state = this.state;
		state[key] = value;
		this.setState(state);
		
	}
	render(){


		return (
			<div className="flex layout vertical center-center center-justified" style={{height:"100%"}}>
				<div className="login-container layout vertical center-center center-justified">
					<img src="images/logo.svg" width="200PX" height="auto"/>
					<h1>Sistema de Admisión</h1>
					<h3>Bienvenido, Ingrese el DNI del postulante y el código de operación del vouchers</h3>
					
					<form>
						 <SelectField
                        fullWidth
                        floatingLabelText="Proceso de Admisión"
                        value={this.state.admision}
                        onChange={(event, index, value)=>{this.handleChangeSelect('admision',event, index, value)}}
						floatingLabelStyle={{color:'white'}}
						labelStyle={{color:'white'}}
						style={{color:'white'}}
                        >
                        {
                          this.state.admisiones.map((item,index)=>{
                            return (<MenuItem key={index} value={item.id} primaryText={"Proceso de Admision "+ item.nombre} />)
                          })
                        }
                        </SelectField>
						<TextField
							type="text"
							floatingLabelStyle={styles.floatingLabelStyle}
							floatingLabelText="DNI"
							value = {this.state.email}
							onChange = {(e)=>{this.handleChange('email',e);}}
							fullWidth
							required
							inputStyle={{color:'white'}}
							/>
						<TextField
							floatingLabelStyle={styles.floatingLabelStyle}
							type="password"
							floatingLabelText="Código de Voucher"
							value = {this.state.password}
							onChange = {(e)=>{this.handleChange('password',e);}}
							fullWidth
							required
							inputStyle={{color:'white'}}
							/>


						<RaisedButton label="Entrar" fullWidth disabled={this.state.loading} primary={true} onTouchTap={this.handleLogin.bind(this)} />
					
					</form>
					</div>
					
			</div>
		);
	}
}
