import {
    JupyterFrontEnd,
    JupyterFrontEndPlugin
  } from '@jupyterlab/application';
  import { MainAreaWidget } from '@jupyterlab/apputils';
  import { ILauncher } from '@jupyterlab/launcher';
  import { reactIcon } from '@jupyterlab/ui-components';
  import { LoginWrapper } from '../Login';
  
  /**
   * The command IDs used by the react-widget plugin.
   */
  namespace CommandIDs {
    export const create = 'create-login-widget';
  }
  
  
  const loginExtension: JupyterFrontEndPlugin<void> = {
    id: 'login-widget',
    description: 'A JupyterLab extension for login using metamask using a React Widget.',
    autoStart: true,
    optional: [ILauncher],
    activate: (app: JupyterFrontEnd, launcher: ILauncher) => {
    
      const { commands, serviceManager } = app;

      const user = serviceManager.user;
      user.ready.then(() => {
        console.log("Identity:", user.identity);
        console.log("Permissions:", user.permissions);
      });
  
      const command = CommandIDs.create;
      
      commands.addCommand(command, {
        caption: 'Metamask Login',
        label: 'Auth via Metamask',
        icon: args => (args['isPalette'] ? undefined : reactIcon),
        execute: () => {
          const content = new LoginWrapper();
          const widget = new MainAreaWidget<LoginWrapper>({ content });
          widget.title.label = 'Login Form';
          widget.title.icon = reactIcon;
          app.shell.add(widget, 'main');
        }
      });
  
  
  
      if (launcher) {
        launcher.add({
          command
        });
      }
    }
  };
  
  
  export default loginExtension;