import { render, fireEvent } from "@testing-library/svelte";
import Docker from "../src/Docker.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("Docker", () => {
  const props = {
    id: "docker-id",
    title: "docker title",
    class: "docker-custom",
    open: true,
    caption: "test caption",
    maskClosable: true,
    placement: "left",
    style: "color: white;"
  };

  it("should render correctly", () => {
    const result = render(Docker, { props });
    expect(() => result).not.toThrow();
  });

  it("should render slots correctly", () => {
    const { getByTestId } = render(SlotTest, {
      props: { component: Docker, props }
    });

    expect(() => getByTestId("slot")).not.toThrow();
  });

  it("should display correct props", () => {
    const { container } = render(Docker, { props });
    const docker = container.querySelector("aside") as HTMLElement;

    //test id
    expect(docker.getAttribute("id")).toBe(props.id);
    //test left placement
    expect(docker.classList).toContain("resp-docker--left");
    //test class
    expect(docker.classList).toContain(props.class);
    //test title
    expect(docker.getAttribute("title")).toBe(props.title);
    //test style
    expect(docker.getAttribute("style")).toContain(props.style);
    //test if open
    expect(docker.classList).not.toContain("resp-docker--close");
  });

  it("should close", async () => {
    const { container } = render(Docker, { props });
    let docker = container.querySelector("aside") as HTMLElement;
    //test if open
    expect(docker.classList).not.toContain("resp-docker--close");
    //click
    await fireEvent.click(container.querySelector(".resp-docker__overlay") as Element);
    //test if closed
    expect(docker.classList).toContain("resp-docker--close");
  });
});
