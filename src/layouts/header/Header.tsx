import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Navbar,
  Collapse,
  Nav,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from 'reactstrap';
import LogoWhite from '../../assets/images/logos/logo.png';
import user1 from '../../assets/images/users/user1.jpg';
import { authSelector } from '../../redux/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/action';
import { useRouter } from 'next/router';

const Header = ({ showMobmenu }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const isAuthenticated = useSelector(authSelector);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  const handleAuthenClick = () => {
    if (isAuthenticated) {
      dispatch(logout());
    } else {
      router.push('/login');
    }
  };

  return (
    <Navbar color='primary' dark expand='md'>
      <div className='d-flex align-items-center'>
        <NavbarBrand href='/' className='d-lg-none'>
          <Image src={LogoWhite} alt='logo' />
        </NavbarBrand>
        <Button color='primary' className='d-lg-none' onClick={showMobmenu}>
          <i className='bi bi-list'></i>
        </Button>
      </div>
      <div className='hstack gap-2'>
        <Button
          color='primary'
          size='sm'
          className='d-sm-block d-md-none'
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className='bi bi-x'></i>
          ) : (
            <i className='bi bi-three-dots-vertical'></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className='me-auto' navbar></Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color='primary'>
            <div style={{ lineHeight: '0px' }}>
              <Image
                src={user1}
                alt='profile'
                className='rounded-circle'
                width='30'
                height='30'
              />
            </div>
          </DropdownToggle>
          <DropdownMenu>
            {/* <DropdownItem header>Info</DropdownItem>
            <DropdownItem>My Account</DropdownItem>
            <DropdownItem>Edit Profile</DropdownItem>
            <DropdownItem divider /> */}
            <DropdownItem onClick={handleAuthenClick}>
              {isAuthenticated ? 'Đăng xuất' : 'Đăng nhập'}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
