import {
    JupyterFrontEnd,
    JupyterFrontEndPlugin
  } from '@jupyterlab/application';
  import { MainAreaWidget } from '@jupyterlab/apputils';
  import { ILauncher } from '@jupyterlab/launcher';
  import { reactIcon } from '@jupyterlab/ui-components';
  import  {UserWorkflowManager} from '../components/workflow-manager';
  
  /**
   * The command IDs used by the react-widget plugin.
   */
  namespace CommandIDs {
    export const create = 'create-user-workflow-widget';
  }
  
  
  const userWorkflowExtension: JupyterFrontEndPlugin<void> = {
    id: 'user-workflow-widget',
    description: 'A JupyterLab extension for managing collaborative workflows with smart contract.',
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
        caption: 'Manage Collaborative Workflows with Smart Contract',
        label: 'Workflow Manager',
        icon: args => (args['isPalette'] ? undefined : reactIcon),
        execute: () => {
          const content = new UserWorkflowManager();
          const widget = new MainAreaWidget<UserWorkflowManager>({ content });
          widget.title.label = 'Manage Collaborative Workflows';
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
  
  
  export default userWorkflowExtension;