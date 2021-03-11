import { IComponentOptions } from './Component';

/**
 * Component definition.
 */
export interface IComponent {
  constructor: new (options: IComponentOptions) => unknown;
  selector: string;
}

/**
 * List of all known components.
 */
const components: IComponent[] = [];

/**
 * Register a new component.
 */
export function registerComponent(
  constructor: IComponent['constructor'],
  selector: string,
) {
  components.push({
    selector,
    constructor,
  });
}

/**
 * TypeDoc application class.
 */
export class Application {
  /**
     * Create a new Application instance.
     */
  constructor() {
    this.createComponents(document.body);
  }

  /**
     * Create all components beneath the given jQuery element.
     */
  createComponents(context: HTMLElement) {
    components.forEach((c) => {
      context.querySelectorAll<HTMLElement>(c.selector).forEach((el) => {
        if (!el.dataset.hasInstance) {
          // eslint-disable-next-line @iceworks/best-practices/recommend-polyfill
          // eslint-disable-next-line no-new
          new c.constructor({ el });
          el.dataset.hasInstance = String(true);
        }
      });
    });
  }
}
