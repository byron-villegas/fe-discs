/* tslint:disable:no-unused-variable */
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DiscService } from '@services/disc.service';

import { DiscViewComponent } from './disc-view.component';

describe('DiscViewComponent', () => {
  let component: DiscViewComponent;
  let fixture: ComponentFixture<DiscViewComponent>;
  const canvasContextMock = {
    font: '',
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 0,
    createImageData: () => ({ data: new Uint8ClampedArray(4) }),
    putImageData: () => undefined,
    clearRect: () => undefined,
    fillRect: () => undefined,
    beginPath: () => undefined,
    moveTo: () => undefined,
    lineTo: () => undefined,
    stroke: () => undefined,
    drawImage: () => undefined,
    fillText: () => undefined,
    measureText: () => ({ width: 0 })
  } as unknown as CanvasRenderingContext2D;

  beforeEach(async () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(canvasContextMock);

    TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, DiscViewComponent],
    providers: [
        Title,
        {
            provide: ActivatedRoute,
            useValue: {
                paramMap: of(convertToParamMap({ sku: 'TEST-123' }))
            }
        },
        {
            provide: DiscService,
            useValue: {
                findDiscBySkuFromList: () => undefined,
                findDiscBySku: () => of({
                    sku: 'TEST-123',
                    name: 'Disc',
                    description: '',
                    author: 'Author',
                    publisher: 'Publisher',
                    yearCreated: 2000,
                    country: 'CR',
                    images: [],
                    categories: ['VINYLS'],
                    trackList: [],
                    favorite: false,
                    type: 'VINYLS'
                })
            }
        }
    ]
})
    await TestBed.compileComponents();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
