import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirNotaComponent } from './anadir-producto.component';

describe('AnadirProductoComponent', () => {
  let component: AnadirNotaComponent;
  let fixture: ComponentFixture<AnadirNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnadirNotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnadirNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
