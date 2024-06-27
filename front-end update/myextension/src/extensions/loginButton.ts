import {
    ILabShell,
    JupyterFrontEnd,
    JupyterFrontEndPlugin,
    
  } from '@jupyterlab/application';
  import {LoginExtension} from '../buttons/loginButton';
  // import { Title, Widget } from '@lumino/widgets';
  import { INotebookTracker } from "@jupyterlab/notebook";


  const Login: JupyterFrontEndPlugin<void> = {
    id: 'loginButton',
    autoStart: true,
    requires: [ILabShell],
  activate: (app: JupyterFrontEnd, notebooks: INotebookTracker) => {

    // const onTitleChanged = (title: Title<Widget>) => {
    //   console.log('the JupyterLab main application:', title);
    //   document.title = title.label;
    // };

    // // Keep the session object on the status item up-to-date.
    // labShell.currentChanged.connect((_, change) => {
    //   const { oldValue, newValue } = change;

    //   // Clean up after the old value if it exists,
    //   // listen for changes to the title of the activity
    //   if (oldValue) {
    //     oldValue.title.changed.disconnect(onTitleChanged);
    //   }
    //   if (newValue) {
    //     newValue.title.changed.connect(onTitleChanged);
    //   }
    // });

    let buttonExtension = new LoginExtension(app, notebooks);
    app.docRegistry.addWidgetExtension('Notebook', buttonExtension);
  }
      
  }

  export default Login;
  