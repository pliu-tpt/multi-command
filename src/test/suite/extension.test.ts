import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Tests', () => {
  test('Extension activates successfully', async () => {
    const extension = vscode.extensions.getExtension('your-publisher.multi-command');
    assert.ok(extension, 'Extension not found');

    await extension?.activate();
    assert.ok(extension.isActive, 'Extension failed to activate');
  });

  test('Command is registered', async () => {
    const commands = await vscode.commands.getCommands(true);
    assert.ok(commands.includes('multi-command.openMultipleTerminals'), 'Command not registered');
  });
});