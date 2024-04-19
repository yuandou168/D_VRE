import {
    JupyterFrontEnd,
    JupyterFrontEndPlugin
  } from '@jupyterlab/application';
  import { MainAreaWidget } from '@jupyterlab/apputils';
  import { ILauncher } from '@jupyterlab/launcher';
  import { reactIcon } from '@jupyterlab/ui-components';
  import  {UserAssignWrapper} from '../components/assign-users';
  
  /**
   * The command IDs used by the react-widget plugin.
   */
  namespace CommandIDs {
    export const create = 'create-user-assignment-widget';
  }
  
  
  const userAssignExtension: JupyterFrontEndPlugin<void> = {
    id: 'user-assignment-widget',
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
        caption: 'Assign User to Smart Contract',
        label: 'Membership',
        icon: args => (args['isPalette'] ? undefined : reactIcon),
        execute: () => {
          const content = new UserAssignWrapper();
          const widget = new MainAreaWidget<UserAssignWrapper>({ content });
          widget.title.label = 'User Assign Form';
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
  
  
  export default userAssignExtension;