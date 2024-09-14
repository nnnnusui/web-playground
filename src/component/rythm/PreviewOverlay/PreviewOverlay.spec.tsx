import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import * as stories from "./PreviewOverlay.stories";

import styles from "./PreviewOverlay.module.scss";

const story = composeStories(stories);

describe("<PreviewOverlay /> test", async () => {
  it("renderable & has CSS-Module class", async () => {
    expect.hasAssertions();

    const screen = render(<story.Default />);
    const component = screen.container.firstChild as HTMLElement;

    expect(component).toBeInTheDocument();

    expect(component.classList.contains(styles.PreviewOverlay));
  });
});
