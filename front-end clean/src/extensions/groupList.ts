import {
    JupyterFrontEnd,
    JupyterFrontEndPlugin
  } from '@jupyterlab/application';
  import { MainAreaWidget } from '@jupyterlab/apputils';
  import { ILauncher } from '@jupyterlab/launcher';
  import { reactIcon } from '@jupyterlab/ui-components';
  import  {GroupListWrapper} from '../components/group-list';

  
  /**
   * The command IDs used by the react-widget plugin.
   */
  namespace CommandIDs {
    export const create = 'list-group-widget';
  }
  
  
  const groupListExtension: JupyterFrontEndPlugin<void> = {
    id: 'group-list-widget',
    description: 'List of groups you are a member of and corresponding asset',
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
        caption: 'Asset Manager',
        label: 'Asset Manager',
        icon: args => (args['isPalette'] ? undefined : reactIcon),
        execute: () => {
          const content = new GroupListWrapper();
          const widget = new MainAreaWidget<GroupListWrapper>({ content });
          widget.title.label = 'Asset Manager';
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
  
  
  export default groupListExtension;