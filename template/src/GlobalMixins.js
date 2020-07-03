import t from "node-time-ago";
import {mapMutations} from "vuex";
export default function GlobalMixins(Vue) {
  Vue.mixin({
    methods: {
      toCurrency(money) {
        return (
          "₦" +
          Number(money || 0)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
      },
      timeAgo(timestamp) {
        if (timestamp) {
          return t(timestamp * 1000);
        } else {
          return "unknown";
        }
      },
      ...mapMutations([
          'NEW_TIP',
          'SHOW_AVAILABLE_TIPS'
      ])
    },
    directives: {
      tooltip: {
        _that: this,
        inserted: function(el, binding, vnode) {
          let { arg } = binding;
          let { value } = binding;
          let { msg } = value;
          let { key } = value;
          let shown = localStorage.getItem(key) !== null;

          if (shown)
            //tip already shown
            return;

          el.classList.add("tooltip");
          let toolTip = document.createElement("div");
          toolTip.classList.add("tooltiptext", arg);
          toolTip.innerText = msg;
          el.appendChild(toolTip);
          toolTip.onclick = () => {
            el.removeChild(toolTip);
          }
          vnode.context.NEW_TIP({
            tip_key: key,
            elem: el,
            text: toolTip
          });
          // show next one when blurs
          el.addEventListener('blur',() => {
            vnode.context.SHOW_AVAILABLE_TIPS()
          })
        },
      },
    },
  });
}
