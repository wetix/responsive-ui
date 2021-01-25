import Tag from "./Tag.svelte";

type TagOptions = {
  target: Element;
  anchor?: Element;
  props?: Record<string, any>;
  hydrate?: boolean;
  intro?: boolean;
  $$inline?: boolean;
};

function tagComponent(opts: TagOptions) {
  const comp = new Tag(opts);
  comp.$on("close", () => {
    comp.$destroy();
  });
  return comp;
}

export default tagComponent;
