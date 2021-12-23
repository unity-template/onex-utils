import { dom } from '../../src/index';

const { pageLock, unLockPage } = dom;

const recyclerview = document.createElement('div');
recyclerview.setAttribute('id', 'recyclerview');

describe('test lock page', () => {
  afterAll(() => {
    document.body.innerHTML = '';
  });
  it('should lock page', () => {
    expect.assertions(2);
    pageLock();
    expect(document.body.style.height).toEqual('100%');
    expect(document.body.style.overflow).toEqual('hidden');
  });

  it('should lock page in recyclerview', () => {
    document.body.appendChild(recyclerview);
    expect.assertions(2);
    pageLock();
    expect(recyclerview.style.height).toEqual('100%');
    expect(recyclerview.style.overflow).toEqual('hidden');
  });
});


describe('test unlock page', () => {
  afterAll(() => {
    document.body.innerHTML = '';
  });
  it('should unlock page', () => {
    expect.assertions(2);
    pageLock();
    expect(document.body.style.height).toEqual('100%');
    unLockPage();
    expect(document.body.style.height).toEqual('auto');
  });


  it('should unlock page in recyclerview', () => {
    document.body.appendChild(recyclerview);
    expect.assertions(2);
    pageLock();
    expect(recyclerview.style.height).toEqual('100%');
    unLockPage();
    expect(recyclerview.style.height).toEqual('auto');
  });
});
