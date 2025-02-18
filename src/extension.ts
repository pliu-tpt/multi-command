// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

type CommandsConfig = { [title: string]: { [terminalTitle: string]: string } };

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "multi-terminals.openMultipleTerminals",
      async () => {
        const config = vscode.workspace.getConfiguration();
        const commands =
          config.get<CommandsConfig>("multi-terminals.commands") || {};
        const titles = Object.keys(commands);

        const selectedTitle = await vscode.window.showQuickPick(titles, {
          placeHolder:
            "Select a title to open corresponding multiple terminals",
        });

        if (selectedTitle) {
          const terminalCommands = commands[selectedTitle];
          Object.keys(terminalCommands).sort().forEach((terminalTitle, index) => {
            const command = terminalCommands[terminalTitle];
            const terminal = vscode.window.createTerminal(
              `${index + 1} - ${terminalTitle}`,
            );
            terminal.sendText(command);
            terminal.show();
          });
        }
      },
    ),
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
