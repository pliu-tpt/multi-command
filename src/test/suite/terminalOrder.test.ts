import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Terminal Opening Order', () => {
  test('Terminals open in correct order', async () => {
    const testCommands = {
      "First Set": {
        "Terminal A": "echo A",
        "Terminal B": "echo B"
      }
    };

    const terminalTitles: string[] = [];
    const originalCreateTerminal = vscode.window.createTerminal;

    // Correctly mock createTerminal with proper signature
    (vscode.window.createTerminal as unknown) = (nameOrOptions?: string | vscode.TerminalOptions) => {
      let terminalName: string;

      if (typeof nameOrOptions === 'string') {
        terminalName = nameOrOptions;
      } else if (typeof nameOrOptions === 'object' && nameOrOptions.name) {
        terminalName = nameOrOptions.name;
      } else {
        terminalName = "Unnamed Terminal";
      }

      terminalTitles.push(terminalName);
      return {
        sendText: (text: string) => console.log(`Executing: ${text}`),
        show: () => {}
      } as vscode.Terminal;
    };

    await vscode.commands.executeCommand('multi-terminals.openMultipleTerminals');

    assert.deepStrictEqual(terminalTitles, [
      'First Set - Terminal A (1)',
      'First Set - Terminal B (2)'
    ], 'Terminals did not open in expected order');

    // Restore original createTerminal
    vscode.window.createTerminal = originalCreateTerminal;
  });
});
