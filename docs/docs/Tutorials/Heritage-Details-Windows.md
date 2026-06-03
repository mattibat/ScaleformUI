---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Heritage & Details Windows

ScaleformUI allows you to replicate the Grand Theft Auto Online character creation menus. This is achieved by combining a `UIMenuHeritageWindow` (which handles the blending of parent faces) and a `UIMenuDetailsWindow` (which handles the visual display of the active trait blending percentages).

These "Windows" attach directly to the top of your `UIMenu` and update dynamically as users adjust sliders or select options in the menu below.

## Creating the Windows

First, define the `UIMenuHeritageWindow` and the `UIMenuDetailsWindow` and attach them to your `UIMenu`.

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
using ScaleformUI.Menu;

// Create the target menu
UIMenu windowSubmenu = new UIMenu("Character Creator", "Customize your heritage");

// Initialize the Heritage Window (Default Dad Index, Default Mom Index)
UIMenuHeritageWindow heritageWindow = new UIMenuHeritageWindow(0, 0);

// Initialize the Details Window
UIMenuDetailsWindow statsWindow = new UIMenuDetailsWindow(
    "Parents resemblance", // Title
    "Dad:",                // Left Stat Name
    "Mom:",                // Right Stat Name
    true,                  // Has Percentage Wheel?
    new List<UIDetailStat>() // Initial Stats
);

// Add both windows to the Menu
windowSubmenu.AddWindow(heritageWindow);
windowSubmenu.AddWindow(statsWindow);
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
-- Create the target menu
local windowMenu = UIMenu.New("Character Creator", "Customize your heritage")

-- Initialize the Heritage Window (Default Dad Index, Default Mom Index)
local heritageWindow = UIMenuHeritageWindow.New(0, 0)

-- Initialize the Details Window
local detailsWindow = UIMenuDetailsWindow.New(
    "Parents resemblance", -- Title
    "Dad:",                -- Left Stat Name
    "Mom:",                -- Right Stat Name
    true,                  -- Has Percentage Wheel?
    {}                     -- Initial Stats
)

-- Add both windows to the Menu
windowMenu:AddWindow(heritageWindow)
windowMenu:AddWindow(detailsWindow)
```
</TabItem>
</Tabs>

## Linking Menu Items to the Windows

To make the Heritage window change faces, we need two `UIMenuListItem`s (one for Mom, one for Dad). 
To make the Details window show the blending percentage, we need a `UIMenuSliderItem`.

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
// Define faces (In a real scenario, map these to Ped Face IDs)
List<dynamic> momFaces = new List<dynamic>() { "Hannah", "Audrey", "Jasmine", "Giselle" /* ... */ };
List<dynamic> dadFaces = new List<dynamic>() { "Benjamin", "Daniel", "Joshua", "Noah" /* ... */ };

// Create Items
UIMenuListItem mom = new UIMenuListItem("Mom", momFaces, 0);
UIMenuListItem dad = new UIMenuListItem("Dad", dadFaces, 0);
UIMenuSliderItem blendSlider = new UIMenuSliderItem("Heritage Slider", "Adjust resemblance", 100, 5, 50, true);

windowSubmenu.AddItem(mom);
windowSubmenu.AddItem(dad);
windowSubmenu.AddItem(blendSlider);

// Initialize Default Stats
statsWindow.DetailMid = "Dad: " + blendSlider.Value + "%";
statsWindow.DetailBottom = "Mom: " + (100 - blendSlider.Value) + "%";
statsWindow.DetailStats = new List<UIDetailStat>()
{
    new UIDetailStat(100 - blendSlider.Value, SColor.HUD_Pink),
    new UIDetailStat(blendSlider.Value, SColor.HUD_Freemode),
};
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
-- Define faces (In a real scenario, map these to Ped Face IDs)
local momNames = { "Hannah", "Audrey", "Jasmine", "Giselle" }
local dadNames = { "Benjamin", "Daniel", "Joshua", "Noah" }

local momListItem = UIMenuListItem.New("Mom", momNames, 0)
local dadListItem = UIMenuListItem.New("Dad", dadNames, 0)
local heritageSliderItem = UIMenuSliderItem.New("Heritage Slider", 100, 5, 50, true, "Adjust resemblance")

windowMenu:AddItem(momListItem)
windowMenu:AddItem(dadListItem)
windowMenu:AddItem(heritageSliderItem)

-- Initialize Default Stats
detailsWindow.DetailMid = "Dad: " .. heritageSliderItem:Index() .. "%"
detailsWindow.DetailBottom = "Mom: " .. (100 - heritageSliderItem:Index()) .. "%"
detailsWindow.DetailStats = {
    { Percentage = 50, HudColor = SColor.FromHudColor(6) },
    { Percentage = 50, HudColor = SColor.FromHudColor(50) }
}

detailsWindow:UpdateStatsToWheel()
```
</TabItem>
</Tabs>

## Handling Events & Updating

Finally, wire up the menu events so the windows update dynamically when the user interacts with the sliders and lists.

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
int momIndex = 0;
int dadIndex = 0;

// Update Heritage Faces when List changes
windowSubmenu.OnListChange += async (_sender, _listItem, _newIndex) =>
{
    if (_listItem == mom)
    {
        momIndex = _newIndex;
    }
    else if (_listItem == dad)
    {
        dadIndex = _newIndex;
    }
    // Update the Heritage Window visual
    heritageWindow.Index(momIndex, dadIndex);
};

// Update Blend Wheel when Slider changes
windowSubmenu.OnSliderChange += (sender, item, value) =>
{
    statsWindow.DetailStats[0].Percentage = 100 - value;
    statsWindow.DetailStats[0].HudColor = SColor.HUD_Pink;
    
    statsWindow.DetailStats[1].Percentage = value;
    statsWindow.DetailStats[1].HudColor = SColor.HUD_Freemode;

    // Push the new percentages to the scaleform
    statsWindow.UpdateStatsToWheel();
    
    // Update the text labels
    statsWindow.UpdateLabels(
        "Parents resemblance", 
        "Dad: " + value + "%", 
        "Mom: " + (100 - value) + "%"
    );
};
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
local MomIndex = 0
local DadIndex = 0

-- Update Heritage Faces when List changes
windowMenu.OnListChange = function(menu, item, newindex)
    if (item == momListItem) then
        MomIndex = newindex
    elseif (item == dadListItem) then
        DadIndex = newindex
    end
    -- Update the Heritage Window visual
    heritageWindow:Index(MomIndex, DadIndex)
end

-- Update Blend Wheel when Slider changes
heritageSliderItem.OnSliderChanged = function(menu, item, value)
    detailsWindow.DetailStats[1].Percentage = 100 - value
    detailsWindow.DetailStats[2].Percentage = value
    
    -- Push the new percentages to the scaleform
    detailsWindow:UpdateStatsToWheel()
    
    -- Update the text labels
    detailsWindow:UpdateLabels(
        "Parents resemblance", 
        "Dad: " .. value .. "%", 
        "Mom: " .. (100 - value) .. "%"
    )
end
```
</TabItem>
</Tabs>


