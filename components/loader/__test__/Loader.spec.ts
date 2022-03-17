import { render, fireEvent } from '@testing-library/svelte';
import Loader from "../src/Loader.svelte";

describe("Loader test", () => {
  it("should render properly", () => {
    const result = render(Loader);
    expect(() => result).not.toThrow();
  });
});