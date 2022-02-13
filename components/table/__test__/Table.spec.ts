import { render } from "@testing-library/svelte";
import Table from "../src/Table.svelte";

describe("Table", () => {
  const props = {
    id: "card",
    rowKey: "id",
    columns: [{ key: "id" }, { key: "status" }],
    items: [{ id: 1 }, { id: 2 }]
  };

  const { getByRole, container } = render(Table, { props });

  test("shows proper heading when rendered", () => {
    const component = getByRole("table");
    expect(() => component).not.toThrow();

    const ths = container.querySelectorAll("thead th");
    expect(ths).toHaveLength(props.columns.length);

    const tds = container.querySelectorAll("tbody td");
    expect(tds).toHaveLength(props.columns.length * props.items.length);
  });
});
