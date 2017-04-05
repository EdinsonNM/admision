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
import { hashHistory } from 'react-router';

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

import PeriodoService from '../../services/PeriodoService';
let service = new PeriodoService(); 
export default class Periodo extends React.Component {
  constructor(){
    super();
     this.state = {
        id:0,
        anio: '',
        periodo:1,
        nombre: '',
        resolucion:'',
        fechaResolucion:new Date(),
        inicio:new Date(),
        fin:new Date(),
        activo:false
    };
  }


  componentDidMount(){
    let id=this.props.params.id;
    if(id){
      service.get(id,(error,data)=>{
        this.setState(data);
      });
    }
  }
 handleChange(key, event){
		let state = this.state;
		state[key] = event.target.value;
		this.setState(state);
	}
   handleChangeDate(key, event, date){
    let state = this.state;
		state[key] = date;
    this.setState(state);
  }
  handleSave(){
    if(this.state.id==0){
      let data = JSON.parse(JSON.stringify(this.state));
      delete data.id;
      service.post(data,()=>{
          console.log('save ok...');
          hashHistory.goBack()
      });
    }else{
      let data = JSON.parse(JSON.stringify(this.state));
      delete data.uid;
      delete data.id;
      service.update(this.state.id,data,()=>{
          console.log('update ok...');
          hashHistory.goBack()
      });
    }

  }
  handleBack(){
    hashHistory.goBack()
  }
  handleChange(key, event){
		let state = this.state;
		state[key] = event.target.value;
		this.setState(state);
	}

  componentDidMount(){

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
            El periodo académico es el período del año en que los estudiantes van a sus centros de enseñanza. Generalmente dura entre 4 y 6 meses  dependiendo del país e institución.


            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField  
                    onChange = {(e)=>{this.handleChange('anio',e);}}
                    value = {this.state.anio}  floatingLabelText="Año" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField  
                    onChange = {(e)=>{this.handleChange('periodo',e);}}
                    value = {this.state.periodo}  floatingLabelText="Periodo" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField  
                    onChange = {(e)=>{this.handleChange('nombre',e);}}
                    value = {this.state.nombre}  floatingLabelText="Nombre" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField  
                    onChange = {(e)=>{this.handleChange('resolucion',e);}}
                    value = {this.state.resolucion}  floatingLabelText="Resolución" fullWidth/><br />
                </div>
            </div>
             <div className="row">
                 <div className="col-xs-12 col-sm-6 col-md-3">
                    <DatePicker  
                    onChange = {(event, date)=>{this.handleChangeDate('fechaResolucion',event,date);}}
                    defaultDate = {this.state.fechaResolucion} 
                    hintText="Fecha de Resolución" autoOk={true}  floatingLabelText="Fecha de Resolución" fullWidth/>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <DatePicker  
                    onChange = {(event, date)=>{this.handleChangeDate('inicio',event,date);}}
                    defaultDate = {this.state.inicio} 
                    hintText="Inicio del Periodo" autoOk={true}  floatingLabelText="Inicio del Periodo" fullWidth/>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <DatePicker  
                    onChange = {(event, date)=>{this.handleChangeDate('fin',event,date);}}
                    defaultDate = {this.state.fin} 
                    hintText="Fin del Periodo" autoOk={true}  floatingLabelText="Fin del Periodo" fullWidth/>
                </div>
                  <div className="col-xs-12 col-sm-6 col-md-3">
                    <Checkbox label="Periodo Activo" onChange = {(e)=>{this.handleChange('activo',e);}}  value = {this.state.activo}  style={{marginTop:'35px'}}/>
                </div>
            </div>
           <div className="row">
                   <div className="col-xs-12 col-sm-6 col-md-3">
                </div>
                 <div className="col-xs-12 col-sm-6 col-md-3">
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                </div>
              
            </div>
                <FlatButton
                  label="Volver"
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
