import { Button, Nav, NavItem } from 'reactstrap';
import Logo from '../../logo/Logo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { profileSelector } from '../../../redux/auth/selectors';
import { ROUTERS } from '../../../configs/navigators';
import { useEffect } from 'react';
import { IOrderStatus } from '../../../libs/apis/order/types';
import { getOrderByStatus } from '../../../redux/order';
import { allOrdersByStatusSelector } from '../../../redux/order/selectors';

const Sidebar = ({ showMobilemenu }) => {
  const dispatch = useDispatch();
  let curl = useRouter();
  const location = curl.pathname;
  const profile = useSelector(profileSelector);
  // const orderByStatus = useSelector(allOrdersByStatusSelector);
  // useEffect(() => {
  //   dispatch(getOrderByStatus({ status: IOrderStatus.Pending }));
  // }, []);

  return (
    <div className='p-3'>
      <div className='d-flex align-items-center'>
        <Logo />
        <Button
          close
          size='sm'
          className='ms-auto d-lg-none'
          onClick={showMobilemenu}
        ></Button>
      </div>
      <div className='pt-4 mt-2'>
        <Nav vertical className='sidebarNav'>
          {Object.values(ROUTERS).map((navi, index) => {
            return navi.roles.includes(profile?.roles) && !navi.hide ? (
              <NavItem key={index} className='sidenav-bg'>
                <Link href={navi.path}>
                  <a
                    className={
                      location === navi.path
                        ? 'text-primary nav-link py-3'
                        : 'nav-link text-secondary py-3'
                    }
                  >
                    <i className={navi.icon}></i>
                    <span className='ms-3 d-inline-block'>{navi.title}</span>
                  </a>
                </Link>
              </NavItem>
            ) : null;
          })}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
