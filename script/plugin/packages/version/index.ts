import { Application } from 'typedoc';
import { JsonObject, PackageJson } from 'type-fest';
import { PageEvent, RendererEvent } from 'typedoc/dist/lib/output/events';
import { resolve } from 'path';
import { writeJson, readJsonSync } from 'fs-extra';
import { Reflection, ReflectionGroup } from 'typedoc/dist/lib/models';

const request = require('sync-request');


const pkg: PackageJson = readJsonSync(resolve(process.cwd(), './package.json'));
const fileName = 'version.map.json';
const versionMapUrl = `https://unity-template.github.io/onex-utils/${fileName}`;

let versionMap: JsonObject = {};

export const load = (that: Application) => {
  that.listenTo(that.application.renderer, {
    [RendererEvent.BEGIN]: getVersionMap,
    [RendererEvent.END]: saveVersionMap,
    [PageEvent.BEGIN]: updateVersionMap,
  });
};

/**
 * 获取官网中对应的json
 */
const getVersionMap = () => {
  try {
    const result = request('GET', versionMapUrl);
    versionMap = JSON.parse(result.body.toString());
  } catch (err) {
    console.log('获取远程versionMap报错： ', err);
  }
};

/**
 * 将生成的json进行保存
 */
const saveVersionMap = (event: RendererEvent) => {
  writeJson(resolve(event.outputDirectory, fileName), versionMap);
};

/**
 * 依据 versionMap 更新 version map 相关字段
 */
const updateVersionMap = (page: PageEvent) => {
  page?.model?.groups.forEach((group: ReflectionGroup) => {
    if (!group.categories) {
      group.children.forEach((reflect: Reflection) => {
        if ((reflect.parent as any)?.version) {
          const parentAlias = reflect.parent?.getAlias() ?? '';
          const currentAlias = reflect.getAlias();
          const key = `${parentAlias}_${currentAlias}`;
          versionMap[key] ??= pkg.version;
          (reflect as any).version = versionMap[key];
          return;
        }
        versionMap[reflect.name] ??= pkg.version;
        (reflect as any).version = versionMap[reflect.name];
      });
    }
  });
};
