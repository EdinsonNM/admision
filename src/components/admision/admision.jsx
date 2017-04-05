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
import EscuelaService from '../../services/EscuelaService';
import ModalidadAdmisionService from '../../services/ModalidadAdmisionService';
import AdmisionService from '../../services/AdmisionService';
import Cache from '../../services/Cache';
import Checkbox from 'material-ui/Checkbox';
import _ from 'underscore';
import { hashHistory } from 'react-router';

let escuelaService=new EscuelaService();
let service = new AdmisionService();
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
export default class Admision extends React.Component {
  constructor (props) {
    super(props);
     this.state = {
        id:0,
        finished: false,
        stepIndex: 0,
        periodo:'',
        modalidad:'',
        descripcion:'',
        inicio:new Date(),
        fin: new Date(),
        escuelas: Cache.getData('escuelas'),
    };
  }
  componentDidMount(){

  }
handleNext(){
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex > 2,
    });
  }

  handlePrev(){
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  handleChangeDate(key, event, date){
    let state = this.state;
		state[key] = date;
    this.setState(state);
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
handleChangeVacante(facultad,escuela,e){
  let escuelas = this.state.escuelas;
  
  escuelas[facultad][escuela].vacante = e.target.value;
  this.setState({escuelas:escuelas});
}
handleCheckEscuela(facultad,escuela,e,isChecked){
  let escuelas = this.state.escuelas;
  escuelas[facultad][escuela].active = isChecked;
  this.setState({escuelas:escuelas});
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

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Ingrese los datos de inicio y periodo del proceso de admisión y presione siguiente para continuar';
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
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
    let periodos =[];

    for(let key in  Cache.getData('periodos')){
        periodos.push(<MenuItem value={key} primaryText={Cache.getItem('periodos',key).nombre} key={key}/>);        
    };

    let procesos =[];

    for(let key in  Cache.getData('modalidadadmision')){
        procesos.push(<MenuItem value={key} primaryText={Cache.getItem('modalidadadmision',key).nombre} key={key}/>);        
    };

    
    let facultades=[];
    for(let idFacultad in this.state.escuelas){
        let escuelasItems=[];
        let facultad= Cache.getItem('facultades',idFacultad);
        for(let key in this.state.escuelas[idFacultad]){
          if(key!=='id'){

            let escuela = this.state.escuelas[idFacultad][key];
            escuelasItems.push(
            <div className="row" key={key}>

                  <div className="col-xs-8 col-md-10">
                      <Checkbox
                          checked={escuela.active}
                          label={escuela.nombre}
                          style={{marginTop:'10px'}}
                          onCheck={(e,isChecked)=>{ this.handleCheckEscuela(facultad.id,escuela.id,e,isChecked);}}
                          />
                      
                  </div>
                  <div className="col-xs-4 col-md-2">
                      <TextField disabled={!escuela.active} value={escuela.vacante} onChange = {(e)=>{this.handleChangeVacante(facultad.id,escuela.id,e);}} type="number" defaultValue="" hintText="Vacantes" fullWidth/> 
                  </div>
                  <Divider />
              </div>
            );
          }
        }

        facultades.push(
          <List key={idFacultad}>
              <Subheader>{facultad.nombre}</Subheader>
              {escuelasItems}
          </List>
        );
    }
    return (
          <Card>
            <CardHeader
            title="Registro de Proceso de Admisión"
            subtitle="Admisión"
             avatar="images/user0.jpg"
            />

            <CardText >
    Existen diversas modalidades de admisión: examen para escolares, examen de admisión para egresados, tercio superior de los colegios acreditados, bachillerato internacional, primero o segundo puesto en la educación secundaria, diplomático o funcionario internacional con rango diplomático cumpliendo misión oficial en el Perú (cónyuge o hijos) y a través del Centro de Estudios Preuniversitarios (Cepre).

    <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Datos Generales</StepLabel>
             <StepContent>
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <SelectField
                        fullWidth
                        floatingLabelText="Periodo"
                        value={this.state.periodo}
                       onChange={(event, index, value)=>{this.handleChangeSelect('periodo',event, index, value)}}
                        >
                       {periodos}
                        </SelectField>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <SelectField
                        fullWidth
                        floatingLabelText="Tipo de Proceso"
                        value={this.state.modalidad}
                        onChange={(event, index, value)=>{this.handleChangeSelect('modalidad',event, index, value)}}
                        >
                        {procesos}
                        </SelectField>
                </div>
               <div className="col-xs-12 col-sm-6 col-md-3">
                    <DatePicker  
                    onChange = {(event, date)=>{this.handleChangeDate('inicio',event,date);}}
                    defaultDate = {this.state.inicio} 
                    hintText="Fecha de Resolución" autoOk={true}  floatingLabelText="Inicio del Proceso" fullWidth/>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                     <DatePicker  
                    onChange = {(event, date)=>{this.handleChangeDate('fin',event,date);}}
                    defaultDate = {this.state.fin} 
                    hintText="Fecha de Resolución" autoOk={true}  floatingLabelText="Fin del Proceso" fullWidth/>
                </div>
            </div>
           <div className="row">

                <div className="col-xs-12 col-sm-6 col-md-3">
                    <DatePicker  
                    onChange = {(event, date)=>{this.handleChangeDate('inicio',event,date);}}
                    defaultDate = {this.state.inicio} 
                    hintText="Fecha de Resolución" autoOk={true}  floatingLabelText="Inicio Matrícula" fullWidth/>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <DatePicker  
                    onChange = {(event, date)=>{this.handleChangeDate('inicio',event,date);}}
                    defaultDate = {this.state.inicio} 
                    hintText="Fecha de Resolución" autoOk={true}  floatingLabelText="Fin Matrícula" fullWidth/>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6">
                    <TextField  onChange = {(e)=>{this.handleChange('descripcion',e);}} value={this.state.descripcion} floatingLabelText="Descripción" fullWidth/>
                </div>
           </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Vacantes por escuela</StepLabel>
            <StepContent>
                {facultades}
            </StepContent>
          </Step>
            <Step>
                <StepLabel>Confirmación de datos</StepLabel>
                <StepContent>
                   <div className="row">
                      <div className="col-xs-12 col-sm-6 col-md-3">
                        Periodo: {Cache.getItem('periodos',this.state.periodo).nombre}
                      </div>
                      <div className="col-xs-12 col-sm-6 col-md-3">
                          Modalidad: {this.state.modalidad}
                      </div>
                    <div className="col-xs-12 col-sm-6 col-md-3">
                        Inicio: {this.state.inicio.toString('d/m/yy')}
                      </div>
                      <div className="col-xs-12 col-sm-6 col-md-3">
                          Fin: {this.state.fin.toString()}
                      </div>
                  </div>
                <div className="row">

                      <div className="col-xs-12 col-sm-6 col-md-3">
                        
                      </div>
                      <div className="col-xs-12 col-sm-6 col-md-3">
                          
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-6">
                          Descripción:{this.state.descripcion}
                      </div>
                </div>
                </StepContent>
            </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <p>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              >
                Click here
              </a> to reset the example.
            </p>
          ) : (
            <div>
              <p>{this.getStepContent(stepIndex)}</p>
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Atras"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev.bind(this)}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Grabar' : 'Siguiente'}
                  primary={true}
                  onTouchTap={stepIndex === 2 ?this.handleSave.bind(this) :this.handleNext.bind(this) }
                />
              </div>
            </div>
          )}
        </div>
            </CardText>
        </Card>
    );
  }
}
