import { ToolbarButton } from "@jupyterlab/apputils";
import { DocumentRegistry } from "@jupyterlab/docregistry";
import { INotebookModel, NotebookPanel, INotebookTracker } from "@jupyterlab/notebook";
import { IDisposable } from "@lumino/disposable";
import {LoginWrapper} from '../Login';
import {SharingPolicyForm} from '../policies';
import { JupyterFrontEnd } from "@jupyterlab/application";



export class LoginExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
  private button: ToolbarButton;

  constructor(private app: JupyterFrontEnd, notebooks: INotebookTracker) {
    // Initialize the button in the constructor

    notebooks.currentChanged.connect((d) => { console.log(d,'changed'); });
    this.button = new ToolbarButton({
      label: 'Share Notebook',
      onClick: () => {
        this.handleButtonClick();
        return undefined;
      }
    });
  }


  createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
    // Add the toolbar button to the notebook toolbar
    panel.toolbar.insertItem(10, 'Login', this.button);

    // The ToolbarButton class implements `IDisposable`, so the
    // button *is* the extension for the purposes of this method.
    return this.button;
  }


  private handleButtonClick = () => {
    const tokenValue = localStorage.getItem('login-with-metamask:auth');
    if (tokenValue) {
      const tokenObject = JSON.parse(tokenValue);
      // console.log(value)
      if (tokenObject.accessToken) {
        // const sharingPolicyForm = <SharingPolicyComponent />;
        const formwidget = new SharingPolicyForm();
        formwidget.title.label = 'Sharing Policy Form';
        formwidget.id = "policy_form";
        this.app.shell.add(formwidget, "main");
      } else {
        console.error('accessToken is missing in the token object');
      }
    } else {
      // User is not logged in, open the login page
      const loginwidget = new LoginWrapper();
      loginwidget.title.label = 'Login Form';
      loginwidget.id = "login_form"
      this.app.shell.add(loginwidget, "main");
    }
  };
}
