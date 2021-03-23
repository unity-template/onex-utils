import { Application } from 'typedoc';
import { PageEvent } from 'typedoc/dist/lib/output/events';
import { ReflectionGroup } from 'typedoc/dist/lib/models';


export const load = (that: Application) => {
  that.listenTo(that.application.renderer, {
    [PageEvent.BEGIN]: changeAlias,
    [PageEvent.END]: deleteCategories,
  });
};

function changeAlias(page: PageEvent) {
  if (page.url === 'modules.html') {
    groupUtilsName(page);
  }
}

function groupUtilsName(page: PageEvent) {
  page.model.groups.forEach((reflectGroup: ReflectionGroup) => {
    const categoriesMap: any = {};
    reflectGroup.children.forEach((dec) => {
      const [cateName, funcName] = dec.getAlias().split('_');
      // title 保存
      categoriesMap[cateName] ??= {};
      categoriesMap[cateName].title = cateName;
      // child 保存
      categoriesMap[cateName].children ??= [];
      categoriesMap[cateName].children.push({
        cssClasses: dec.cssClasses,
        url: dec.url,
        name: funcName,
      });
    });

    for (const key of Object.keys(categoriesMap)) {
      (reflectGroup as any).isRenderModuleList = true;
      reflectGroup.categories ??= [];
      reflectGroup.categories.push(categoriesMap[key]);
    }
  });
}


function deleteCategories(page: PageEvent) {
  if (page.url === 'modules.html') {
    page.model.groups.forEach((reflectGroup: ReflectionGroup) => {
      reflectGroup.categories = undefined;
    })
  }
}

