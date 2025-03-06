import App from "./src/app"
import Chat from "./src/components/Chat"
import lemonade from 'lemonadejs';

import '@lemonadejs/router';

lemonade.setComponents({Chat: Chat})

lemonade.render(App, document.querySelector('#app'));
