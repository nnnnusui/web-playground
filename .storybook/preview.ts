import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
import "@/index.scss";
import "./index.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      autoplay: true,
      theme: themes.dark,
    },
  },
};
export default preview;
