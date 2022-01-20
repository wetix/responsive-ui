import Menu from "./Menu.svelte";

export default Menu;

export const menu = (node: Node, opts = {}) => {
  (node as HTMLElement).style.position = "relative";

  let open = false;
  const component = new Menu({
    target: node as HTMLElement,
    intro: true,
    props: {
      options: [{ label: "A" }, { label: "B" }],
      style: `position: absolute; top: 110%; right: -10%; z-index: 100`
    }
  });
  const handleClick = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    open = !open;
    component.$set({ open });
  };

  node.addEventListener("click", handleClick);

  return {
    destroy() {
      node.removeEventListener("click", handleClick);
    }
  };
};
