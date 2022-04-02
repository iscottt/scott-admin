import { EnumLayoutComponentName } from '@/enum';
import { BasicLayout, BlankLayout } from '@/layouts';
import { views } from '@/views';

type LayoutComponent = Record<EnumType.LayoutComponentName, () => Promise<any>>;

/**
 * 获取页面导入的vue文件(懒加载的方式)
 * @param layoutType - 布局类型
 */
export function getLayoutComponent(layoutType: EnumType.LayoutComponentName) {
  const layoutComponent: LayoutComponent = {
    basic: BasicLayout,
    blank: BlankLayout,
  };
  return () => setViewComponentName(layoutComponent[layoutType], EnumLayoutComponentName[layoutType]);
}

/**
 * 获取页面导入的vue文件(懒加载的方式)
 * @param routeKey - 路由key
 */
export function getViewComponent(routeKey: AuthRoute.RouteKey) {
  return () => setViewComponentName(views[routeKey], routeKey) as Promise<any>;
}

/** 给页面组件设置名称 */
async function setViewComponentName(asyncComponent: () => Promise<any>, name: string) {
  const component = await asyncComponent();
  Object.assign(component.default, { name });
  return component;
}
