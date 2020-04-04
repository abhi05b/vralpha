import { VrAlphaPage } from './app.po';

describe('vr-alpha App', () => {
  let page: VrAlphaPage;

  beforeEach(() => {
    page = new VrAlphaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
