import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem , Button} from 'reactstrap';

const ProjectLinksButton = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const navigateToLink = (link) => {
    window.open(link, '_blank');
  }

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} style={props.style}>
      <DropdownToggle tag="span"
        data-toggle="dropdown"
        aria-expanded={dropdownOpen}>
         <Button className="btn-simple btn-round" color="primary" type="button" style={{paddingLeft: 15, paddingRight: 15}}>
            Links
            <i className="tim-icons icon-minimal-down" style={{marginLeft: 5}} />
          </Button>
      </DropdownToggle>
      <DropdownMenu>
        {props.links.map(link => (
          <DropdownItem style={{cursor: 'pointer'}} onClick={() => navigateToLink(link.url)}>{link.name}</DropdownItem>
        ))}
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default ProjectLinksButton;