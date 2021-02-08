import type { TooltipProps } from "../types/tooltip";
declare const tooltip: (node: Node, params?: Partial<TooltipProps>) => {
    destroy: () => void;
};
export { tooltip };
