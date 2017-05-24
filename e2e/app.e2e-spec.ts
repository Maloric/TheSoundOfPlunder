import { ThesoundofplunderPage } from './app.po';

describe('thesoundofplunder App', () => {
  let page: ThesoundofplunderPage;

  beforeEach(() => {
    page = new ThesoundofplunderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
