import "@testing-library/jest-dom/vitest";
import { setProjectAnnotations } from "@storybook/react";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

import * as globalStorybookConfig from "./.storybook/preview";

setProjectAnnotations(globalStorybookConfig);
afterEach(() => cleanup());
