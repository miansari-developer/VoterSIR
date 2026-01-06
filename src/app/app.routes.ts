import { Routes } from '@angular/router';
import { Home2 } from './components/home2/home2';
import { SIRListPage } from './components/sirlist-page/sirlist-page';
import { LastSirPage } from './components/last-sir-page/last-sir-page';

export const routes: Routes = [
  {
    path: '',
    component: Home2,
  },
  {
    path: 'epics',
    component: SIRListPage,
  },
   {
    path: 'lastsir',
    component: LastSirPage,
  },
];
