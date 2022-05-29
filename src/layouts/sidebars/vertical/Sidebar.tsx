import { Button, Nav, NavItem } from 'reactstrap';
import Logo from '../../logo/Logo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { profileSelector } from '../../../redux/auth/selectors';
import { ROUTERS } from '../../../configs/navigators';

const navigation = [
  {
    title: 'Dashboard',
    href: '/',
    icon: 'bi bi-speedometer2',
  },
  {
    title: 'Hello',
    href: '/ui/hello',
    icon: 'bi bi-bell',
  },
  {
    title: 'Badges',
    href: '/ui/badges',
    icon: 'bi bi-patch-check',
  },
  {
    title: 'Buttons',
    href: '/ui/buttons',
    icon: 'bi bi-hdd-stack',
  },
  {
    title: 'Cards',
    href: '/ui/cards',
    icon: 'bi bi-card-text',
  },
  {
    title: 'Grid',
    href: '/ui/grid',
    icon: 'bi bi-columns',
  },
  {
    title: 'Table',
    href: '/ui/tables',
    icon: 'bi bi-layout-split',
  },
  {
    title: 'Forms',
    href: '/ui/forms',
    icon: 'bi bi-textarea-resize',
  },
  {
    title: 'Breadcrumbs',
    href: '/ui/breadcrumbs',
    icon: 'bi bi-link',
  },
  {
    title: 'About',
    href: '/about',
    icon: 'bi bi-people',
  },
];

const Sidebar = ({ showMobilemenu }) => {
  let curl = useRouter();
  const location = curl.pathname;
  const profile = useSelector(profileSelector);

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
          {/* <Button
            color='danger'
            tag='a'
            target='_blank'
            className='mt-3'
            href='https://www.wrappixel.com/templates/xtreme-react-redux-admin/?ref=33'
          >
            Upgrade To Pro
          </Button> */}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
