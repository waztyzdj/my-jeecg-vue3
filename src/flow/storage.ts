import type { App } from 'vue';
import Storage from 'vue-lsp';

export function setupStorage(app: App<Element>) {
  app.use(Storage, {
    namespace: 'flow__', // key prefix
    name: 'ls', // name variable [ls] or [$ls],
    storage: 'local', // storage name session, local, memory
  });
}
