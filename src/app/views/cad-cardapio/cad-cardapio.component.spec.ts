import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadCardapioComponent } from './cad-cardapio.component';

describe('CadCardapioComponent', () => {
  let component: CadCardapioComponent;
  let fixture: ComponentFixture<CadCardapioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadCardapioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadCardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
