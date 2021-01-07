import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNotasComponent } from './lista-productos.component';

describe('ListaProductosComponent', () => {
  let component: ListaNotasComponent;
  let fixture: ComponentFixture<ListaNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaNotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
