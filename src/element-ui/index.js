import {
  Button,
  Popover,
  Image,
  Row,
  Radio,
  Dialog,
  Checkbox,
  Option,
  Select,
  Switch,
  MessageBox,
  Message,
  Tabs,
  TabPane,
  Form,
  FormItem,
  input,
  Upload,
  CheckboxButton,
  Pagination,
  Empty,
  Tag
} from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Tag)
    Vue.use(Button)
    Vue.use(Pagination)
    Vue.use(Empty)
    Vue.use(CheckboxButton)
    Vue.use(Switch)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Tabs)
    Vue.use(TabPane)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(input)
    Vue.use(Upload)
    Vue.use(Dialog)
    Vue.use(Checkbox)
    Vue.use(Popover)
    Vue.use(Radio)
    Vue.use(Row)
    Vue.use(Image)
    // 往vue实例原型里添加消息提示，方便全局调用
    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$message = Message
    //使用：this.$message('这是一条消息提示');
  },
}
export default element
