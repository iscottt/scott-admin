import buttonProps from 'ant-design-vue/es/button/buttonTypes';
import type { ButtonType as SButtonType } from 'ant-design-vue/es/button/buttonTypes';
import type { ExtractPropTypes } from 'vue';

export type ButtonType = SButtonType | 'danger' | 'warning' | 'success';

export declare type ButtonProps = Partial<ExtractPropTypes<typeof buttonProps>>;

export { buttonProps };
