import React from 'react';
import IconButton from './IconButton';

interface MenuButtonPropTypes {
  data: {
    menuLink: string;
  };
}

// TODO link to open Google maps app
const MenuButton = ({ data }: MenuButtonPropTypes): JSX.Element => {
  const { menuLink } = data;
  return (
    <IconButton>
      <a href={menuLink}>
        <div className="icon">
          <img src="/assets/icons/ticket.svg" alt="menu icon" />
        </div>
        MENU
      </a>
    </IconButton>
  );
};

export default MenuButton;
