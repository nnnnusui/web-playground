import type { Meta, StoryObj } from "@storybook/react";

import { Game } from ".";

const meta: Meta<typeof Game> = {
  component: Game,
};

export default meta;
type Story = StoryObj<typeof Game>;

export const Default: Story = {
};
