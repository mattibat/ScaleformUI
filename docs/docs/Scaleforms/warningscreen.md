---
layout: default
title: Warning Screen
parent: Scaleforms API
show_buttons: true
show_all_code: false
---

# Warning Screen

![image](https://user-images.githubusercontent.com/4005518/162582803-87963fe6-7ea2-4ef4-896a-65a579f755b3.png)

The Warning Screen is a customizable full screen overlay. It displays alerts, prompts, and error messages. It supports instructional buttons for user interaction and input handling.

## C# API Reference

### Accessor
```csharp
ScaleformUI.Main.Warning
```

### Properties
* **IsShowing** (`bool`): Returns `true` if the warning screen is currently active and rendering.
* **IsShowingWithButtons** (`bool`): Returns `true` if the warning screen is active and displaying instructional buttons.

### Events
* **OnButtonPressed**: Triggered when the user selects one of the instructional buttons.
  ```csharp
  public delegate void PopupWarningEvent(InstructionalButton button);
  public event PopupWarningEvent OnButtonPressed;
  ```

### Methods
* **ShowWarning**
  Displays a warning screen with the specified text and layout options.
  ```csharp
  public async void ShowWarning(
      string title, 
      string subtitle, 
      string prompt = "", 
      string errorMsg = "", 
      WarningPopupType type = WarningPopupType.Classic, 
      bool showBackground = true
  )
  ```
* **UpdateWarning**
  Updates the text or layout of the currently active warning screen.
  ```csharp
  public void UpdateWarning(
      string title, 
      string subtitle, 
      string prompt = "", 
      string errorMsg = "", 
      WarningPopupType type = WarningPopupType.Classic, 
      bool showBackground = true
  )
  ```
* **ShowWarningWithButtons**
  Displays a warning screen and binds a list of instructional buttons. Disables standard controls to await user input.
  ```csharp
  public async void ShowWarningWithButtons(
      string title, 
      string subtitle, 
      string prompt, 
      List<InstructionalButton> buttons, 
      string errorMsg = "", 
      WarningPopupType type = WarningPopupType.Classic, 
      bool showBackground = true
  )
  ```
* **Dispose**
  Closes the warning screen and cleans up the scaleform resources.
  ```csharp
  public void Dispose()
  ```

### Enums

#### WarningPopupType
Defines the visual style of the warning screen.
```csharp
public enum WarningPopupType
{
    Classic,
    Serious
}
```

---

## Lua API Reference

### Accessor
```lua
ScaleformUI.Scaleforms.Warning
```

### Methods
* **IsShowing**
  Returns `true` if the warning screen is currently active.
  ```lua
  ScaleformUI.Scaleforms.Warning:IsShowing()
  ```
* **IsShowingWithButtons**
  Returns `true` if the warning screen is active and displaying instructional buttons.
  ```lua
  ScaleformUI.Scaleforms.Warning:IsShowingWithButtons()
  ```
* **ShowWarning**
  Displays a warning screen.
  ```lua
  ScaleformUI.Scaleforms.Warning:ShowWarning(title, subtitle, prompt, errorMsg, warningType, showBackground)
  ```
* **UpdateWarning**
  Updates the text or layout of the active warning screen.
  ```lua
  ScaleformUI.Scaleforms.Warning:UpdateWarning(title, subtitle, prompt, errorMsg, warningType, showBackground)
  ```
* **ShowWarningWithButtons**
  Displays a warning screen with instructional buttons and disables standard controls.
  ```lua
  ScaleformUI.Scaleforms.Warning:ShowWarningWithButtons(title, subtitle, prompt, buttons, errorMsg, warningType, showBackground)
  ```
* **Dispose**
  Closes the warning screen.
  ```lua
  ScaleformUI.Scaleforms.Warning:Dispose()
  ```

### Callbacks
* **OnButtonPressed**
  Function called when the user presses one of the instructional buttons.
  ```lua
  ScaleformUI.Scaleforms.Warning.OnButtonPressed = function(button) end
  ```

---

## Runnable Examples

### C# Example

This example shows how to display a warning screen, update its prompt text over a countdown, and handle button selection.

```csharp
using System;
using System.Collections.Generic;
using CitizenFX.Core;
using ScaleformUI;
using ScaleformUI.Scaleforms;

public class WarningScreenTest : BaseScript
{
    public WarningScreenTest()
    {
        Tick += OnTick;
    }

    private async Task OnTick()
    {
        if (Game.IsControlJustPressed(0, Control.FrontendSocialClub))
        {
            // Example 1: Simple warning with a countdown
            ScaleformUI.Main.Warning.ShowWarning(
                "ALERT", 
                "The server will restart soon.", 
                "Please save your progress.", 
                "ERROR_CODE_01", 
                WarningPopupType.Classic, 
                true
            );

            await Delay(3000);

            ScaleformUI.Main.Warning.UpdateWarning(
                "ALERT", 
                "The server will restart soon.", 
                "Restarting in 3 seconds...", 
                "ERROR_CODE_01", 
                WarningPopupType.Classic, 
                true
            );

            await Delay(3000);
            ScaleformUI.Main.Warning.Dispose();

            // Example 2: Warning with interactive buttons
            List<InstructionalButton> buttons = new List<InstructionalButton>()
            {
                new InstructionalButton(Control.PhoneSelect, "Confirm Selection"),
                new InstructionalButton(Control.PhoneCancel, "Cancel Action")
            };

            ScaleformUI.Main.Warning.ShowWarningWithButtons(
                "CONFIRMATION REQUIRED", 
                "Do you want to delete this character?", 
                "This action cannot be undone.", 
                buttons, 
                "WARN_DELETE", 
                WarningPopupType.Serious, 
                true
            );

            ScaleformUI.Main.Warning.OnButtonPressed += (button) =>
            {
                Debug.WriteLine($"User selected: {button.Text}");
            };
        }
    }
}
```

### Lua Example

This example shows how to display a warning screen, update its prompt text, and handle button selection in Lua.

```lua
local function ShowInteractiveWarning()
    local confirmButton = InstructionalButton.New("Confirm", -1, 191, 191, -1)
    local cancelButton = InstructionalButton.New("Cancel", -1, 194, 194, -1)
    
    local buttons = { confirmButton, cancelButton }
    
    ScaleformUI.Scaleforms.Warning:ShowWarningWithButtons(
        "DANGER ZONE", 
        "You are entering a restricted area.", 
        "Press Confirm to proceed or Cancel to turn back.", 
        buttons, 
        "RESTRICTED_ACCESS", 
        1, -- Serious type
        true
    )
    
    ScaleformUI.Scaleforms.Warning.OnButtonPressed = function(button)
        if button.Text == "Confirm" then
            print("Player confirmed entry.")
        else
            print("Player cancelled entry.")
        end
    end
end

RegisterCommand("testwarning", function()
    ShowInteractiveWarning()
end, false)
```
