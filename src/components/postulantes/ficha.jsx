import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {grey400, darkBlack, lightBlack,red500} from 'material-ui/styles/colors';
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
import Voucher from '../../models/Voucher';
import VoucherService from '../../services/VoucherService';
import BancoService from '../../services/BancoService';
import { hashHistory } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import moment from 'moment';

let service = new VoucherService();
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,

} from 'material-ui/Stepper';
const style = {
        marginRight: 20,
        position:'fixed',
        bottom:'10px',
        right:'10px',
        zIndex:'1000'
    };
export default class Ficha extends React.Component {
  constructor (props) {
    super(props);
     this.state = {
		data:{},
        id:0,
        codigo: '',
        nombre: '',
		newVoucher:false,
		vouchers:[],
		
    };
	this.bancos= BancoService.getAll();
  }
  toggleVoucher(){
	  this.setState({newVoucher:!this.state.newVoucher});
  }


  componentDidMount(){
    let id=this.props.params.id;
    if(id){
      service.get(id,(error,data)=>{
        this.setState(data);
      });
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
  handleKeyPress(event){
	if(event.key == 'Enter'){
		console.log('enter press here! ');
		this.loadVouchers();
	}
}
loadVouchers(){
	service.getAll({},(error,data)=>{
			if(error) return;
			this.setState({vouchers:data});
		},false,`${this.props.params.admision}/${this.state.dni}`);
}
  handleSave(){
	let model= new Voucher(this.state);
	model.fecha = Date.parse(model.fecha);
    if(this.state.id==0){
      
      service.post(model,()=>{
          console.log('save ok...');
          this.setState({newVoucher:false});
		  this.loadVouchers();
      },`${this.props.params.admision}/${this.state.dni}`,false);
    }else{
      let data = JSON.parse(JSON.stringify(this.state));
      delete data.uid;
      delete data.id;
      service.update(this.state.id,data,()=>{
          console.log('update ok...');
          this.setState({newVoucher:false});
      });
    }

  }
  handleBack(){
    hashHistory.goBack()
  }
  render(){
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
    const rightIconButton = (
        	<IconButton
				touch={true}
				tooltip="Eliminar Voucher"
				tooltipPosition="bottom-left"
				>
				<DeleteIcon color={grey400} />
			</IconButton>
        );


    return (
          <Card>
            <CardHeader
            title="Registro de Vouchers"
            subtitle="Admisión"
             avatar="images/user0.jpg"
            />

            <CardText >
            Ingrese todos los campos obligatorios y a continuación presione GRABAR para registrar la facultad.
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <TextField 
                    onChange = {(e)=>{this.handleChange('dni',e);}}
					onKeyUp={this.handleKeyPress.bind(this)}
                    value = {this.state.dni} 
                    floatingLabelText="Dni de postulante" 
                    required
					disabled={this.state.newVoucher}
                    fullWidth/>
                </div>

              
            </div>
			{
				(this.state.newVoucher)?
				<div className="row">
				 <div className="col-md-12">
					 <h3>Registrar Voucher</h3>
				 </div>
				  <div className="col-xs-12 col-sm-3 col-md-3">
                    <SelectField
                        fullWidth
                        floatingLabelText="Banco"
                        value={this.state.banco}
                        onChange={(event, index, value)=>{this.handleChangeSelect('banco',event, index, value)}}
                        >
						{
							this.bancos.map((item,index)=>{
								return <MenuItem key={index} value={item.id} primaryText={item.nombre} />;

							})
						}
                        </SelectField>
                </div>
                <div className="col-xs-12 col-sm-3 col-md-3">
                    <SelectField
                        fullWidth
                        floatingLabelText="Tipo de Pago"
                        value={this.state.tipoPago}
                        onChange={(event, index, value)=>{this.handleChangeSelect('tipoPago',event, index, value)}}
                        >
                        <MenuItem value="Deposito" primaryText="Depósito" />
                        </SelectField>
                </div>
				<div className="col-xs-12 col-sm-3 col-md-3">
                   <DatePicker  
                    onChange = {(event, date)=>{this.handleChangeDate('fecha',event,date);}}
                    defaultDate = {this.state.fecha} 
                    hintText="Fecha de Resolución" autoOk={true}  floatingLabelText="Fecha de Pago" fullWidth/>
                </div>
					
              <div className="col-xs-12 col-sm-3 col-md-3">
                    <TextField 
                    onChange = {(e)=>{this.handleChange('monto',e);}}
                    value = {this.state.monto} 
                    floatingLabelText="Monto" 
                    required
                    fullWidth/>
                </div>
                <div className="col-xs-12 col-sm-3 col-md-3">
                    <TextField 
                    onChange = {(e)=>{this.handleChange('codigo',e);}}
                    value = {this.state.codigo} 
                    floatingLabelText="Código de Operación" 
                    required
                    fullWidth/>
                </div>
				<div className="col-xs-12 col-sm-12 col-md-12">
				  <FlatButton
                  label="Volver"
                  disabled={stepIndex === 0}
                  onTouchTap={this.toggleVoucher.bind(this)}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label='Grabar'
                  primary={true}
                  onTouchTap={this.handleSave.bind(this)}
                />
				</div>
            </div>:
			(this.state.vouchers.length==0)?
				<div className="layout vertical center-center emptyContainer">Se encontraron 0 vouchers registrados</div>
				:
				 <List>
					<Subheader>Vouchers registrados</Subheader>
					{
						this.state.vouchers.map((item,index)=>{
							return <ListItem key={index} 
							primaryText={<div><strong>{BancoService.get(item.banco).nombre}</strong> <span style={{fontSize:'9px',color:'#c2c2c2'}}>[ {moment(new Date(item.fecha)).format("L")} ]</span></div>} 
							secondaryText={item.codigo}	
							rightIconButton={rightIconButton}
							secondaryText={
								<p>
								<span style={{color: darkBlack}}>
									Monto: S/. {parseFloat(item.monto).toFixed(2)}
								</span><br />
								Código de Operación: {item.codigo}
								</p>
								}
							secondaryTextLines={2}
							/>;
						})
					}
					
				</List>
			}
			 
              
				{
					(!this.state.newVoucher)?
					<FloatingActionButton style={style} onTouchTap={this.toggleVoucher.bind(this)}>
						<ContentAdd />
					</FloatingActionButton>
					:
					<div></div>
				}
				
            </CardText>
        </Card>
    );
  }
}
