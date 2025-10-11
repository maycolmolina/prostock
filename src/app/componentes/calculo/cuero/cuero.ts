import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cuero',
  standalone: true,
  templateUrl: './cuero.html',
  styleUrls: ['./cuero.css'],
  imports: [FormsModule, CommonModule],
})
export class CueroComponent {
  productType: string = 'shoes';
  size: string = 'm';
  leatherType: string = 'fullGrain';
  hideSize: number = 50;
  quantity: number = 1;
  complexity: number = 3;

  // resultados
  resultValue: string = '0.00 pies²';
  detailProduct: string = '-';
  detailSize: string = '-';
  detailPerProduct: string = '-';
  detailLeatherType: string = '-';
  detailQuantity: number | string = '-';
  detailWaste: string = '-';
  leatherSuggestion: string =
    'Selecciona un tipo de producto para obtener recomendaciones de cuero.';

  // datos base
  productData: any = {
    shoes: {
      base: 5.5,
      36: 4.8,
      37: 5.0,
      38: 5.2,
      39: 5.4,
      40: 5.6,
      41: 5.8,
      42: 6.0,
      43: 6.3,
      44: 6.5,
    },
    belt: {
      base: 1.2,
      '90cm': 0.9,
      '100cm': 1.1,
      '110cm': 1.3,
      '120cm': 1.5,
      '130cm': 1.7,
      '140cm': 1.9,
    },
    wallet: { base: 1.0, monedero: 0.6, tarjetero: 0.8, billetera: 1.0, doble: 1.2 },
    bag: { base: 8.0, pequeña: 6.5, mediana: 8.0, grande: 9.5, viajera: 11.0 },
    jacket: { base: 18.0, xs: 15.0, s: 16.0, m: 18.0, l: 20.0, xl: 22.0, xxl: 24.0 },
    gloves: { base: 1.5, 6: 1.2, 7: 1.3, 8: 1.5, 9: 1.7, 10: 1.9, 11: 2.1 },
    custom: {
      base: 5.0,
      '20x20cm': 3.0,
      '25x25cm': 4.0,
      '30x30cm': 5.0,
      '35x35cm': 6.0,
      '40x40cm': 7.0,
      '50x50cm': 8.0,
    },
  };

  leatherFactors: any = {
    fullGrain: 1.0,
    topGrain: 0.9,
    genuine: 0.8,
    suede: 1.1,
    exotic: 1.3,
  };

  leatherSuggestions: any = {
    shoes: 'Cuero de vacuno de grano completo o superior para zapatos de calidad...',
    belt: 'Cuero de vacuno de buen grosor (3-4 mm)...',
    wallet: 'Cuero de becerro o cordero para su flexibilidad...',
    bag: 'Cuero resistente de vacuno para bolsos estructurales...',
    jacket: 'Cuero de ovino o caprino para chaquetas ligeras...',
    gloves: 'Cuero de cabritilla o gamuza para flexibilidad...',
    custom: 'Selecciona el cuero según el uso previsto del producto.',
  };

  productNames: any = {
    shoes: 'Zapatos (par)',
    belt: 'Cinturón / Faja',
    wallet: 'Cartera / Billetera',
    bag: 'Bolso / Morral',
    jacket: 'Chaqueta de cuero',
    gloves: 'Guantes (par)',
    custom: 'Producto Personalizado',
  };

  leatherTypeNames: any = {
    fullGrain: 'Cuero Grano Completo',
    topGrain: 'Cuero de Flor Superior',
    genuine: 'Cuero Genuino',
    suede: 'Gamuza',
    exotic: 'Cuero Exótico',
  };

  sizeNames: any = {
    xs: 'Extra Small',
    s: 'Small',
    m: 'Medium',
    l: 'Large',
    xl: 'Extra Large',
    xxl: 'Doble Extra Large',
  };
  calculateLeather() {
    // 1️⃣ Ajuste del consumo base realista
    let baseConsumption =
      this.productData[this.productType][this.size] || this.productData[this.productType]['base'];

    // Convertimos base a valores más realistas en pies²
    // Ejemplo: zapatos reales ≈ 1.4 pies² por par
    if (this.productType === 'shoes') baseConsumption = 1.4;
    if (this.productType === 'belt') baseConsumption = 0.5;
    if (this.productType === 'wallet') baseConsumption = 0.6;
    if (this.productType === 'bag') baseConsumption = 8.0;
    if (this.productType === 'jacket') baseConsumption = 20.0;
    if (this.productType === 'gloves') baseConsumption = 1.5;
    if (this.productType === 'custom') baseConsumption = baseConsumption; // se mantiene

    // 2️⃣ Factor de tipo de cuero (ligero ajuste)
    const typeFactor = this.leatherFactors[this.leatherType] || 1;

    // 3️⃣ Factor de complejidad más moderado
    const complexityFactor = 1 + this.complexity * 0.05; // antes era 0.1

    // 4️⃣ Factor de desperdicio más realista
    const wasteFactor = 1.1; // antes 1.15

    // 5️⃣ Consumo final por unidad
    const finalConsumptionPerUnit = baseConsumption * typeFactor * complexityFactor * wasteFactor;

    // 6️⃣ Total según cantidad
    const totalLeather = finalConsumptionPerUnit * this.quantity;

    // 7️⃣ Porcentaje de desperdicio realista
    const wastePercentage = Math.round((wasteFactor - 1) * 100);

    // Guardamos resultados
    this.resultValue = totalLeather.toFixed(2) + ' pies²';
    this.detailProduct = this.productNames[this.productType];
    this.detailSize = this.sizeNames[this.size] || this.size;
    this.detailPerProduct = finalConsumptionPerUnit.toFixed(2) + ' pies²';
    this.detailLeatherType = this.leatherTypeNames[this.leatherType] || this.leatherType;
    this.detailQuantity = this.quantity;
    this.detailWaste = wastePercentage + '%';
    this.leatherSuggestion = this.leatherSuggestions[this.productType] || '';
  }
  ngOnInit() {
    this.calculateLeather();
  }
}
