import { render } from '@testing-library/svelte';
import Badge from '../src/Badge.svelte';

describe('badge component', () => {
  let props = {
    class: "badge-custom",
    count: 100,
    max: 99
  };

  const result = render(Badge, { props });

  it("test props", () => {
    const badge = result.container.getElementsByClassName("resp-badge")[0];
    expect(() => badge).not.toThrow(); //test rendering
    expect(badge.classList).toContain("badge-custom"); //test class name
    expect(badge.getAttribute("data-count")).toEqual(props.max + "+"); //test data count
  });
});