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


const style={
  appbar:{
    backgroundColor:'var(--paper-purple-700)'
  }
}
export default class Postulantes extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      open:this.props.open
    };
  }
  handleDrawerToggle(){
    console.log("show/hide drawer...")
    this.setState({open: !this.state.open});
  } 

  componentDidMount(){

  }
  render(){
    
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
            title="Listado de Postulantes"
            subtitle="Admisión"
             avatar="images/user0.jpg"
            />

            <CardText >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.

   
      <List>
        <Subheader>Today</Subheader>
        <ListItem
          leftAvatar={<Avatar src="images/user0.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText="Brendan Lim"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Brunch this weekend?</span><br />
              Ing. Industrial / ing. Sistemas
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="images/user0.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText="me, Scott, Jennifer"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Summer BBQ</span><br />
              Wish I could come, but I&apos;m out of town this weekend.
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="images/user0.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText="Grace Ng"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Oui oui</span><br />
              Do you have any Paris recs? Have you ever been?
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="images/user0.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText="Kerem Suer"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Birthday gift</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="images/user0.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText="Raquel Parrado"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Recipe to try</span><br />
              We should eat this: grated squash. Corn and tomatillo tacos.
            </p>
          }
          secondaryTextLines={2}
        />
      </List>
      <List>
        <Subheader>Other days</Subheader>
        <ListItem
          leftAvatar={<Avatar src="images/user0.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText="Brendan Lim"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Brunch this weekend?</span><br />
              Ing. Industrial / ing. Sistemas
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="images/user0.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText="me, Scott, Jennifer"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Summer BBQ</span><br />
              Wish I could come, but I&apos;m out of town this weekend.
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="images/user0.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText="Grace Ng"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Oui oui</span><br />
              Do you have any Paris recs? Have you ever been?
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="images/user0.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText="Kerem Suer"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Birthday gift</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="images/user0.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText="Raquel Parrado"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Recipe to try</span><br />
              We should eat this: grated squash. Corn and tomatillo tacos.
            </p>
          }
          secondaryTextLines={2}
        />
      </List>
            </CardText>
        </Card>
    );
  }
}
