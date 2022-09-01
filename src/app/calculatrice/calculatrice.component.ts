import { CalculatriceService } from './../services/calculatrice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculatrice',
  templateUrl: './calculatrice.component.html',
  styleUrls: ['./calculatrice.component.scss'],
})
export class CalculatriceComponent implements OnInit {
  input: string  = '';
  numbers: string[] = this.calculatriceService.numbers;
  operators: string[] = this.calculatriceService.operators;

  constructor(private calculatriceService: CalculatriceService) {}

  ngOnInit(): void {
  }

  public calculate(): void {
    this.input = this.calculatriceService.calculate(this.input);
  }

  public clear(): void {
    this.input = this.calculatriceService.clear();
  }

  public add(input: string): void {
    this.input = this.calculatriceService.add(this.input, input);
  }
}
