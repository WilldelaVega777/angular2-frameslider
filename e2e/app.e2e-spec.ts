import { FrameSliderPage } from './app.po';

describe('frame-slider App', function() {
  let page: FrameSliderPage;

  beforeEach(() => {
    page = new FrameSliderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
