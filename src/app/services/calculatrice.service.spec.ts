import { TestBed } from '@angular/core/testing';

import { CalculatriceService } from './calculatrice.service';

describe('CalculatriceService', () => {
  let service: CalculatriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Lorsque je fais un calcul', () => {
    it('Le résultat doit être correct', () => {
      expect(service.calculate('1 + 1')).toBe(2);
    });
  });

  describe('Lorsque je veux ajouter un nombre', () => {
    it("Le nombre doit être ajouté à l'input", () => {
      expect(service.add('1+', '2')).toBe('1+2');
    });
  });

  describe("Lorsque je veux effacer l'input", () => {
    it("clear retourne une chaine vide", () => {
      expect(service.clear()).toBe('');
    });
  });

  describe('Lorsque j\'entre deux points successifs', () => {
    it('J\'obtiens une erreur', () => {
      expect(() => service.calculate('1..')).toThrowError('Nombre invalide');
    });
  })
});
