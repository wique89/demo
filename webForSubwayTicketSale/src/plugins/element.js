import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";

import {
  Button,
  ButtonGroup,
  Form,
  FormItem,
  Input,
  InputNumber,
  Checkbox,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Select,
  Row,
  Col,
  Tabs,
  Alert,
  Autocomplete,
  MessageBox,
  Message,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Option,
  Divider,
  Table,
  TableColumn,
  Pagination,
  Loading,
  Notification,
  Radio,
  RadioButton,
  RadioGroup,
  Switch,
  Steps,
  Step,
  Upload,
  Progress,
  Collapse,
  CollapseItem,
  Dialog,
  Badge,
  Card,
  Tag,
  Tooltip,
  Popover,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Breadcrumb,
  BreadcrumbItem,
  DatePicker,
  TimePicker,
  TabPane
} from "element-ui";

Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Checkbox);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Select);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Alert);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(DatePicker);
Vue.use(Divider);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Radio);
Vue.use(RadioButton);
Vue.use(RadioGroup);
Vue.use(Loading.directive);
Vue.use(Switch);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Dialog);
Vue.use(Badge);
Vue.use(Tag);
Vue.use(Tooltip);
Vue.use(Card);
Vue.use(Popover);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Autocomplete);
Vue.use(TimePicker);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;


