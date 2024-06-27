// import { ToolbarButton } from "@jupyterlab/apputils";
// import { DocumentRegistry } from "@jupyterlab/docregistry";
// import { INotebookModel, NotebookPanel } from "@jupyterlab/notebook";
// import { IDisposable } from "@lumino/disposable";
// // import React from 'react';
// // import ReactDOM from 'react-dom';
// // import {LoginWrapper} from '../Login';
// // import {SharingPolicyForm} from '../policies';


// export class ButtonExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
//   private button: ToolbarButton;

//   constructor() {
//     // Initialize the button in the constructor
//     this.button = new ToolbarButton({
//       label: 'Share Notebook',
//       onClick: this.handleButtonClick
//     });
//   }

//   createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
//     // Add the toolbar button to the notebook toolbar
//     panel.toolbar.insertItem(10, 'shareNotebook', this.button);

//     // The ToolbarButton class implements `IDisposable`, so the
//     // button *is* the extension for the purposes of this method.
//     return this.button;
//   }

//   private handleButtonClick = () => {
//     const tokenValue = localStorage.getItem('login-with-metamask:auth');
//     if (tokenValue) {
//       const tokenObject = JSON.parse(tokenValue);
    
//       if (tokenObject.accessToken) {
//         const sharingPolicyFormWindow = window.open('', '_blank', 'width=1000,height=1000');
//         if (sharingPolicyFormWindow) {
//         sharingPolicyFormWindow.focus();
//         // ReactDOM.render(new SharingPolicyForm(), sharingPolicyFormWindow.document.body);
//         } else {
//         console.error('Unable to open the sharing policy form window.');
//       }
//       } else {
//         console.error('accessToken is missing in the token object');
//       }
//     } else {
//       // User is not logged in, open the login page
//       const loginWindow = window.open('', '_blank', 'width=400,height=400');
//       if (loginWindow) {
//         loginWindow.focus();
//         // ReactDOM.render(<Login />, loginWindow.document.body);
//       } else {
//         console.error('Unable to open the login window.');
//       }
//     }
//   };
// }
