import { addDecorator, configure } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withOptions } from '@storybook/addon-options';

import pack from '../package.json';

const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

addDecorator(
  withOptions({
    name: pack.name,
    addonPanelInRight: true
  })
);
addDecorator(
  withInfo({
    header: false,
    inline: true,
    source: true,
    styles: {
      infoStory: {
        border: '1px solid rgb(238, 238, 238)',
        padding: 30
      }
    }
  })
);
addDecorator(withKnobs);

configure(loadStories, module);
