import uniq from 'lodash.uniq';

export enum LoadingStatus {
  /**
   * 已加载完成
   */
  loaded = 'loaded',
  /**
   * 正在加载中
   */
  loading = 'loading',
  /**
   * 加载报错
   */
  error = 'error',
}

export interface ProgressOptions {
  /**
   * 未去重需要加载数量
   */
  unUniqLen: number;
  /**
   * 去重之后总共需要加载数量
   */
  all: number;
  /**
   * 已经加载
   */
  loaded: number;
  /**
   * 正在加载
   */
  loading: number;
  /**
   * 加载进度
   */
  progress: number;
  /**
   * 当前状态
   */
  status: LoadingStatus;
}

export interface ImgLoadOptions {
  /**
   * 获取加载状态
   */
  progress?: (data: ProgressOptions) => any;
  /**
   * 针对链接进行处理
   */
  dealUrl?: (url: string) => string;
}

/**
 * web场景中预加载一组图片
 *
 * @example load list img
 * ```ts
 * import { data } from 'onex-utils';
 *
 * const imgList = ['https://....png', 'https://....png'];
 * data.imgLoad(imgList).then(() => {
 *  console.log(‘加载完成’)
 * })
 * .catch(() => {
 *   console.log('加载失败')
 * })
 * ```
 *
 * @returns 预加载成功或者失败，是个Promise值
 */
export const imgLoad = (list: string[], options?: ImgLoadOptions) => {
    const IImgList = uniq<string>(list);
    const { progress } = options || {};

    const all = IImgList.length;
    let loaded = 0;

    const reportProcess = (status: LoadingStatus) => {
        progress &&
      progress({
          unUniqLen: list.length,
          all,
          loaded,
          loading: all - loaded,
          progress: Number((loaded / all).toFixed(2)),
          status,
      });
    };

    const onImgLoaded = () => {
        loaded += 1;
        reportProcess(
            all === loaded ? LoadingStatus.loaded : LoadingStatus.loading,
        );
    };

    const onImgError = () => {
        reportProcess(LoadingStatus.error);
    };

    const loadingQueue = IImgList.map(
        (imgUrl): Promise<void> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'Anonymous';

                img.onload = () => {
                    onImgLoaded();
                    resolve();
                };

                img.onerror = () => {
                    onImgError();
                    reject();
                };
                img.src = imgUrl;
            });
        },
    );

    return Promise.all(loadingQueue);
};
