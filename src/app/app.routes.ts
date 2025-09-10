import { Routes } from '@angular/router';
import { Ajustes } from './componentes/ajustes/ajustes';
import { Calculadora } from './componentes/calculadora/calculadora';
import { Formulaciones } from './componentes/formulaciones/formulaciones';
import { Inicio } from './componentes/inicio/inicio';
import { Marketplace } from './componentes/marketplace/marketplace';
import { Reportes } from './componentes/reportes/reportes';
import { SectorProducto } from './componentes/sector-producto/sector-producto';
import { Login } from './componentes/login/login';
import { Registro } from './registro/registro';

export const routes: Routes = [
    {path:'ajustes', component:Ajustes},
    {path:'calculadora', component:Calculadora},
    {path:'formulaciones', component:Formulaciones},
    {path:'', component:Login},
    {path:'marketplace', component:Marketplace},
    {path:'reportes', component:Reportes},
    {path:'sectorpro', component:SectorProducto},
    {path:'registro', component:Registro}
];
