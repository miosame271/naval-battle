import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    service = new UtilsService();
  });

  it('returns the minimum when Math.random returns zero', () => {
    spyOn(Math, 'random').and.returnValue(0);
    expect(service.getRandomInteger(3, 8)).toBe(3);
  });

  it('returns the maximum when Math.random is just below one', () => {
    spyOn(Math, 'random').and.returnValue(0.999999);
    expect(service.getRandomInteger(3, 8)).toBe(8);
  });

  it('supports a range containing a single integer', () => {
    expect(service.getRandomInteger(5, 5)).toBe(5);
  });
});
