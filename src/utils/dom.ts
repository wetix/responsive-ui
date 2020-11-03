export const getAttrFromEvent = (e: Event, attr: string): string | null => {
  const { currentTarget } = e;
  let { target }: any = e;
  while (target != currentTarget) {
    if (target && target.hasAttribute(attr)) return target.getAttribute(attr);
    target = target.parentNode;
  }
  return target.getAttribute(attr);
};

export const execIfContains = (node: HTMLElement | null, cb: () => {}) => (
  e: Event
) => {
  let target = e.target as any;
  while (target != null) {
    if (target === node) return;
    target = target.parentNode;
  }
  cb();
};
