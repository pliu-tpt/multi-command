import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Command Registration', () => {
  test('Command is registered', async () => {
    const commands = await vscode.commands.getCommands(true);
    assert.ok(commands.includes('multi-command.openMultipleTerminals'), 'Command is not registered');
  });
});