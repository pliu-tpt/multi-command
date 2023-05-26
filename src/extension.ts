// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

type CommandsConfig = { [title: string]: { [terminalTitle: string]: string } };

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// let disposable = vscode.commands.registerCommand('extension.openSettingsJson', () => {
    //     const config = vscode.workspace.getConfiguration();
    //     const settingsPath = config.inspect<string>('settings')?.globalValue || config.inspect<string>('settings')?.defaultValue;

    //     if (settingsPath) {
    //         vscode.workspace.openTextDocument(settingsPath).then((document) => {
    //             vscode.window.showTextDocument(document);
    //         });
    //     }
    // });

    // context.subscriptions.push(disposable);

	context.subscriptions.push(
		vscode.commands.registerCommand('multi-command.openMultipleTerminals', async () => {
		  const config = vscode.workspace.getConfiguration();
		  const commands = config.get<CommandsConfig>('multi-command.commands') || {};
		  const titles = Object.keys(commands);
	
		  const selectedTitle = await vscode.window.showQuickPick(titles, {
			placeHolder: 'Select a title to open corresponding multiple terminals',
		  });
	
		  if (selectedTitle) {
			const terminalCommands = commands[selectedTitle];
			Object.keys(terminalCommands).forEach((terminalTitle, index) => {
			  const command = terminalCommands[terminalTitle];
			  const terminal = vscode.window.createTerminal(`${selectedTitle} - ${terminalTitle} (${index + 1})`);
			  terminal.sendText(command);
			  terminal.show();
			});
		  }
		})
	  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
