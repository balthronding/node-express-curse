import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ListaNotasComponent as ListaNotasComponent } from './components/lista-productos/lista-productos.component';
import { AnadirNotaComponent } from './components/anadir-producto/anadir-producto.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"registro",component:RegistroComponent},
  {path:"lista-notas", component:ListaNotasComponent},
  {path:"anadir-producto", component:AnadirNotaComponent},
  {path:'',redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
