import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import DepartamentoService from '../../services/DepartamentoService';
import ProvinciaService from '../../services/ProvinciaService';
import DistritoService from '../../services/DistritoService';
import AdmisionService from '../../services/AdmisionService';
import PostulanteService from '../../services/PostulanteService';
import Cache from '../../services/Cache';
import { hashHistory } from 'react-router';
import PostulanteModel from '../../models/Postulante';

let service = new PostulanteService();
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
export default class Postulante extends React.Component {
  constructor (props) {
    super(props);
     this.state = {
        finished: false,
        stepIndex: 0,
        admisiones:[]
    };
    this.facultades = Cache.getData('escuelas');
  }
handleNext(){
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
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
  handleSave(){
    let postulante = new PostulanteModel(this.state);
    if(!this.state.hasOwnProperty('id')){
      service.post(postulante,()=>{
          console.log('save ok...');
          hashHistory.goBack()
      },this.state.admision);
    }else{
      service.update(postulante.id,postulante,()=>{
          console.log('update ok...');
          hashHistory.goBack()
      },this.state.admision);
    }

  }
  handleBack(){
    hashHistory.goBack()
  }

  componentDidMount(){
    let service = new AdmisionService();
    service.getAll({},(error,data)=>{
      this.setState({admisiones:data});
    });
  }
  render(){
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    
    let escuelas = [];
    if(this.state.facultad){
     Object.keys(this.facultades[this.state.facultad]).forEach((key,index)=>{
       if(key!=='id'){
       console.log(Cache.getItem('escuelas',key));
        escuelas.push(<MenuItem value={Cache.getItem('escuelas',this.state.facultad)[key].id} primaryText={Cache.getItem('escuelas',this.state.facultad)[key].nombre} />)
       }
      })
    }

    return (
          <Card>
            <CardHeader
            title="Registro de Postulante"
            subtitle="Admisión"
             avatar="images/user0.jpg"
            />

            <CardText >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.

    <Stepper activeStep={stepIndex} orientation="vertical">
      <Step>
            <StepLabel>Datos del Postulante</StepLabel>
            <StepContent>
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-4">
                     <SelectField
                        fullWidth
                        floatingLabelText="Proceso de Admisión"
                        value={this.state.admision}
                        onChange={(event, index, value)=>{this.handleChangeSelect('admision',event, index, value)}}
                        >
                        {
                          this.state.admisiones.map((item)=>{
                            return (<MenuItem value={item.id} primaryText={"Proceso de Admision "+Cache.getItem('periodos',item.periodo).nombre+' - '+Cache.getItem('modalidadadmision',item.modalidad).nombre} />)
                          })
                        }
                        </SelectField>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                     <SelectField
                        fullWidth
                        floatingLabelText="Facultad"
                        value={this.state.facultad}
                        onChange={(event, index, value)=>{this.handleChangeSelect('facultad',event, index, value)}}
                        >
                        {
                          Object.keys(this.facultades).map((key,index)=>{
                            return (<MenuItem value={Cache.getItem('facultades',key).id} primaryText={Cache.getItem('facultades',key).nombre} />)
                          })
                        }

                        </SelectField>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                      <SelectField
                        fullWidth
                        floatingLabelText="Escuela"
                        value={this.state.escuela}
                        onChange={(event, index, value)=>{this.handleChangeSelect('escuela',event, index, value)}}
                        >
                       {escuelas}
                        </SelectField>
                </div>

            </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Datos Personales</StepLabel>
             <StepContent>
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <TextField  onChange = {(e)=>{this.handleChange('nombres',e);}} value={this.state.nombres}  floatingLabelText="Nombres" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <TextField  onChange = {(e)=>{this.handleChange('apePaterno',e);}} value={this.state.apePaterno} floatingLabelText="Apellido Paterno" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <TextField  onChange = {(e)=>{this.handleChange('apeMaterno',e);}} value={this.state.apeMaterno}  floatingLabelText="Apellido Materno" fullWidth/><br />
                </div>
               
            
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <TextField  onChange = {(e)=>{this.handleChange('dni',e);}} value={this.state.dni}  floatingLabelText="DNI" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <SelectField
                        fullWidth
                        floatingLabelText="Estado Civil"
                        value={this.state.estadoCivil}
                        onChange={(event, index, value)=>{this.handleChangeSelect('estadoCivil',event, index, value)}}
                        >
                        <MenuItem value="soltero" primaryText="Soltero(a)" />
                        <MenuItem value="casado" primaryText="Casado(a)" />
                        <MenuItem value="viudo" primaryText="Viudo(a)" />
                        <MenuItem value="divorciado" primaryText="Divorciado(a)" />
                        <MenuItem value="conviviente" primaryText="Conviviente" />
                        </SelectField>
                </div>
              <div className="col-xs-12 col-sm-6 col-md-4">
                    <DatePicker  
                    onChange = {(event, date)=>{this.handleChangeDate('fechaNacimiento',event,date);}}
                    defaultDate = {this.state.fechaNacimiento} 
                    hintText="Fecha de Resolución" autoOk={true}  floatingLabelText="Fecha de Nacimiento" fullWidth/>
                </div>
                

                  
               
            </div>
            <div className="row">

                 <div className="col-xs-12 col-sm-6 col-md-4">
                  <SelectField
                        fullWidth
                        floatingLabelText="Departamento"
                        value={this.state.departamento}
                        onChange={(event, index, value)=>{this.handleChangeSelect('departamento',event, index, value)}}
                        >
                       {
                         DepartamentoService.getAll({}).map((item,index)=>{
                            return (<MenuItem key={index} value={item.id_ubigeo} primaryText={item.nombre_ubigeo} />);
                         })
                       }
                        </SelectField>
                </div>
                 <div className="col-xs-12 col-sm-6 col-md-4">
                  <SelectField
                        fullWidth
                        floatingLabelText="Provincia"
                        value={this.state.provincia}
                        onChange={(event, index, value)=>{this.handleChangeSelect('provincia',event, index, value)}}
                        >
                       {
                         ProvinciaService.getAll(this.state.departamento,{}).map((item,index)=>{
                            return (<MenuItem key={index} value={item.id_ubigeo} primaryText={item.nombre_ubigeo} />);
                         })
                       }
                        </SelectField>
                </div>
                 <div className="col-xs-12 col-sm-6 col-md-4">
                  <SelectField
                        fullWidth
                        floatingLabelText="Distrito"
                        value={this.state.distrito}
                        onChange={(event, index, value)=>{this.handleChangeSelect('distrito',event, index, value)}}
                        >
                       {
                         DistritoService.getAll(this.state.provincia,{}).map((item,index)=>{
                            return (<MenuItem key={index} value={item.id_ubigeo} primaryText={item.nombre_ubigeo} />);
                         })
                       }
                        </SelectField>
                </div>
            </div>
            <div className="row">
                 <div className="col-md-12">
                    <TextField  onChange = {(e)=>{this.handleChange('direccion',e);}} value={this.state.direccion}  floatingLabelText="Dirección" fullWidth/><br />
                </div>
            </div>
             <div className="row">
                
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <TextField  onChange = {(e)=>{this.handleChange('telefono',e);}} value={this.state.telefono}  floatingLabelText="Teléfono" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <TextField type="email" onChange = {(e)=>{this.handleChange('email',e);}} value={this.state.email}  floatingLabelText="Email" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <TextField  onChange = {(e)=>{this.handleChange('celular',e);}} value={this.state.celular}  floatingLabelText="Celular" fullWidth/><br />
                </div>
              
            </div>
           
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Datos académicos</StepLabel>
            <StepContent>
            <div className="row">
               <div className="col-xs-12 col-sm-4 col-md-2">
                    <SelectField
                        fullWidth
                        floatingLabelText="Tipo de Colegio"
                        value={this.state.tipoColegio}
                        onChange={(event, index, value)=>{this.handleChangeSelect('tipoColegio',event, index, value)}}
                        >
                        <MenuItem value="particular" primaryText="Particular" />
                        <MenuItem value="estatal" primaryText="Estatal" />
                        </SelectField>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-8">
                    <TextField  onChange = {(e)=>{this.handleChange('colegio',e);}} value={this.state.colegio}  floatingLabelText="Colegio" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-2 col-md-2">
                    <TextField  onChange = {(e)=>{this.handleChange('anioColegio',e);}} value={this.state.anioColegio}  floatingLabelText="Año termino colegio" fullWidth/><br />
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
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
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
