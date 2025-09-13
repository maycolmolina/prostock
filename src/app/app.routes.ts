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

export const routes: Routes = [
    {path:'ajustes', component:Ajustes},
    {path:'calculadora', component:Calculadora},
    {path:'asistente', component:Asistente},
    {path:'login', component:Login},
    {path:'marketplace', component:Marketplace},
    {path:'reportes', component:Reportes},
    {path:'sectorpro', component:SectorProducto},
    {path:'registro', component:Registro},
    {path:'perfil', component:Perfil},
    {path:'cuero', component:CueroComponent},
    {path:'material', component:Material},
    {path:'textil', component:Textil},
    {path:'ingresarpro', component:IngresoProducto},
    {path:'gestionpro', component:GestionProductos},

    {path:'',component:Inicio}
];
