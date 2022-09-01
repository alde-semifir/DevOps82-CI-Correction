import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {jest} from '@jest/globals';
import { CalculatriceComponent } from './calculatrice.component';

describe('CalculatriceComponent', () => {
  let component: CalculatriceComponent;
  let fixture: ComponentFixture<CalculatriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculatriceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Lorsque le  composant est créé', () => {
    it("L'input doit être vide", () => {
      expect(component.input).toBe('');
    });

    it('Les numéros doivent être corrects', () => {
      expect(component.numbers).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
        '.',
      ]);
    });

    it('Les opérateurs doivent être corrects', () => {
      expect(component.operators).toEqual(['+', '-', '*', '/']);
    });

    it('Le rendu de la calculette est généré', () => {
      expect(fixture.nativeElement.querySelector('.calculator')).toBeTruthy();
    });

    it('Le boutton 1 est généré et contient 1 pour valeur', () => {
      expect(fixture.nativeElement.querySelector('#button1').textContent).toBe(' 1 ');
    })
  });

  describe('lorsque je presse un boutton', () =>{
    it('Un bouton numérique ou d\'opérateur appelle la méthode add()', fakeAsync(() => {
      jest.spyOn(component, 'add');
      fixture.nativeElement.querySelector('#button1').click();
      tick();
      expect(component.add).toHaveBeenCalled();
    }))
    it('le boutton C appelle la méthode clear()', fakeAsync(() => {
      jest.spyOn(component, 'clear');
      fixture.nativeElement.querySelector('#c').click();
      tick();
      expect(component.clear).toHaveBeenCalled();
    }));
    it('le boutton = appelle la méthode calculate()', fakeAsync(() => {
      jest.spyOn(component, 'calculate');
      fixture.nativeElement.querySelector('#equal').click();
      tick();
      expect(component.calculate).toHaveBeenCalled();
    }));
  })

  describe("J'effectue un calcul", () => {
    it('Je met deux points, alors il y a une erreur', () => {
      component.add('1..1+1');
      expect(() => {
        component.calculate();
      }).toThrowError('Nombre invalide');
    });
    it('Je met un point, alors le point est bien présent lors cu calcul', () => {
      component.add('1.1+1');
      component.calculate();
      expect(component.input).toBe(2.1);
    });

    it('Je met deux + successifs, alors il y a une erreur', () => {
      component.add('1++1');
      expect(() => {
        component.calculate();
      }).toThrow;
    });

    it('Je met deux - successifs, alors il y a une erreur', () => {
      component.add('1--1');
      expect(() => {
        component.calculate();
      }).toThrow;
    });

    it('Je met deux * successifs, alors il y a une erreur', () => {
      component.add('1**1');
      expect(() => {
        component.calculate();
      }).toThrow;
    });

    it('Je met deux / successifs, alors il y a une erreur', () => {
      component.add('1//1');
      expect(() => {
        component.calculate();
      }).toThrow;
    });

    it("Je ne met qu'un seul +, alors un seul + est ajouté)", () => {
      component.add('+');
      expect(component.input).toBe('+');
    });
  });
  describe('Quand je fais une addition', () => {
    it("J'obtiens le résultat de l'addition", () => {
      component.add('1+1');
      component.calculate();
      expect(component.input).toBe(2);
    });
  });
  describe('Quand je presse une touche', () => {
    it("J'ajoute le chiffre à la chaine de caractères", () => {
      component.add('2');
      expect(component.input).toBe('2');
    });
    it("J'ajoute l'opérateur à la chaine de caractère", () => {
      component.add('+');
      expect(component.input).toBe('+');
    });
  });

  describe('Quand je presse le bouton =', () => {
    it('Je calcule le résultat', () => {
      component.add('2+2');
      component.calculate();
      expect(component.input).toBe(4);
    });
  });

  describe('Quand je presse le bouton clear', () => {
    it('Je clear la chaine de caractères', () => {
      component.add('2+2');
      component.clear();
      expect(component.input).toBe('');
    });
  });

  describe('Quand je divise par 0', () => {
    it('Il y a une rerreur', () => {
      component.add('2/0');
      component.calculate()
      expect(component.input).toBe(Infinity);
    });
  });

  describe('Quand le nombre commence par 0', () => {
    it('Il y a une erreur', () => {
      component.add('01+1');
      expect(() => {
        component.calculate();
      }).toThrow;
    });
  });
});
