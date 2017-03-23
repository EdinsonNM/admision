import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import EscuelaService from '../../services/EscuelaService';
import { hashHistory } from 'react-router';

let service = new EscuelaService();
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,

} from 'material-ui/Stepper';
const style={
  appbar:{
    backgroundColor:'var(--paper-purple-700)'
  }
}
export default class Escuela extends React.Component {
  constructor (props) {
    super(props);
     this.state = {
        id:0,
        facultad:this.props.params.facultadid,
        codigo: '',
        nombre: '',
    };
  }


  componentDidMount(){
    let id=this.props.params.id;
    let facultadid=this.props.params.facultadid;
    if(id){
      service.get(id,(error,data)=>{
        this.setState(data);
      },facultadid);
    }
  }
  handleChange(key, event){
		let state = this.state;
		state[key] = event.target.value;
		this.setState(state);
	}
  handleSave(){
     let data = JSON.parse(JSON.stringify(this.state));
    if(this.state.id==0){
      delete data.id;
      service.post(this.state,()=>{
          hashHistory.goBack()
      },this.state.facultad);
    }else{
      delete data.uid;
      delete data.id;

      service.update(this.state.id,this.state,()=>{
          console.log('ok...');
          hashHistory.goBack()
      },this.props.params.facultadid);
    }

  }
  handleBack(){
    hashHistory.goBack()
  }
  render(){
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
    const iconButtonElement = (
        <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
        >
        <MoreVertIcon color={grey400} />
        </IconButton>
        );
    const rightIconMenu = (
        <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
        </IconMenu>
        );

    return (
          <Card>
            <CardHeader
            title="Registro de Periodo académico"
            subtitle="Admisión"
             avatar="images/user0.jpg"
            />

            <CardText >
            Ingrese todos los campos obligatorios y a continuación presione GRABAR para registrar la facultad.
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField 
                    onChange = {(e)=>{this.handleChange('codigo',e);}}
                    value = {this.state.codigo} 
                    floatingLabelText="Código" 
                    fullWidth/>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-9">
                    <TextField 
                    onChange = {(e)=>{this.handleChange('nombre',e);}}
                    value = {this.state.nombre} 
                    floatingLabelText="Nombre" 
                    fullWidth/>
                </div>
              
            </div>
                <FlatButton
                  label="Volver"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handleBack.bind(this)}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label='Grabar'
                  primary={true}
                  onTouchTap={this.handleSave.bind(this)}
                />
  
            </CardText>
        </Card>
    );
  }
}
