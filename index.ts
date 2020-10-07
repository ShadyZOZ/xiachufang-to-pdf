import * as puppeteer from 'puppeteer';

const RECIPE_LIST = [
  '102756142', '104045646', '105637445', '104455301', '104231806',
  '104368184', '105907462', '104140360', '104335100', '105813666',
  '101803955', '104663429', '104357848', '105864135', '105864046',
  '104108811', '104210368', '104229671', '104681991', '104834759',
  '104566831', '101475', '103691026', '104574338', '103769877',
  '105938941',
];

const PARALLEL_TASK_COUNT = 5;

(async () => {
  const browser = await puppeteer.launch();

  const tasks = [];
  for (let i = 0; i < PARALLEL_TASK_COUNT; i++) {
    tasks.push(i);
  }

  await Promise.all(tasks.map(async () => {
    while (RECIPE_LIST.length) {
      const recipeId = RECIPE_LIST.pop();
      if (!recipeId) {
        return;
      }
      const page = await browser.newPage();
      await page.goto(`http://www.xiachufang.com/recipe/${recipeId}/printable/`);
      await page.addStyleTag({ content: '.print_logo{display: none}' });
      await page.pdf({ path: `recipes/${recipeId}.pdf`, format: 'A4' });
    }
  }));

  await browser.close();
})();
