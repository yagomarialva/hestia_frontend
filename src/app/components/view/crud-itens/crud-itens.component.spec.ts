import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudItensComponent } from './crud-itens.component';

describe('CrudItensComponent', () => {
  let component: CrudItensComponent;
  let fixture: ComponentFixture<CrudItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudItensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
