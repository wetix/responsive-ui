import { render } from '@testing-library/svelte';
import Poster from "../src/Poster.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("Poster test", () => {
  const props = {
    id: "id",
    class: "poster-custom",
    src: "./poster.jpg",
    alt: "Poster"
  };

  it("should render properly", () => {
    const result = render(Poster, { props });
    expect(() => result).not.toThrow();
  });

  it("should render with slots", () => {
    const result = render(SlotTest, { props: { Poster: Poster, props } });
    expect(() => result).not.toThrow();
  });

  it("should have correct props", () => {
    const { container } = render(Poster, { props });
    const poster = container.getElementsByClassName("resp-poster")[0] as HTMLElement;

    expect(poster.id).toEqual(props.id);
    //test class
    let customClass = props.class.split(" ");
    for (let c of customClass) {
      expect(poster.classList).toContain(c);
    }

    expect(poster.style.backgroundImage).toEqual(`url(${props.src})`);
  });
});