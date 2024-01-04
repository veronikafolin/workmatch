import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import './assets/main.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import InputText from "primevue/inputtext";
import AutoComplete from 'primevue/autocomplete';
import Password from "primevue/password";
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown';
import SelectButton from 'primevue/selectbutton';
import Message from 'primevue/message';
import Menubar from 'primevue/menubar';
import Card from 'primevue/card';
import TabMenu from 'primevue/tabmenu';
import DataView from 'primevue/dataview';
import MultiSelect from "primevue/multiselect";
import Textarea from "primevue/textarea";
import Dialog from "primevue/dialog";
import DialogService from 'primevue/dialogservice'
import Toast from "primevue/toast";
import ToastService from 'primevue/toastservice';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import ProgressSpinner from 'primevue/progressspinner';
import FileUpload from 'primevue/fileupload';
import Avatar from 'primevue/avatar';

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);


app.component('InputText', InputText);
app.component('AutoComplete', AutoComplete);
app.component('Password', Password);
app.component('Button', Button);
app.component('Dropdown', Dropdown);
app.component('SelectButton', SelectButton);
app.component('Message', Message);
app.component('Menubar', Menubar);
app.component('Card', Card);
app.component('TabMenu', TabMenu);
app.component('DataView', DataView);
app.component('MultiSelect', MultiSelect);
app.component('TextArea', Textarea);
app.component('Dialog', Dialog);
app.component('Toast', Toast);
app.component('ConfirmDialog', ConfirmDialog);
app.component('ProgressSpinner', ProgressSpinner);
app.component('FileUpload', FileUpload);
app.component('Avatar', Avatar);

app.mount('#app');
