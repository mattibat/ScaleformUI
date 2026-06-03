---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to Create and Handle Radio Menus

This tutorial explains how to create and handle Radio Menus. A Radio Menu perfectly replicates the standard Grand Theft Auto V radio wheel, which can be configured with custom stations, descriptions, and branding.

## Creating the Menu

To create a Radio Menu, instantiate a `UIRadioMenu`. You can control the entry/exit animation logic such as the duration of the animation and the direction it pans toward.

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
using ScaleformUI.Radio;

// Create a new Radio Menu
UIRadioMenu menu = new UIRadioMenu();

// Configure the animation settings
menu.AnimationDuration = 1f;
menu.AnimDirection = AnimationDirection.ZoomOut;
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
-- Create a new Radio Menu
local menu = UIRadioMenu.New()

-- Configure the animation settings
menu:AnimationDuration(1.0)
menu:AnimDirection(-1)
```
</TabItem>
</Tabs>

## Adding Stations

A `RadioItem` represents a distinct station in your Radio Menu. A station provides parameters to specify its name, artist/secondary text, track/tertiary text, and a texture dictionary / icon reference to display in the middle of the wheel when highlighted.

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
// Load an icon via DUI (Optional)
long imgdui = API.CreateDui("https://giphy.com/embed/10bTCLE8GtHHS8", 96, 64);
API.CreateRuntimeTextureFromDuiHandle(txd, "item2", API.GetDuiHandle(imgdui));

for (int i = 0; i < 25; i++)
{
    // Create the station
    RadioItem station = new RadioItem(
        "Station " + (i + 1), // Station Name
        "Artist " + (i + 1),  // Artist Name
        "Track " + (i + 1),   // Track Name
        "scaleformui",        // Texture Dictionary
        "item2"               // Texture Name
    );

    // Add the station to the menu
    menu.AddStation(station);
}
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
local txd = CreateRuntimeTxd("scaleformui")

-- Load an icon via DUI (Optional)
local imgdui = CreateDui("https://giphy.com/embed/10bTCLE8GtHHS8", 96, 64)
CreateRuntimeTextureFromDuiHandle(txd, "item2", GetDuiHandle(imgdui))

for i = 1, 25, 1 do
    -- Create the station
    local item = RadioItem.New(
        "Station " .. i, 
        "Artist " .. i, 
        "Track " .. i, 
        "scaleformui", 
        "item2"
    )

    -- Add the station to the menu
    menu:AddStation(item)
end
```
</TabItem>
</Tabs>

## Handling Events

A Radio Menu fires events when it is opened/closed, when the user highlights a different station on the wheel, and when the user confirms their selection.

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
menu.OnMenuOpen += (_menu, _) =>
{
    Screen.ShowSubtitle("Radio Menu opened!");
};

menu.OnMenuClose += (_menu) =>
{
    Screen.ShowSubtitle("Radio Menu closed!");
};

menu.OnIndexChange += (index) =>
{
    Screen.ShowSubtitle($"Index {index} highlighted!");
};

menu.OnStationSelect += (station, index) =>
{
    Screen.ShowSubtitle($"Selected station with index {index}!");
};
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
menu.OnMenuOpen = function(menu, _)
    ScaleformUI.Notifications:ShowSubtitle("Radio Menu opened!")
end

menu.OnMenuClose = function(menu)
    ScaleformUI.Notifications:ShowSubtitle("Radio Menu closed!")
end

menu.OnIndexChange = function(index)
    ScaleformUI.Notifications:ShowSubtitle("Index " .. index .. " highlighted!")
end

menu.OnStationSelect = function(station, index)
    ScaleformUI.Notifications:ShowSubtitle("Selected station with index " .. index .. "!")
end
```
</TabItem>
</Tabs>

## Showing the Menu

Once all your stations are added, make the menu visible.

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
menu.Visible = true;
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
menu:Visible(true)
```
</TabItem>
</Tabs>


