import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import * as stories from "./NumberInteraction.stories";

import styles from "./NumberInteraction.module.scss";

const story = composeStories(stories);

describe("<NumberInteraction /> test", async () => {
  it("renderable & has CSS-Module class", async () => {
    expect.hasAssertions();

    const screen = render(<story.Default />);
    const component = screen.container.firstChild as HTMLElement;

    expect(component).toBeInTheDocument();

    expect(component.classList.contains(styles.NumberInteraction));
  });

  it("drag down to increase the value", async () => {
    expect.hasAssertions();

    const screen = render(<story.DragDown />);
    const text = screen.getByTestId("text") as HTMLInputElement;

    expect(text.value).toBe("100");

    await story.DragDown.play?.({ canvasElement: screen.container });

    expect(text.value).toBe("110.9");
  });

  it("drag up to decrease the value", async () => {
    expect.hasAssertions();

    const screen = render(<story.DragUp />);
    const text = screen.getByTestId("text") as HTMLInputElement;

    expect(text.value).toBe("100");

    await story.DragUp.play?.({ canvasElement: screen.container });

    expect(text.value).toBe("89.1");
  });
});
