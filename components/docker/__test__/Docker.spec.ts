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
    const docker = container.getElementsByTagName("aside")[0] as HTMLElement;

    //test id
    expect(docker.getAttribute("id")).toBe(props.id);
    //test left placement
    expect(docker.classList).toContain("resp-docker--left");
    //test class
    const classes = props.class.split(" ");
    for (let c of classes) {
      expect(docker.classList).toContain(c);
    }
    //test title
    expect(docker.getAttribute("title")).toBe(props.title);
    //test style
    expect(docker.getAttribute("style")).toContain(props.style);
    //test if open
    expect(docker.classList).not.toContain("resp-docker--close");
  });

  it("should close", async () => {
    const { container } = render(Docker, { props });
    let docker = container.getElementsByTagName("aside")[0] as HTMLElement;
    //test if open
    expect(docker.classList).not.toContain("resp-docker--close");
    //click
    await fireEvent.click(container.getElementsByClassName("resp-docker__overlay")[0] as Element);
    //test if closed
    expect(docker.classList).toContain("resp-docker--close");
  });
});
