import DefaultTheme from "vitepress/theme";
import GameEnginePlayground from "./components/GameEnginePlayground.vue";
import QuickStart from "./components/QuickStart.vue";

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('GameEnginePlayground', GameEnginePlayground),
        app.component('QuickStart', QuickStart);
    }
}