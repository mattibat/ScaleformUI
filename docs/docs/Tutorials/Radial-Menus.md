---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to Create and Handle Radial Menus

This tutorial explains how to create and manage GTA Online style Radial Menus. A Radial Menu is comprised of 8 separate segments, each of which can contain multiple items.

## Creating the Menu

To create a new Radial Menu, instantiate a new `RadialMenu` object.

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
using ScaleformUI.Radial;

// Create a new Radial Menu
RadialMenu menu = new RadialMenu();
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
-- Create a new Radial Menu
local radialMenu = RadialMenu.New()
```
</TabItem>
</Tabs>

## Creating Segment Items

Items added to a Radial Menu are `SegmentItem`s. Each `SegmentItem` can define a label, description, right/left textures (including GIF overlays via DUI), dimensions, and a specific highlight color.

You can also assign quantities to these items, which will be displayed in the UI (e.g., ammo or consumable limits).

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
using CitizenFX.Core;
using CitizenFX.Core.Native;

// Load a custom runtime texture via DUI for the icon
long imgdui = API.CreateDui("https://giphy.com/embed/ckT59CvStmUsU", 64, 64);
API.CreateRuntimeTextureFromDuiHandle(txd, "item1", API.GetDuiHandle(imgdui));

// Create Segment Items
SegmentItem item = new SegmentItem(
    "This is the label!", 
    "~BLIP_INFO_ICON~ This is the description.. it's multiline so it can be very long!", 
    "scaleformui", 
    "item1", 
    64, 64, 
    SColor.HUD_Freemode
);

SegmentItem item2 = new SegmentItem(
    "Label 3", 
    "A short description.", 
    "scaleformui", 
    "item2", 
    64, 64, 
    SColor.HUD_Red
);

// Set quantities
item.SetQuantity(8000, 9999);
item2.SetQuantity(5000, 0);
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
-- Load a custom runtime texture via DUI for the icon
local txd = CreateRuntimeTxd("scaleformui")
local imgdui = CreateDui("https://giphy.com/embed/ckT59CvStmUsU", 64, 64)
CreateRuntimeTextureFromDuiHandle(txd, "item1", GetDuiHandle(imgdui))

-- Create Segment Items
local item1 = SegmentItem.New(
    "This is the label!", 
    "~BLIP_INFO_ICON~ This is the description.. it's multiline so it can be very long!", 
    "scaleformui", 
    "item1", 
    64, 64, 
    SColor.HUD_Freemode
)

local item2 = SegmentItem.New(
    "Label 3", 
    "A short description", 
    "scaleformui", 
    "item2", 
    64, 64, 
    SColor.HUD_Red
)

-- Set quantities
item1:SetQuantity(8000, 9999)
item2:SetQuantity(5000)
```
</TabItem>
</Tabs>

## Adding Items to Segments

A Radial Menu has exactly 8 segments (indexed 0 through 7 in C#, and 1 through 8 in Lua). You can add items to specific segments of the menu. When multiple items are added to a segment, the user can cycle through them using the right/left inputs.

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
// Loop through all 8 segments and add items
for (int i = 0; i < 8; i++)
{
    menu.Segments[i].AddItem(item);
    menu.Segments[i].AddItem(item2);
}
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
-- Loop through all 8 segments and add items
for i = 1, 8 do
    radialMenu.Segments[i]:AddItem(item1)
    radialMenu.Segments[i]:AddItem(item2)
end
```
</TabItem>
</Tabs>

## Handling Events

The Radial Menu exposes a series of events allowing you to listen to segment highlights, sub-item selections, and menu state changes.

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
// When the menu is opened
menu.OnMenuOpen += (menu, _) => { 
    Screen.ShowSubtitle("Radial Menu opened!"); 
};

// When the menu is closed
menu.OnMenuClose += (menu) => { 
    Screen.ShowSubtitle("Radial Menu closed!"); 
};

// When a segment is highlighted (focused)
menu.OnSegmentHighlight += (segment) => { 
    Screen.ShowSubtitle($"Segment {segment.Index} highlighted!"); 
};

// When the user changes the sub-item within the highlighted segment
menu.OnSegmentIndexChange += (segment, index) => { 
    Screen.ShowSubtitle($"Segment {segment.Index}, index changed to {index}!"); 
};

// When the user clicks / selects the highlighted segment
menu.OnSegmentSelect += (segment) => { 
    Screen.ShowSubtitle($"Segment {segment.Index} selected!"); 
};
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
radialMenu.OnMenuOpen = function(menu, _)
    ScaleformUI.Notifications:ShowSubtitle("Radial Menu opened!")
end

radialMenu.OnMenuClose = function(menu)
    ScaleformUI.Notifications:ShowSubtitle("Radial Menu closed!")
end

radialMenu.OnSegmentHighlight = function(segment)
    ScaleformUI.Notifications:ShowSubtitle("Segment " .. segment.Index .. " highlighted!")
end

radialMenu.OnSegmentIndexChange = function(segment, index)
    ScaleformUI.Notifications:ShowSubtitle("Segment " .. segment.Index .. ", index changed to " .. index .. "!")
end

radialMenu.OnSegmentSelect = function(segment)
    ScaleformUI.Notifications:ShowSubtitle("Segment " .. segment.Index .. " selected!")
end
```
</TabItem>
</Tabs>

## Showing the Menu

Once all items and events have been configured, simply set the menu to visible. You can optionally pre-select the current segment.

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
// Optional: Pre-select a segment
menu.CurrentSegment = 1;

// Make the menu visible
menu.Visible = true;
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
-- Make the menu visible
radialMenu:Visible(true)
```
</TabItem>
</Tabs>


