import type { Preview } from "@storybook/react";

import '../src/assets/css/theme.css';
import '../src/assets/css/sidooh-theme.css';
import '../src/assets/css/user.css';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};

export default preview;
