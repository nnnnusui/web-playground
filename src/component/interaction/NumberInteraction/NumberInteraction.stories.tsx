import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { useState } from "react";

import { makeObserve } from "@/fn/state/makeObserve";

import { NumberInteraction } from ".";

const meta: Meta<typeof NumberInteraction> = {
  component: NumberInteraction,
  args: {
    label: "NumberInteraction",
    state: [100, () => 0],
  },
  decorators: [
    (Story, { args }) => {
      const [state, setState] = makeObserve(useState(0), args.state[0]);
      return (<Story args={{ ...args, state: [state, setState] }} />);
    },
  ],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

export const DragDown: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const container = canvas.getByTestId("container");
    const text = canvas.getByTestId("text") as HTMLInputElement;

    await userEvent.pointer([
      { keys: "[TouchA>]", target: container },
      { keys: "[TouchA>]", coords: { clientX: 10, clientY: 10 } },
      { pointerName: "TouchA", target: text, coords: { clientX: 10, clientY: 1100 } },
      { keys: "[/TouchA]" },
    ]);
  },
};

export const DragUp: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const container = canvas.getByTestId("container");
    const text = canvas.getByTestId("text") as HTMLInputElement;

    await userEvent.pointer([
      { keys: "[TouchA>]", target: container },
      { keys: "[TouchA>]", coords: { clientX: 10, clientY: 1100 } },
      { pointerName: "TouchA", target: text, coords: { clientX: 10, clientY: 10 } },
      { keys: "[/TouchA]" },
    ]);
  },
};
