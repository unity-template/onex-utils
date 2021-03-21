import { Application } from 'typedoc';
import { PageEvent } from 'typedoc/dist/lib/output/events';


export const load = (that: Application) => {
  that.listenTo(that.application.renderer, {
    [PageEvent.BEGIN]: changePageName,
  });
};

/**
 * 业务需要将页面的路径只保留两份，同时以文件夹的形式进行输出
 */
function changePageName(event: PageEvent) {
  if (event.filename.match(/(?=_)\S+(?<=_)/g)) {
    const name = event.filename.match(/(?=_)\S+(?<=_)/g);
    if (name?.length) {
      const filename = name[0].split('_').filter(i => !!i);
      filename.splice(0, 2);
      const newName = filename.join('/');
      event.filename = event.filename.replace(/(?=_)\S+(?<=_)/g, newName);
      event.url = event.url.replace(/(?=_)\S+(?<=_)/g, newName);
      console.log(event);
    }
  }
}
