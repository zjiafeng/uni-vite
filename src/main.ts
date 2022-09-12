import { createSSRApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia'
import './style/index.scss'

export function createApp() {
  const app = createSSRApp(App)
  app.use(createPinia())
  return {
    app,
  };
}
