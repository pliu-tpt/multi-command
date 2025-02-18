
## Features

Minimalist extension to open a set of terminals all at once, following lexicographical order of keys. User can create and edit those sets in settings.json.

Use ctrl+shift+r or cmd+shift+r to open the list of sets.

## Requirements

"vscode": "^1.68.1"

## Extension Settings

This extension contributes the following settings:

* `multi-command.commands`: a list of groups of Terminal to Open

Here's an example of a set of commands in `settings.json` :
```json
{
    "multi-command.commands": {
        "My first set of terminals": {
            "Terminal 1": "ls path_to/first_folder",
            "Terminal 2": "ls path_to/second_folder"
        },
        "My second set of terminals": {
            "Terminal 1": "ls path_to/first_folder",
            "Terminal 2": "ls path_to/second_folder"
        }
    }
}
```
## Known Issues

No known issues at the moment.

## Release Notes
### 1.0.0

Initial release of the extension.

---