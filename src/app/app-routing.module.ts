import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'partylist', loadChildren: './partylist/partylist.module#PartylistPageModule' },
  { path: 'notification', loadChildren: './notification/notification.module#NotificationPageModule' },
  { path: 'emailbroadcast', loadChildren: './emailbroadcast/emailbroadcast.module#EmailbroadcastPageModule' },
  { path: 'smsbroadcast', loadChildren: './smsbroadcast/smsbroadcast.module#SmsbroadcastPageModule' },
  { path: 'birthdayanniversary', loadChildren: './birthdayanniversary/birthdayanniversary.module#BirthdayanniversaryPageModule' },
  { path: 'partydetails', loadChildren: './partydetails/partydetails.module#PartydetailsPageModule' },
  { path: 'addparty', loadChildren: './addparty/addparty.module#AddpartyPageModule' },
  { path: 'emaildetails', loadChildren: './emaildetails/emaildetails.module#EmaildetailsPageModule' },
  { path: 'smsdetails', loadChildren: './smsdetails/smsdetails.module#SmsdetailsPageModule' },
  { path: 'wishcard', loadChildren: './wishcard/wishcard.module#WishcardPageModule' },
  { path: 'editparty', loadChildren: './editparty/editparty.module#EditpartyPageModule' },
  { path: 'filteremail', loadChildren: './emailbroadcast/filteremail/filteremail.module#FilteremailPageModule' },
  { path: 'filterpageemail', loadChildren: './emailbroadcast/filterpageemail/filterpageemail.module#FilterpageemailPageModule' },
  { path: 'filtersms', loadChildren: './smsbroadcast/filtersms/filtersms.module#FiltersmsPageModule' },
  { path: 'filterpagesms', loadChildren: './smsbroadcast/filterpagesms/filterpagesms.module#FilterpagesmsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
