import { Application } from 'typedoc';
import { RendererEvent } from '_typedoc@0.19.2@typedoc/dist/lib/output/events';

export const load = (that: Application) => {
  console.log('加载插件....');
  that.listenTo(that.renderer, RendererEvent.BEGIN, changeName);
};

function changeName() {
  console.log('输出内容');
}
