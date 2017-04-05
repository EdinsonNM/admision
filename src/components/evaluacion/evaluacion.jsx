import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import PostulanteService from '../../services/PostulanteService';
let service = new PostulanteService();
export default class Evaluacion extends React.Component {
  constructor() {
    super();
    this.state = { open: false ,data:null,puntaje:0,situacion:''};
  }
  open(data){
    this.setState({open:true,data:data});
  }
  close(){
    this.setState({open:false});
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
      
  }
  render() {
      const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.close.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    if(this.state.open){
        return(
            <Dialog
                title="Registro de Evaluación"
                actions={actions}
                modal={true}
                open={this.state.open}
            >
            <div className="row">
                <div className="col-md-12">
                    <SelectField
                    fullWidth
                    floatingLabelText="Situación Evaluación"
                    value={this.state.situacion}
                    onChange={(event, index, value)=>{this.handleChangeSelect('situacion',event, index, value)}}
                    >
                    <MenuItem value="I" primaryText="Con Puntaje" />
                    <MenuItem value="casado" primaryText="Exonerado" />
                    <MenuItem value="viudo" primaryText="No se presento" />
                    </SelectField>
                </div>
                <div className="col-md-12">
                    <TextField ref="puntaje"  onChange = {(e)=>{this.handleChange('dni',e);}} value={this.state.dni}  floatingLabelText="Puntaje" fullWidth/>
                </div>   
                
            </div>
            </Dialog>
        );
    }else{
        return null;
    }
  }

  componentDidMount() {
      if(this.state.open){
        this.refs.puntaje.focus();
        document.querySelector('input').focus();
      }
    
  }
}
