---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Notifications & HUD

ScaleformUI provides wrappers for Grand Theft Auto V's notification system. Whether you need simple feed alerts, advanced dialogue popups with character images, help text, or 3D world text, everything is consolidated under the `Notifications` class.

## Feed Notifications

Feed notifications appear above the minimap on the left side of the screen.

### Simple Notifications

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
using ScaleformUI;

// Basic notification
ScaleformUINotification notification = Notifications.ShowNotification("This is a simple notification!");

// Colored notification (Uses NotificationColor enum)
Notifications.ShowNotification("Colored notification!", NotificationColor.Red, true, true);

// To hide/remove a specific notification early:
if (notification != null)
    notification.Hide();
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
-- Basic Notification
local message = "This is a simple notification!"
ScaleformUI.Notifications:ShowNotification(message)
```
</TabItem>
</Tabs>

### Advanced Notifications

Advanced notifications are the dialogue boxes you receive from characters in GTA Online (e.g., Lester, Martin). They include a title, subtitle, main text, and a character icon.

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
// The wrapper provides an enumeration of all default GTA V characters (NotificationChar)
string selectedChar = NotificationChar.Lester;

Notifications.ShowAdvancedNotification(
    "Lester Crest",         // Title
    "Heist Setup",          // Subtitle
    "Are you ready for the next job?", // Main Text
    selectedChar,           // Icon Dictionary
    selectedChar,           // Icon Name
    HudColor.NONE,          // Background Color
    SColor.AliceBlue,       // Flash Color
    true,                   // Blink minimap?
    NotificationType.Default, 
    true,                   // Show in Brief
    true                    // Sound
);
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
-- Note: Lua uses the same parameter mapping
-- Icons can be standard texture dictionaries, or custom DUIs!
```
</TabItem>
</Tabs>

## Help Notifications

Help notifications appear in the top-left corner (the black box with white text).

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
// Standard Help Notification (Duration in ms)
Notifications.ShowHelpNotification("Press ~INPUT_CONTEXT~ to interact.", 5000);

// Floating Help Notification (3D World Space)
// This requires a Vector3 position in the world to anchor the text.
Notifications.ShowFloatingHelpNotification("Press ~INPUT_CONTEXT~ to pick up item", new Vector3(100f, -100f, 30f), 5000);
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
ScaleformUI.Notifications:ShowHelpNotification("Press ~INPUT_CONTEXT~ to interact.", 5000)
```
</TabItem>
</Tabs>

## 3D Text & 2D Text

If you need to draw text manually per-frame (e.g., inside a Tick/Update loop), ScaleformUI offers straightforward 3D and 2D text wrappers.

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
// Draw 3D Text in the world
// Note: Must be called every tick
Notifications.DrawText3D(
    "Floating World Text", 
    new Vector3(100f, -100f, 30f), 
    SColor.White, 
    0.5f,        // Scale
    ScaleformFonts.CHALET_LONDON_NINETEENSIXTY, 
    true         // Drop shadow
);

// Draw 2D Text on the screen (X, Y percentage)
Notifications.DrawText(
    "Screen Text", 
    new PointF(0.5f, 0.5f), // Center of screen
    0.5f,        // Scale
    SColor.HUD_Green, 
    ScaleformFonts.PRICEDOWN_GTAV_INT, 
    Alignment.Center, 
    true,        // Drop shadow
    true         // Outline
);
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
-- Handled similarly in Lua
```
</TabItem>
</Tabs>

## Subtitles

Subtitles appear at the bottom center of the screen (typically used for dialogue or mission instructions).

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
// Show a subtitle (Duration in ms)
Screen.ShowSubtitle("Go to the yellow marker.", 3000);
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
ScaleformUI.Notifications:ShowSubtitle("Go to the yellow marker.")
```
</TabItem>
</Tabs>


