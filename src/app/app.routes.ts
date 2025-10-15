import { Routes } from '@angular/router';
import { Ajustes } from './componentes/ajustes/ajustes';
import { Calculadora } from './componentes/funcionalidades/calculadora';
import { Inicio } from './componentes/inicio/inicio';
import { Marketplace } from './componentes/marketplace/marketplace';
import { Reportes } from './componentes/reportes/reportes';
import { SectorProducto } from './componentes/sector-producto/sector-producto';
import { Login } from './componentes/login/login';
import { Registro } from './registro/registro';
import { Perfil } from './componentes/perfil/perfil';
import { CueroComponent } from './componentes/calculo/cuero/cuero';
import { Material } from './componentes/calculo/material/material';
import { Textil } from './componentes/calculo/textil/textil';
import { Asistente } from './componentes/asistente/asistente';
import { IngresoProducto } from './componentes/ingreso-producto/ingreso-producto';
import { GestionProductos } from './componentes/gestion-productos/gestion-productos';
import { Perfilvendedor } from './componentes/perfilvendedor/perfilvendedor';
import { IngresoMadera } from './componentes/ingreso-madera/ingreso-madera';
import { Marketprincipal } from './componentes/marketprincipal/marketprincipal';
import { Venderplantilla } from './componentes/venderplantilla/venderplantilla';
import { Notfound } from './componentes/notfound/notfound';
import { IngresoCuero } from './componentes/ingreso-cuero/ingreso-cuero';
import { clienteRestriccionGuard } from './guard/cliente-restriccion-guard';
import { NoAutorizado } from './componentes/no-autorizado/no-autorizado';
import { loginRestriccionGuard } from './guard/login-restriccion-guard';

export const routes: Routes = [
    {path:'ajustes', component:Ajustes},
    {path:'', component:Inicio},
    {path:'calculadora', component:Calculadora,canActivate:[clienteRestriccionGuard]},
    {path:'asistente', component:Asistente,canActivate:[clienteRestriccionGuard]},
    {path:'login', component:Login,canActivate:[loginRestriccionGuard]},
    {path:'marketplace', component:Marketplace},
    {path:'reportes', component:Reportes,canActivate:[clienteRestriccionGuard]},
    {path:'sectorpro', component:SectorProducto,canActivate:[loginRestriccionGuard]},
    {path:'registro', component:Registro,canActivate:[loginRestriccionGuard]},
    {path:'perfil', component:Perfil},
    {path:'cuero', component:CueroComponent,canActivate:[clienteRestriccionGuard]},
    {path:'material', component:Material,canActivate:[clienteRestriccionGuard]},
    {path:'textil', component:Textil,canActivate:[clienteRestriccionGuard]},
    {path:'ingresarpro', component:IngresoProducto,canActivate:[clienteRestriccionGuard]},
    {path:'visitarperfil/:id', component:Perfilvendedor},
    {path:'gestionpro', component:GestionProductos,canActivate:[clienteRestriccionGuard]},
    {path:'ingresoMadera', component:IngresoMadera,canActivate:[clienteRestriccionGuard]},
    {path:'marketprincipal', component:Marketprincipal},
    {path:'venderplantilla', component:Venderplantilla,canActivate:[clienteRestriccionGuard]},
    {path:'ingresoCuero', component:IngresoCuero,canActivate:[clienteRestriccionGuard]},
    {path:'no-autorizado', component:NoAutorizado},
    {path:'**', component:Notfound}
];
