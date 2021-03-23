import { Application, NavigationItem, ReflectionKind } from 'typedoc';
import { PageEvent } from 'typedoc/dist/lib/output/events';
import { func } from 'onex-utils';


export const load = (that: Application) => {
  that.listenTo(that.application.renderer, {
    [PageEvent.BEGIN]: changeAlias,
  });
};

function changeAlias(page: PageEvent) {
  changeGroups(page);
  changeLayout(page);
}

/**
 * 针对 Global 页面处理
 */
function changeGroups(page: PageEvent) {
  page?.model?.groups?.forEach((element: any) => {
    if (element.categories) {
      element?.categories?.children?.forEach((cate: any) => {
        cate.name = cate.name.replace('src/utils/', '');
      });
      return;
    }
    element.children.forEach((ele: any) => {
      ele.name = ele.name.replace('src/utils/', '');
    });
  });
}

/**
 * layout 结构修改
 */
function changeLayout(page: PageEvent) {
  if (page.navigation) {
    changeNavigationItem(page.navigation);
  }
}

function changeNavigationItem(item: NavigationItem) {
  item?.children?.forEach((element) => {
    element.title = element.title.replace('src/utils/', '');
    if (element.isInPath && element.children) {
      element.children.forEach((e) => {
        changeNavigationItem(e);
      });
    }
  });
}
