import axios from 'axios';
import { Application } from 'typedoc';
import { JsonObject, PackageJson } from 'type-fest';
import { PageEvent, RendererEvent } from 'typedoc/dist/lib/output/events';
import { resolve } from 'path';
import { writeJson, readJsonSync } from 'fs-extra';
import { Reflection, ReflectionGroup } from 'typedoc/dist/lib/models';

const sync = require('promise-synchronizer');

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
const getVersionMap = (event?: RendererEvent) => {
  try {
    sync(() =>
      axios.get(versionMapUrl).then((result) => {
        versionMap = result.data ?? {};
      }))();
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
    if (group.categories) {
      group.categories?.forEach(() => {

      });
    } else {
      group.children.forEach((reflect: Reflection) => {
        if ((reflect.parent as any)?.version) {
          (reflect as any).version = (reflect.parent as any)?.version;
          return;
        }
        versionMap[reflect.name] ??= pkg.version;
        (reflect as any).version = versionMap[reflect.name];
      });
    }
  });
};
