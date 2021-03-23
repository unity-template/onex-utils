import axios from 'axios';
import { Application } from 'typedoc';
import { JsonObject } from 'type-fest';
import { PageEvent, RendererEvent } from 'typedoc/dist/lib/output/events';
import { relative } from 'path';
import { writeJson } from 'fs-extra';

const sync = require('promise-synchronizer');

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
const getVersionMap = async (event?: RendererEvent) => {
  try {
    sync(() =>
      axios.get(versionMapUrl).then((result) => {
        versionMap = result.data ?? {};
      })
    )();
  }
};

/**
 * 将生成的json进行保存
 */
const saveVersionMap = (event: RendererEvent) => {
  writeJson(relative(event.outputDirectory, fileName), versionMap);
};

/**
 * 依据 versionMap 更新 version map 相关字段
 */
const updateVersionMap = (page: PageEvent) => {
};
