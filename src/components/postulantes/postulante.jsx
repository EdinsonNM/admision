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
    };
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

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Select campaign settings...';
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
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
            <StepLabel>Datos Personales</StepLabel>
             <StepContent>
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField defaultValue="" floatingLabelText="Nombres" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField defaultValue="" floatingLabelText="Apellido Paterno" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField defaultValue="" floatingLabelText="Apellido Materno" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField defaultValue="" floatingLabelText="DNI" fullWidth/><br />
                </div>
            </div>
             <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField defaultValue="" floatingLabelText="Fexcha de Nacimiento" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField defaultValue="" floatingLabelText="Dirección" fullWidth/><br />
                </div>
                  <div className="col-xs-12 col-sm-6 col-md-3">
                    <SelectField
                        fullWidth
                        floatingLabelText="Estado Civil"
                        value={this.state.value}
                        onChange={this.handleChange}
                        >
                        <MenuItem value={1} primaryText="Never" />
                        <MenuItem value={2} primaryText="Every Night" />
                        <MenuItem value={3} primaryText="Weeknights" />
                        <MenuItem value={4} primaryText="Weekends" />
                        <MenuItem value={5} primaryText="Weekly" />
                        </SelectField>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3"></div>
            </div>
             <div className="row">
                
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField defaultValue="" floatingLabelText="Teléfono" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField defaultValue="" floatingLabelText="Email" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField defaultValue="" floatingLabelText="Celular" fullWidth/><br />
                </div>
              
            </div>
            <div className="row">

                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField defaultValue="" floatingLabelText="Departamento" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField defaultValue="" floatingLabelText="Provincia" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField defaultValue="" floatingLabelText="Distrito" fullWidth/><br />
                </div>

            </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Datos académicos</StepLabel>
            <StepContent>
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField defaultValue="" floatingLabelText="Colegio" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField defaultValue="" floatingLabelText="Año termino colegio" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField defaultValue="" floatingLabelText="Floating Label Text" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField defaultValue="" floatingLabelText="Floating Label Text" fullWidth/><br />
                </div>
            </div>
           
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Datos Generales</StepLabel>
            <StepContent>
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField defaultValue="" floatingLabelText="Floating Label Text" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField defaultValue="" floatingLabelText="Floating Label Text" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField defaultValue="" floatingLabelText="Floating Label Text" fullWidth/><br />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField defaultValue="" floatingLabelText="Floating Label Text" fullWidth/><br />
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
                  label="Back"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev.bind(this)}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  onTouchTap={this.handleNext.bind(this)}
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
