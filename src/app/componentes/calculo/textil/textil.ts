import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fabric-calculator',
  imports:[CommonModule,FormsModule],
  templateUrl: './textil.html',
  styleUrls: ['./textil.css']
})
export class Textil implements OnInit {
  selectedGarment = 'tshirt';
  selectedSize = 'm';
  fabricWidth = 150;
  quantity = 1;

  totalFabric = 0;
  adjustedConsumption = 0;
  garmentName = '-';
  sizeName = '-';
  fabricSuggestion = 'Selecciona un tipo de prenda para obtener recomendaciones de tela.';

  garmentOptions = [
    { value: 'tshirt', label: 'Camiseta' },
    { value: 'shirt', label: 'Camisa' },
    { value: 'pants', label: 'Pantalón' },
    { value: 'jacket', label: 'Chaqueta' },
    { value: 'dress', label: 'Vestido' },
    { value: 'skirt', label: 'Falda' }
  ];

  sizeOptions = [
    { value: 'xs', label: 'XS' },
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
    { value: 'l', label: 'L' },
    { value: 'xl', label: 'XL' },
    { value: 'xxl', label: 'XXL' }
  ];

  garmentData: any = {
    tshirt: { base: 1.2, xs: 0.9, s: 1.0, m: 1.2, l: 1.4, xl: 1.6, xxl: 1.8 },
    shirt: { base: 1.8, xs: 1.5, s: 1.6, m: 1.8, l: 2.0, xl: 2.2, xxl: 2.4 },
    pants: { base: 1.5, xs: 1.3, s: 1.4, m: 1.5, l: 1.6, xl: 1.7, xxl: 1.9 },
    jacket: { base: 2.0, xs: 1.7, s: 1.8, m: 2.0, l: 2.2, xl: 2.4, xxl: 2.6 },
    dress: { base: 2.5, xs: 2.0, s: 2.2, m: 2.5, l: 2.8, xl: 3.1, xxl: 3.4 },
    skirt: { base: 1.0, xs: 0.8, s: 0.9, m: 1.0, l: 1.1, xl: 1.2, xxl: 1.3 }
  };

  fabricSuggestions: any = {
    tshirt: "Algodón jersey o pique de 160-180 g/m². Para mejores resultados, considera añadir un 10% extra para encogimiento.",
    shirt: "Popelina de algodón, oxford o lino. Para camisas formales, considera algodón de hilo egipcio o de sea island.",
    pants: "Sarga de algodón (denim para jeans), gabardina o drill. Para pantalones formales, considera lana o mezclas con poliéster.",
    jacket: "Mezclilla para chaquetas informales, tweed o lana para abrigos. Forros de satén o viscosa para interior.",
    dress: "Tejidos de punto para vestidos casuales, seda o satén para vestidos de noche, algodón para vestidos de verano.",
    skirt: "Tejidos con caída como crepé, jersey o seda para faldas fluidas; denim o gabardina para faldas estructuradas."
  };

  garmentNames: any = {
    tshirt: "Camiseta",
    shirt: "Camisa",
    pants: "Pantalón",
    jacket: "Chaqueta",
    dress: "Vestido",
    skirt: "Falda"
  };

  sizeNames: any = {
    xs: "Extra Small",
    s: "Small",
    m: "Medium",
    l: "Large",
    xl: "Extra Large",
    xxl: "Doble Extra Large"
  };

  constructor() { }

  ngOnInit(): void {
    this.calculateFabric();
  }

  calculateFabric(): void {
    // Validaciones
    if (this.fabricWidth < 90 || this.fabricWidth > 200) {
      alert("Por favor, introduce un ancho de tela válido (entre 90 y 200 cm).");
      return;
    }

    if (this.quantity < 1 || this.quantity > 1000) {
      alert("Por favor, introduce una cantidad válida (entre 1 y 1000).");
      return;
    }

    const baseConsumption = this.garmentData[this.selectedGarment][this.selectedSize];
    const widthFactor = 150 / this.fabricWidth;
    this.adjustedConsumption = baseConsumption * widthFactor;
    this.totalFabric = this.adjustedConsumption * this.quantity;

    this.garmentName = this.garmentNames[this.selectedGarment];
    this.sizeName = this.sizeNames[this.selectedSize];
    this.fabricSuggestion = this.fabricSuggestions[this.selectedGarment];
  }
}
