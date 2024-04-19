import { JupyterFrontEndPlugin } from '@jupyterlab/application';
// import shareButton from './extensions/shareButton';
import loginButton from './extensions/loginButton';
import loginExtension from './extensions/loginWidget';
import policyExtension from './extensions/policyWidget';
import userAssignExtension from './extensions/assignUser';
import groupListExtension from './extensions/groupList';


const extensions: JupyterFrontEndPlugin<any>[] = [
  loginButton,
  loginExtension,
  policyExtension,
  userAssignExtension,
  groupListExtension
];

export default extensions;