import {
    JupyterFrontEnd,
    JupyterFrontEndPlugin
  } from '@jupyterlab/application';
  import { MainAreaWidget } from '@jupyterlab/apputils';
  import { ILauncher } from '@jupyterlab/launcher';
  import { reactIcon } from '@jupyterlab/ui-components';
  import  {UserProvenanceManager} from '../components/provenance-manager';
  
  /**
   * The command IDs used by the react-widget plugin.
   */
  namespace CommandIDs {
    export const create = 'create-user-provenance-widget';
  }
  
  
  const userProvenanceExtension: JupyterFrontEndPlugin<void> = {
    id: 'user-provenance-widget',
    description: 'A JupyterLab extension for assigning user to a smart contract.',
    autoStart: true,
    optional: [ILauncher],
    activate: (app: JupyterFrontEnd, launcher: ILauncher) => {
    
      const { commands } = app;

    //   const user = serviceManager.user;
    //   user.ready.then(() => {
    //     console.log("Identity:", user.identity);
    //     console.log("Permissions:", user.permissions);
    //   });
  
      const command = CommandIDs.create;
      
      commands.addCommand(command, {
        caption: 'Manage Provenance with Blockchain',
        label: 'Provenance Manager',
        icon: args => (args['isPalette'] ? undefined : reactIcon),
        execute: () => {
          const content = new UserProvenanceManager();
          const widget = new MainAreaWidget<UserProvenanceManager>({ content });
          widget.title.label = 'Manage Provenance';
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
  
  
  export default userProvenanceExtension;