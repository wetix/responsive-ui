import { render } from '@testing-library/svelte';
import BottomBar from '../src/BottomBar.svelte';

describe('bottombar test', () => {
  const result = render(BottomBar, {class: "bottom-bar-custom"});
  it('bottombar test', () => {
    const bottombar = result.container.getElementsByClassName("responsive-ui-bottom-bar")[0];
    expect(() => bottombar).not.toThrow();
    expect(bottombar.classList).toContain("bottom-bar-custom");
  });
});