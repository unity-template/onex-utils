import { Application, NavigationItem } from 'typedoc';
import { PageEvent } from 'typedoc/dist/lib/output/events';

export const load = (that: Application) => {
  that.listenTo(that.application.renderer, {
    [PageEvent.BEGIN]: changeAlias,
  });
};

function changeAlias(page: PageEvent) {
  changeGroups(page);
  changeLayout(page);
}

function changeGroups(page: PageEvent) {
  // TODO：后续需要进行分组
  page?.model?.groups?.forEach((element: any) => {
    if (element.categories) {
      element.categories.children.forEach((cate: any) => {
        cate.name = cate.name.replace('src/utils/', '');
      });
      return;
    }
    element.children.forEach((ele: any) => {
      ele.name = ele.name.replace('src/utils/', '');
    });
  });
}

function changeLayout(page: PageEvent) {
  if (page.navigation) {
    changeNavigationItem(page.navigation);
  }
}

function changeNavigationItem(item: NavigationItem) {
  // TODO: 需要将页面的URL进行替换
  item?.children?.forEach((element) => {
    element.title = element.title.replace('src/utils/', '');
    if (element.isInPath && element.children) {
      element.children.forEach((e) => {
        changeNavigationItem(e);
      });
    }
  });
}
