import { render, screen, fireEvent } from '@testing-library/svelte';
import BottomBar from '../src/BottomBar.svelte';

describe('BottomBar test', () => {
  const props = {
    title: "test title",
    class: "bottom-bar-custom"
  };

  it('render test', () => {
    const {container} = render(BottomBar, { props });
    const bottombar = container.querySelector("." + props.class) as HTMLElement;
    expect(() => bottombar).not.toThrow();
  });

  it("props test", () => {
    const {container} = render(BottomBar, { props });
    const bottombar = container.querySelector("." + props.class) as HTMLElement;

    expect(bottombar.getAttribute("title")).toEqual(props.title);
  });
});