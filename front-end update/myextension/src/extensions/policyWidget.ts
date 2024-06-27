import {
    JupyterFrontEnd,
    JupyterFrontEndPlugin
  } from '@jupyterlab/application';
  import { MainAreaWidget } from '@jupyterlab/apputils';
  import { ILauncher } from '@jupyterlab/launcher';
  import { reactIcon } from '@jupyterlab/ui-components';
  import { SharingPolicyForm } from '../policies';
  /**
   * The command IDs used by the react-widget plugin.
   */
  namespace CommandIDs {
    export const create = 'create-policy-widget';
  }
  
  
  const policyExtension: JupyterFrontEndPlugin<void> = {
    id: 'policy-widget',
    description: 'A JupyterLab extension for making agreements using a React Widget.',
    autoStart: true,
    optional: [ILauncher],
    activate: (app: JupyterFrontEnd, launcher: ILauncher) => {
      const { commands } = app;
  
      const command = CommandIDs.create;
 
      commands.addCommand(command, {
        caption: 'Define custom policies',
        label: 'Make Agreements',
        icon: args => (args['isPalette'] ? undefined : reactIcon),
        execute: () => {
          const content = new SharingPolicyForm();
          const widget = new MainAreaWidget<SharingPolicyForm>({ content });
          widget.title.label = 'Custom Policies';
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
  
  
  export default policyExtension;