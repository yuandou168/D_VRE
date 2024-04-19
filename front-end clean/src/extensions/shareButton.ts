// import {
//     JupyterFrontEnd,
//     JupyterFrontEndPlugin
//   } from '@jupyterlab/application';
//   // import { MainAreaWidget } from '@jupyterlab/apputils';
//   // import { ILauncher } from '@jupyterlab/launcher';
//   // import { reactIcon } from '@jupyterlab/ui-components';
//   // import { SharingPolicyForm } from './policies';
//   // import {LoginWrapper} from './Login';
//   import {ButtonExtension} from '../buttons/shareButton';

  
  
  
//   /**
//    * The command IDs used by the react-widget plugin.
//    */
//   // namespace CommandIDs {
//   //   export const create = 'create-react-widget';
//   // }
  
//   /**
//    * Initialization data for the react-widget extension.
//    * 
//    * Check if the user is logged in or not 
//    */
//   const shareButton: JupyterFrontEndPlugin<void> = {
//     id: 'shareButton',
//     autoStart: true,
//     activate: (app: JupyterFrontEnd) => {
//       console.log('Jupyterlab extension Share Notebook is activated');
  
//       let buttonExtension = new ButtonExtension();
//       app.docRegistry.addWidgetExtension('Notebook', buttonExtension);
//     },
//   }


// //   const extension: JupyterFrontEndPlugin<void> = {
// //     id: 'react-widget',
// //     description: 'A minimal JupyterLab extension using a React Widget.',
// //     autoStart: true,
// //     optional: [ILauncher],
// //     activate: (app: JupyterFrontEnd, launcher: ILauncher) => {
// //       const { commands } = app;
  
// //       const command = CommandIDs.create;
  
  
// //       // commands.addCommand(command1, {
// //       //   caption: 'List the defined Policies',
// //       //   label: 'List Widget',
// //       //   icon: args => (args['isPalette'] ? undefined : reactIcon),
// //       //   execute: () => {
// //       //     const content = new LoginWrapper();
// //       //     const widget = new MainAreaWidget<LoginWrapper>({ content });
// //       //     widget.title.label = 'React Widget';
// //       //     widget.title.icon = reactIcon;
// //       //     app.shell.add(widget, 'main');
// //       //   }
// //       // });
  
// //       // commands.addCommand(command, {
// //       //   caption: 'Define custom policies',
// //       //   label: 'UI for defining policies',
// //       //   icon: args => (args['isPalette'] ? undefined : reactIcon),
// //       //   execute: () => {
// //       //     const content = new SharingPolicyForm();
// //       //     const widget = new MainAreaWidget<SharingPolicyForm>({ content });
// //       //     widget.title.label = 'Custom Policies';
// //       //     widget.title.icon = reactIcon;
// //       //     app.shell.add(widget, 'main');
// //       //   }
// //       // });
  
  
  
// //       if (launcher) {
// //         launcher.add({
// //           command
// //         });
// //       }
// //     }
// //   };
  
  
//   export default shareButton;