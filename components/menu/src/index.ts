import Menu from './Menu.svelte';

export default Menu;

export const menu = (node: Node, opts = {}) => {
  (node as HTMLElement).style.position = "relative";

  let openMenu = false;
  const handleClick = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log(e);
    openMenu = !openMenu;

    const component = new Menu({
      target: node as HTMLElement,
      intro: true,
      props: {
        options: [{ label: "A"}, { label: "B" }],
        style: `position: absolute; top: 100%; z-index: 100`
      }
    })
    console.log(openMenu, e);
  };

  node.addEventListener("click", handleClick);

  return {
    destroy() {
      node.removeEventListener("click", handleClick);
    }
  };
};