---
layout: default
title: Instructional Buttons
parent: Scaleforms API
show_buttons: true
show_all_code: false
---

# Instructional Buttons

![image](https://user-images.githubusercontent.com/4005518/162583983-be7a6a7d-c976-4258-9aea-c5e03d15c514.png)

Instructional Buttons guide players by displaying control prompts at the bottom of the screen. They automatically adapt to the active input method, showing keyboard keys or controller buttons depending on what the player is using.

---

## C# API Reference

### Accessor
```csharp
ScaleformUI.Main.InstructionalButtons
```

### InstructionalButton Class

#### Constructors
* **Single Control Constructor**
  ```csharp
  public InstructionalButton(Control control, string text, PadCheck padFilter = PadCheck.Any)
  ```
* **Multiple Controls Constructor**
  ```csharp
  public InstructionalButton(List<Control> controls, string text, PadCheck padFilter = PadCheck.Any)
  ```
* **Split Gamepad/Keyboard Constructor**
  ```csharp
  public InstructionalButton(Control gamepadControl, Control keyboardControl, string text)
  ```
* **Split Gamepad/Keyboard Lists Constructor**
  ```csharp
  public InstructionalButton(List<Control> gamepadControls, List<Control> keyboardControls, string text)
  ```
* **InputGroup Constructor**
  ```csharp
  public InstructionalButton(InputGroup control, string text, PadCheck padFilter = PadCheck.Any)
  ```

#### Properties
* **Text** (`string`): The label text displayed next to the button icon.
* **GamepadButton** (`Control`): The control used when a gamepad is active.
* **KeyboardButton** (`Control`): The control used when a keyboard is active.
* **InputButton** (`InputGroup`): The input group used to automatically handle button prompts.
* **GamepadButtons** (`List<Control>`): A list of controls shown when a gamepad is active.
* **KeyboardButtons** (`List<Control>`): A list of controls shown when a keyboard is active.
* **PadCheck** (`PadCheck`): Filters whether the button is shown for keyboard, controller, or both.
* **IsUsingController** (`bool`): Returns `true` if the player is currently using a controller.
* **ItemBind** (`UIMenuItem`): The menu item this button is bound to.

#### Events
* **OnControlSelected**: Triggered when the control associated with this button is pressed.
  ```csharp
  public event OnInstructionControlSelected OnControlSelected;
  ```

#### Methods
* **BindToItem**
  Binds the button to a specific menu item so it only displays when that item is selected.
  ```csharp
  public void BindToItem(UIMenuItem item)
  ```
* **GetButtonId**
  Returns the internal string identifier for the button icon.
  ```csharp
  public string GetButtonId()
  ```

---

### InstructionalButtonsScaleform Class

#### Properties
* **UseMouseButtons** (`bool`): Enables or disables mouse cursor interaction for the buttons.
* **IsSaving** (`bool`): Returns `true` if a saving spinner is currently active.
* **ControlButtons** (`List<InstructionalButton>`): The list of active instructional buttons.

#### Methods
* **SetInstructionalButtons**
  Sets the entire list of buttons at once.
  ```csharp
  public void SetInstructionalButtons(List<InstructionalButton> buttons)
  ```
* **AddInstructionalButton**
  Adds a single button to the list.
  ```csharp
  public void AddInstructionalButton(InstructionalButton button)
  ```
* **RemoveInstructionalButton**
  Removes a button by reference or index.
  ```csharp
  public void RemoveInstructionalButton(InstructionalButton button)
  public void RemoveInstructionalButton(int index)
  ```
* **RemoveInstructionalButtons**
  Removes a list of buttons.
  ```csharp
  public void RemoveInstructionalButtons(List<InstructionalButton> buttons)
  ```
* **ClearButtonList**
  Clears all buttons from the screen.
  ```csharp
  public void ClearButtonList()
  ```
* **AddSavingText**
  Displays a saving spinner with text.
  ```csharp
  public void AddSavingText(LoadingSpinnerType spinnerType, string text)
  public async void AddSavingText(LoadingSpinnerType spinnerType, string text, int time)
  ```
* **HideSavingText**
  Hides the active saving spinner.
  ```csharp
  public void HideSavingText()
  ```
* **ForceUpdate**
  Forces the scaleform to redraw the buttons on the next frame.
  ```csharp
  public void ForceUpdate()
  ```

---

## Lua API Reference

### Accessor
```lua
ScaleformUI.Scaleforms.InstructionalButtons
```

### InstructionalButton Class

#### Constructor
```lua
InstructionalButton.New(text, padcheck, gamepadControls, keyboardControls, inputGroup)
```
* `text` (`string`): The label text.
* `padcheck` (`number`): Filter option. Use `-1` for both, `0` for gamepad, or `1` for keyboard and mouse.
* `gamepadControls` (`number` or `table`): Control ID or list of control IDs for gamepad.
* `keyboardControls` (`number` or `table`): Control ID or list of control IDs for keyboard.
* `inputGroup` (`string` or `number`): Input group name or ID.

#### Properties
* **Text** (`string`)
* **GamepadButton** (`number`)
* **KeyboardButton** (`number`)
* **GamepadButtons** (`table`)
* **KeyboardButtons** (`table`)
* **PadCheck** (`number`)
* **InputGroupButton** (`string` or `number`)

#### Callbacks
* **OnControlSelected**
  Function called when the button control is pressed.
  ```lua
  button.OnControlSelected = function(button) end
  ```

---

### ButtonsHandler Class

#### Properties
* **UseMouseButtons** (`boolean`)
* **IsSaving** (`boolean`)
* **ControlButtons** (`table`)

#### Methods
* **SetInstructionalButtons**
  ```lua
  ScaleformUI.Scaleforms.InstructionalButtons:SetInstructionalButtons(buttons)
  ```
* **AddInstructionalButton**
  ```lua
  ScaleformUI.Scaleforms.InstructionalButtons:AddInstructionalButton(button)
  ```
* **RemoveInstructionalButton**
  ```lua
  ScaleformUI.Scaleforms.InstructionalButtons:RemoveInstructionalButton(button)
  ```
* **ClearButtonList**
  ```lua
  ScaleformUI.Scaleforms.InstructionalButtons:ClearButtonList()
  ```
* **Refresh**
  ```lua
  ScaleformUI.Scaleforms.InstructionalButtons:Refresh()
  ```
* **ShowBusySpinner**
  ```lua
  ScaleformUI.Scaleforms.InstructionalButtons:ShowBusySpinner(spinnerType, text, time, manualDispose)
  ```
* **HideBusySpinner**
  ```lua
  ScaleformUI.Scaleforms.InstructionalButtons:HideBusySpinner()
  ```

---

## Runnable Examples

### C# Example

This example demonstrates the lifecycle of instructional buttons. It creates buttons, registers click events, updates them dynamically, and cleans them up.

```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CitizenFX.Core;
using ScaleformUI;
using ScaleformUI.Scaleforms;

public class InstructionalButtonsDemo : BaseScript
{
    private List<InstructionalButton> myButtons;
    private bool isDemoActive = false;

    public InstructionalButtonsDemo()
    {
        Tick += OnTick;
        
        // Initialize buttons
        myButtons = new List<InstructionalButton>()
        {
            new InstructionalButton(Control.PhoneSelect, "Select Option"),
            new InstructionalButton(Control.PhoneCancel, "Go Back"),
            new InstructionalButton(Control.VehicleHandbrake, "Perform Drift", PadCheck.Keyboard)
        };

        // Register events
        myButtons[0].OnControlSelected += (btn) => {
            Debug.WriteLine("Select Option pressed.");
        };

        myButtons[1].OnControlSelected += (btn) => {
            Debug.WriteLine("Go Back pressed. Cleaning up buttons.");
            StopDemo();
        };
    }

    private void StartDemo()
    {
        isDemoActive = true;
        ScaleformUI.Main.InstructionalButtons.SetInstructionalButtons(myButtons);
    }

    private void StopDemo()
    {
        isDemoActive = false;
        ScaleformUI.Main.InstructionalButtons.ClearButtonList();
    }

    private async Task OnTick()
    {
        if (Game.IsControlJustPressed(0, Control.FrontendSocialClub))
        {
            if (!isDemoActive)
            {
                StartDemo();
            }
        }

        if (isDemoActive)
        {
            // The library handles drawing and input checks automatically in its internal update loop.
            // You only need to keep the list populated.
            await Task.FromResult(0);
        }
    }
}
```

### Lua Example

This example shows how to manage instructional buttons and handle their press events in Lua.

```lua
local demoActive = false
local myButtons = {}

local function StartDemo()
    demoActive = true
    
    local selectBtn = InstructionalButton.New("Select Option", -1, 191, 191, -1)
    local backBtn = InstructionalButton.New("Go Back", -1, 194, 194, -1)
    
    selectBtn.OnControlSelected = function(btn)
        print("Select Option pressed.")
    end
    
    backBtn.OnControlSelected = function(btn)
        print("Go Back pressed. Stopping demo.")
        demoActive = false
        ScaleformUI.Scaleforms.InstructionalButtons:ClearButtonList()
    end
    
    myButtons = { selectBtn, backBtn }
    ScaleformUI.Scaleforms.InstructionalButtons:SetInstructionalButtons(myButtons)
end

RegisterCommand("testbuttons", function()
    if not demoActive then
        StartDemo()
    end
end, false)
```
