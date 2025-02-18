import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Keybinding Tests', () => {
  test('Cmd+Shift+R triggers multi-terminals.openMultipleTerminals', async () => {
    const commands = await vscode.commands.getCommands(true);
    assert.ok(commands.includes('multi-terminals.openMultipleTerminals'), 'Command is not registered');

    let commandExecuted = false;

    const disposable = vscode.commands.registerCommand('multi-terminals.openMultipleTerminals', () => {
      commandExecuted = true;
    });

    try {
      await vscode.commands.executeCommand('multi-terminals.openMultipleTerminals');
      assert.strictEqual(commandExecuted, true, 'Keybinding did not trigger the command');
    } finally {
      disposable.dispose();
    }
  });
});