import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'shopping',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/shopping/shopping.module').then(m => m.ShoppingPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/shopping',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/shopping',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
