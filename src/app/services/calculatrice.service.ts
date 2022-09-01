import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatriceService {


  numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
  operators: string[] = ['+', '-', '*', '/'];

  constructor() { }

    /**
   * Permet de calculer le résultat
   * @returns résultat du calcul
   */
     public calculate(input: string): string {
      this.checkIntegrity(input);
      const result = eval(input);
      return result;
    }

    /**
     * Efface la chaine de caractère
     */
    public clear(): string {
      return '';
    }

    /**
     * Permet d'ajouter un caractère à l'input
     * @param input Chaine de caractère à ajouter
     */
    public add(input: string, add: string): string {
      input += add;
      return input;
    }

    private checkIntegrity(input: string): void {
      this.chekDotNumber(input);
    }

    private chekDotNumber(input: string): void {
      if (input.includes('..')) {
        throw new Error('Nombre invalide');
      } else {
        return;
      }
    }
}
