import { render } from '@testing-library/svelte';
import BottomBar from '../src/BottomBar.svelte';

describe('BottomBar', () => {
  const result = render(BottomBar, {class: "bottom-bar-custom"});
  it('bottombar test', () => {
    const bottombar = result.container.getElementsByClassName("resp-bottom-bar")[0];
    expect(() => bottombar).not.toThrow();
    expect(bottombar.classList).toContain("bottom-bar-custom");
  });
});