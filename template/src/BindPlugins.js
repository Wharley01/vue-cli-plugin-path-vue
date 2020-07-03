import Modally from "vue-modally";
import VueCurrencyInput from "vue-currency-input";
import VueToast from "vue-toast-notification";
import Graph from "./graph";
export default function BindPlugins(Vue, Vuex){
    Vue.prototype.$graph = Graph;

    Vue.use(Modally, { width: 900, padding: 0, type: 'panel', blur: false });
    Vue.use(VueCurrencyInput, {
        globalOptions: {
            currency: { prefix: '₦' }
        }
    });
    Vue.use(VueToast,{
        duration: 5000,
        position:'bottom'
    });
    Vue.use(Vuex);
}
