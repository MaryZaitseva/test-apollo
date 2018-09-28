import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { compose, withState, withHandlers } from 'recompose';

const Navigation = props =>  {
    return (
      <Menu pointing secondary>
        <Menu.Item
          name='login'
          active={props.activeItem==='login'}
          onClick={props.handleItemClick}
          as={ Link }
          to='/'>
            Login
        </Menu.Item>
        <Menu.Item
          name='signup'
          active={props.activeItem==='signup'}
          onClick={props.handleItemClick}
          as={ Link }
          to='/signup'>
            Sign up
        </Menu.Item>         
        </Menu>
    );
}

const enhance = compose(
  withState('activeItem', 'setActiveItem', 'login'),
  withHandlers({
    handleItemClick: props => event => {
      if(window.location.href.includes('signup')){
        props.setActiveItem('login')
      } else {
        props.setActiveItem('signup')
      }
    }
  })
)

export default enhance(Navigation);