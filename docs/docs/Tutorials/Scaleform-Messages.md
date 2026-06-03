---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Scaleform Messages & Warnings

ScaleformUI allows you to call native Grand Theft Auto V full-screen and mid-screen messages (like "MISSION PASSED", "WASTED", or Error Warnings) seamlessly.

These are accessible via `ScaleformUI.Main` in C#, and `ScaleformUI.Scaleforms` in Lua.

## Big Messages (Shards)

Big Messages appear centrally on the screen with distinct backgrounds and animations. 
By default, the library handles the duration for you. If you set `manualDispose` to true, the message will stay on screen until you call `.Dispose()`.

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
using ScaleformUI;

// Mission Passed
ScaleformUI.Main.BigMessageInstance.ShowMissionPassedMessage("Mission Passed");

// Coloured Shard
ScaleformUI.Main.BigMessageInstance.ShowColoredShard("TITLE", "SUBTITLE", HudColor.HUD_COLOUR_WHITE, HudColor.HUD_COLOUR_FREEMODE);

// Simple Shard
ScaleformUI.Main.BigMessageInstance.ShowSimpleShard("Simple Shard", "Showing the simple shard");

// Wasted Message
ScaleformUI.Main.BigMessageInstance.ShowMpWastedMessage("WASTED", "You died.");

// Rank Up Message
ScaleformUI.Main.BigMessageInstance.ShowRankupMessage("Rank Up", "You unlocked new items", 10);

// Dispose manually (if you passed manualDispose: true)
ScaleformUI.Main.BigMessageInstance.Dispose();
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
-- Mission Passed (Title, Duration in ms, ManualDispose)
ScaleformUI.Scaleforms.BigMessageInstance:ShowMissionPassedMessage("Mission Passed", 5000, false)

-- Coloured Shard
ScaleformUI.Scaleforms.BigMessageInstance:ShowColoredShard("Coloured Shard", "Description", SColor.HUD_White, SColor.HUD_Freemode, 5000, false)

-- Simple Shard
ScaleformUI.Scaleforms.BigMessageInstance:ShowSimpleShard("Simple Shard", "Simple Shard Subtitle", 5000, false)

-- Wasted Message
ScaleformUI.Scaleforms.BigMessageInstance:ShowMpWastedMessage("WASTED", "Subtitle", 5000, false)

-- Rank Up Message
ScaleformUI.Scaleforms.BigMessageInstance:ShowRankupMessage("Rank Up", "Rank Up Subtitle", 10, 5000, false)

-- Dispose manually
ScaleformUI.Scaleforms.BigMessageInstance:Dispose()
```
</TabItem>
</Tabs>

### Transitions
You can specify the out-transition type before showing or disposing a message.
Available transitions are: `"TRANSITION_OUT"`, `"TRANSITION_UP"`, `"TRANSITION_DOWN"`.

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
ScaleformUI.Main.BigMessageInstance.Transition = "TRANSITION_UP";
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
ScaleformUI.Scaleforms.BigMessageInstance:SetTransition("TRANSITION_UP", 0.4, true)
```
</TabItem>
</Tabs>

## Mid-Size Messages

Mid-size messages operate exactly like Big Messages, but take up less screen space and use different Scaleform backgrounds.

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
ScaleformUI.Main.MedMessageInstance.ShowColoredShard("TITLE", "SUBTITLE", HudColor.HUD_COLOUR_FREEMODE);
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
ScaleformUI.Scaleforms.MedMessageInstance:ShowColoredShard("TITLE", "SUBTITLE", SColor.HUD_Freemode)
```
</TabItem>
</Tabs>

## Warning Screens

Warning screens simulate the error or alert screens commonly seen when transitioning to GTA Online. They halt the user's attention and can either timeout automatically or wait for button input.

### Simple Warning

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
// Show a warning
ScaleformUI.Main.Warning.ShowWarning(
    "ALERT", 
    "Connection lost", 
    "Please wait while we reconnect...", 
    "Error Code: 0x12345"
);

// You can update the warning while it's active
ScaleformUI.Main.Warning.UpdateWarning("ALERT", "Connection lost", "Reconnecting in 5...", "Error Code: 0x12345");

// Dispose when done
ScaleformUI.Main.Warning.Dispose();
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
ScaleformUI.Scaleforms.Warning:ShowWarning(
    "ALERT", 
    "Connection lost", 
    "Please wait while we reconnect...", 
    "Error Code: 0x12345"
)

ScaleformUI.Scaleforms.Warning:Dispose()
```
</TabItem>
</Tabs>

### Warning with Interactive Buttons

You can show a warning screen that waits for the user to press a specific key/pad button.

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
List<InstructionalButton> buttons = new List<InstructionalButton>()
{
    new InstructionalButton(Control.FrontendDown, "Accept only with Keyboard", PadCheck.Keyboard),
    new InstructionalButton(Control.FrontendY, "Cancel only with GamePad", PadCheck.Controller),
    new InstructionalButton(Control.FrontendX, Control.Detonate, "Changes button depending on input type")
};

ScaleformUI.Main.Warning.ShowWarningWithButtons(
    "ALERT", 
    "Do you want to proceed?", 
    "Press a button", 
    buttons, 
    "System Warning"
);

// Listen to the button press
ScaleformUI.Main.Warning.OnButtonPressed += (button) =>
{
    Debug.WriteLine($"You pressed a Button => {button.Text}");
    ScaleformUI.Main.Warning.Dispose();
};
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
-- Handled similarly in Lua via InstructionalButton.New() and Warning events.
```
</TabItem>
</Tabs>

## Instructional Buttons (Outside Menus)

ScaleformUI allows you to draw instructional buttons (the controls usually found in the bottom right corner) globally, even when a menu is not open!

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
// Add a button globally
ScaleformUI.Main.InstructionalButtons.AddInstructionalButton(new InstructionalButton(Control.Talk, "Voice Chat"));

// You can also add a saving/loading spinner
ScaleformUI.Main.InstructionalButtons.AddSavingText(LoadingSpinnerType.Clockwise1, "Saving data...", 3000);
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
-- Set multiple buttons globally
local buttons = {
    InstructionalButton.New(GetLabelText("HUD_INPUT3"), -1, 177, 177, -1),
    InstructionalButton.New("Scroll text", 0, 2, -1, -1),
    InstructionalButton.New("Scroll text", 1, -1, -1, "INPUTGROUP_CURSOR_SCROLL")
}

ScaleformUI.Scaleforms.InstructionalButtons:SetInstructionalButtons(buttons)
```
</TabItem>
</Tabs>


