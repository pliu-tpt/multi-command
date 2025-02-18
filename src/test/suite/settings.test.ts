import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Settings Tests', () => {
  test('Reads settings.json correctly', async () => {
    const config = vscode.workspace.getConfiguration();
    const commands = config.get<{ [title: string]: { [terminalTitle: string]: string } }>('multi-terminals.commands');

    assert.ok(commands, 'multi-terminals.commands setting not found');
    assert.ok(Object.keys(commands!).length > 0, 'Settings should not be empty');
  });
});
