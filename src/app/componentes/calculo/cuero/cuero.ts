import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cuero',
  standalone: true,
  templateUrl: './cuero.html',
  styleUrls: ['./cuero.css'],
  imports:[FormsModule]
})
export class CueroComponent {
  productType: string = 'shoes';
  size: string = 'm';
  leatherType: string = 'fullGrain';
  hideSize: number = 50;
  quantity: number = 1;
  complexity: number = 3;

  // resultados
  resultValue: string = "0.00 pies²";
  detailProduct: string = "-";
  detailSize: string = "-";
  detailPerProduct: string = "-";
  detailLeatherType: string = "-";
  detailQuantity: number | string = "-";
  detailWaste: string = "-";
  leatherSuggestion: string = "Selecciona un tipo de producto para obtener recomendaciones de cuero.";

  // datos base
  productData: any = {
    shoes: { base: 5.5, xs: 4.5, s: 5.0, m: 5.5, l: 6.0, xl: 6.5, xxl: 7.0 },
    belt: { base: 1.2, xs: 0.8, s: 1.0, m: 1.2, l: 1.4, xl: 1.6, xxl: 1.8 },
    wallet: { base: 1.0, xs: 0.7, s: 0.8, m: 1.0, l: 1.2, xl: 1.4, xxl: 1.6 },
    bag: { base: 8.0, xs: 6.0, s: 7.0, m: 8.0, l: 9.0, xl: 10.0, xxl: 11.0 },
    jacket: { base: 18.0, xs: 15.0, s: 16.0, m: 18.0, l: 20.0, xl: 22.0, xxl: 24.0 },
    gloves: { base: 1.5, xs: 1.2, s: 1.3, m: 1.5, l: 1.7, xl: 1.9, xxl: 2.1 },
    custom: { base: 5.0, xs: 3.0, s: 4.0, m: 5.0, l: 6.0, xl: 7.0, xxl: 8.0 }
  };

  leatherFactors: any = {
    fullGrain: 1.0,
    topGrain: 0.9,
    genuine: 0.8,
    suede: 1.1,
    exotic: 1.3
  };

  leatherSuggestions: any = {
    shoes: "Cuero de vacuno de grano completo o superior para zapatos de calidad...",
    belt: "Cuero de vacuno de buen grosor (3-4 mm)...",
    wallet: "Cuero de becerro o cordero para su flexibilidad...",
    bag: "Cuero resistente de vacuno para bolsos estructurales...",
    jacket: "Cuero de ovino o caprino para chaquetas ligeras...",
    gloves: "Cuero de cabritilla o gamuza para flexibilidad...",
    custom: "Selecciona el cuero según el uso previsto del producto."
  };

  productNames: any = {
    shoes: "Zapatos (par)",
    belt: "Cinturón / Faja",
    wallet: "Cartera / Billetera",
    bag: "Bolso / Morral",
    jacket: "Chaqueta de cuero",
    gloves: "Guantes (par)",
    custom: "Producto Personalizado"
  };

  leatherTypeNames: any = {
    fullGrain: "Cuero Grano Completo",
    topGrain: "Cuero de Flor Superior",
    genuine: "Cuero Genuino",
    suede: "Gamuza",
    exotic: "Cuero Exótico"
  };

  sizeNames: any = {
    xs: "Extra Small",
    s: "Small",
    m: "Medium",
    l: "Large",
    xl: "Extra Large",
    xxl: "Doble Extra Large"
  };

  calculateLeather() {
    const baseConsumption = this.productData[this.productType][this.size];
    const typeFactor = this.leatherFactors[this.leatherType];
    const adjustedConsumption = baseConsumption * typeFactor;
    const complexityFactor = 1 + (this.complexity * 0.1);
    const complexityAdjustedConsumption = adjustedConsumption * complexityFactor;
    const wasteFactor = 1.15;
    const finalConsumptionPerUnit = complexityAdjustedConsumption * wasteFactor;
    const totalLeather = finalConsumptionPerUnit * this.quantity;
    const wastePercentage = (this.complexity - 1) * 5 + 15;

    this.resultValue = totalLeather.toFixed(2) + " pies²";
    this.detailProduct = this.productNames[this.productType];
    this.detailSize = this.sizeNames[this.size];
    this.detailPerProduct = finalConsumptionPerUnit.toFixed(2) + " pies²";
    this.detailLeatherType = this.leatherTypeNames[this.leatherType];
    this.detailQuantity = this.quantity;
    this.detailWaste = wastePercentage + "%";
    this.leatherSuggestion = this.leatherSuggestions[this.productType];
  }

  ngOnInit() {
    this.calculateLeather();
  }
}
