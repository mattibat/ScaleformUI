---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Attached Panels & Side Panels

ScaleformUI allows you to attach various interactive and informational panels to your `UIMenuItem` elements. Panels come in two main flavors:
- **Attached Panels**: Which sit inline directly beneath the highlighted item inside the menu (Grid, Color Picker, Percentage, and Statistics panels).
- **Side Panels**: Which break out of the standard menu container and anchor themselves to the side (Mission Details, Vehicle Color Picker panels).

## Attached Panels

Attached panels expand underneath the active `UIMenuItem`. They provide secondary interactions such as adjusting a slider, picking a color from a palette, or viewing stats bars.

### 1. Color Panel
The Color Panel allows you to select a color from a predefined or custom palette.

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
// Standard Palettes (Hair, Makeup, etc.)
UIMenuItem listPanelItem0 = new UIMenuItem("Change Color", "Select a color");
UIMenuColorPanel colorPanel = new UIMenuColorPanel("Hair Color", ColorPanelType.Hair);

exampleMenu.AddItem(listPanelItem0);
listPanelItem0.AddPanel(colorPanel);

// Custom Palette
UIMenuItem listPanelItem1 = new UIMenuItem("Custom palette panel");
UIMenuColorPanel colorPanelCustom = new UIMenuColorPanel("Custom Palette", new List<SColor> { 
    SColor.FromRandomValues(), SColor.FromRandomValues() 
}, 0);

exampleMenu.AddItem(listPanelItem1);
listPanelItem1.AddPanel(colorPanelCustom);

// Event Handling
colorPanel.OnColorPanelChange += (item, panel, index) =>
{
    Notifications.ShowNotification($"ColorPanel index => {index}");
};
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
-- Standard Palettes
local listPanelItem1 = UIMenuItem.New("Change Color", "Select a color")
local colorPanel = UIMenuColorPanel.New("Color Panel Example", 1, 0)

-- Custom Palette
local colorPanel2 = UIMenuColorPanel.New("Custom Palette Example", 1, 0,
    { SColor.FromRandomValues(), SColor.FromRandomValues(), SColor.FromRandomValues() })

exampleMenu:AddItem(listPanelItem1)
listPanelItem1:AddPanel(colorPanel)
listPanelItem1:AddPanel(colorPanel2)

-- Event Handling
colorPanel.OnColorPanelChanged = function(menu, item, newindex)
    local message = "ColorPanel index => " .. newindex + 1
    ScaleformUI.Notifications:ShowSubtitle(message)
end
```
</TabItem>
</Tabs>

### 2. Percentage Panel
The Percentage Panel allows the user to slide a value between 0% and 100%.

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
UIMenuItem listPanelItem2 = new UIMenuItem("Change Percentage", "Modify the opacity");
UIMenuPercentagePanel percentagePanel = new UIMenuPercentagePanel("Percentage Panel", "0%", "100%");

exampleMenu.AddItem(listPanelItem2);
listPanelItem2.AddPanel(percentagePanel);

percentagePanel.OnPercentagePanelChange += (item, panel, index) =>
{
    Screen.ShowSubtitle("Percentage = " + index + "...");
};
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
local listPanelItem2 = UIMenuItem.New("Change Percentage", "Modify the opacity")
local percentagePanel = UIMenuPercentagePanel.New("Percentage Panel Example", "0%", "100%")

exampleMenu:AddItem(listPanelItem2)
listPanelItem2:AddPanel(percentagePanel)

percentagePanel.OnPercentagePanelChange = function(menu, item, newpercentage)
    local message = "PercentagePanel => " .. newpercentage
    ScaleformUI.Notifications:ShowSubtitle(message)
end
```
</TabItem>
</Tabs>

### 3. Grid Panel
The Grid Panel allows selection in a 2D space (X and Y coordinates). It can be standard (4 directions) or horizontal-only.

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
UIMenuItem listPanelItem3 = new UIMenuItem("Change Grid Position", "Select coordinate");

UIMenuGridPanel gridPanel = new UIMenuGridPanel("Up", "Left", "Right", "Down", new PointF(.5f, .5f));
UIMenuGridPanel horizontalGridPanel = new UIMenuGridPanel("Left", "Right", new PointF(.5f, .5f));

exampleMenu.AddItem(listPanelItem3);
listPanelItem3.AddPanel(gridPanel);
listPanelItem3.AddPanel(horizontalGridPanel);

gridPanel.OnGridPanelChange += (item, panel, value) =>
{
    Screen.ShowSubtitle("GridPosition = " + value + "...");
};
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
local listPanelItem3 = UIMenuItem.New("Change Grid Position", "Select coordinate")

local gridPanel = UIMenuGridPanel.New("Up", "Left", "Right", "Down", vector2(0.5, 0.5), 0)
local horizontalGridPanel = UIMenuGridPanel.New("", "Left", "Right", "", vector2(0.5, 0.5), 1)

exampleMenu:AddItem(listPanelItem3)
listPanelItem3:AddPanel(gridPanel)
listPanelItem3:AddPanel(horizontalGridPanel)

gridPanel.OnGridPanelChanged = function(menu, item, newposition)
    ScaleformUI.Notifications:ShowSubtitle("GridPosition => " .. newposition)
end
```
</TabItem>
</Tabs>

### 4. Statistics Panel
Displays a series of progress bars associated with text labels (perfect for character or vehicle statistics).

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
UIMenuListItem listPanelItem4 = new UIMenuListItem("Look at Statistics", new List<object> { "Build A", "Build B" }, 0);
UIMenuStatisticsPanel statistics = new UIMenuStatisticsPanel();

exampleMenu.AddItem(listPanelItem4);
listPanelItem4.AddPanel(statistics);

statistics.AddStatistics("Top Speed", 0);
statistics.AddStatistics("Acceleration", 0);
statistics.AddStatistics("Braking", 0);

// You can update statistics dynamically based on the current selection
listPanelItem4.OnListChanged += (a, b) =>
{
    if (b == 0) {
        statistics.UpdateStatistic(0, 80f);
        statistics.UpdateStatistic(1, 50f);
        statistics.UpdateStatistic(2, 40f);
    } else {
        statistics.UpdateStatistic(0, 100f);
        statistics.UpdateStatistic(1, 95f);
        statistics.UpdateStatistic(2, 60f);
    }
};
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
local listPanelItem4 = UIMenuListItem.New("Look at Statistics", { "Build A", "Build B" }, 0)
local statisticsPanel = UIMenuStatisticsPanel.New()

statisticsPanel:AddStatistic("Top Speed", 10.0)
statisticsPanel:AddStatistic("Acceleration", 50.0)
statisticsPanel:AddStatistic("Braking", 100.0)

exampleMenu:AddItem(listPanelItem4)
listPanelItem4:AddPanel(statisticsPanel)

listPanelItem4.OnListChanged = function(menu, item, newIndex)
    if (newIndex == 1) then
        statisticsPanel:UpdateStatistic(1, 80.0)
        statisticsPanel:UpdateStatistic(2, 50.0)
        statisticsPanel:UpdateStatistic(3, 40.0)
    elseif (newIndex == 2) then
        statisticsPanel:UpdateStatistic(1, 100.0)
        statisticsPanel:UpdateStatistic(2, 95.0)
        statisticsPanel:UpdateStatistic(3, 60.0)
    end
end
```
</TabItem>
</Tabs>

---

## Side Panels

Side panels break out of the standard menu layout. They anchor directly to the right side of the menu and provide extra context or tools.

### 1. Mission Details Panel
Presents a large image header and multiple lines of data/text (useful for job briefings, real estate, or vehicle sales).

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
UIMenuItem ketchupItem = new UIMenuItem("Show Details", "Description here");

// Create panel attached to the Right side
UIMissionDetailsPanel sidePanel = new UIMissionDetailsPanel(
    PanelSide.Right, 
    "Property Details", 
    false, 
    "scaleformui", 
    "bannerbackground" // You can stream DUIs to this background too!
);

// Add items to the details panel
UIFreemodeDetailsItem detailItem1 = new UIFreemodeDetailsItem("Price", "$150,000", ScaleformFonts.SIGNPAINTER_HOUSESCRIPT, ScaleformFonts.GTAV_TAXI_DIGITAL, BadgeIcon.BRIEFCASE, SColor.HUD_Green);
UIFreemodeDetailsItem detailItem2 = new UIFreemodeDetailsItem("Location", "Vinewood", ScaleformFonts.SIGNPAINTER_HOUSESCRIPT, ScaleformFonts.GTAV_TAXI_DIGITAL, BadgeIcon.BRAND_DILETTANTE, SColor.HUD_White);

sidePanel.AddItem(detailItem1);
sidePanel.AddItem(detailItem2);

ketchupItem.AddSidePanel(sidePanel);
exampleMenu.AddItem(ketchupItem);
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
local ketchupItem = UIMenuItem.New("Show Details", "Description here")

local sidePanel = UIMissionDetailsPanel.New(1, "Property Details", 6, true, "scaleformui", "sidepanel")

local detailItem1 = UIMenuFreemodeDetailsItem.New("Price", "$150,000", false, BadgeStyle.BRIEFCASE, SColor.HUD_Green, false, ScaleformFonts.SIGNPAINTER_HOUSESCRIPT, ScaleformFonts.STENCIL_STD)
local detailItem2 = UIMenuFreemodeDetailsItem.New("Location", "Vinewood", false, BadgeStyle.BRAND_DILETTANTE, SColor.HUD_White, false, ScaleformFonts.SIGNPAINTER_HOUSESCRIPT, ScaleformFonts.STENCIL_STD)

sidePanel:AddItem(detailItem1)
sidePanel:AddItem(detailItem2)

ketchupItem:AddSidePanel(sidePanel)
exampleMenu:AddItem(ketchupItem)
```
</TabItem>
</Tabs>

### 2. Vehicle Color Picker Panel
Allows the user to browse GTA's standard vehicle colors visually.

<Tabs groupId="programming-language">
<TabItem value="C#" label="C#" default>
```csharp
UIMenuItem colorItem = new UIMenuItem("Change Vehicle Color");
exampleMenu.AddItem(colorItem);

UIVehicleColourPickerPanel sidePanelB = new UIVehicleColourPickerPanel(PanelSide.Right, "ColorPicker");
colorItem.AddSidePanel(sidePanelB);

sidePanelB.OnVehicleColorPickerSelect += (item, panel, value, color) =>
{
    Notifications.ShowNotification($"Vehicle Color: {(VehicleColor)value}");
    sidePanelB.Title = ((VehicleColor)value).ToString();
};
```
</TabItem>
<TabItem value="Lua" label="Lua">
```lua
local colorItem = UIMenuItem.New("Change Vehicle Color", "Select a spray!")
exampleMenu:AddItem(colorItem)

local sidePanelVehicleColor = UIVehicleColorPickerPanel.New(1, "ColorPicker", 6)
colorItem:AddSidePanel(sidePanelVehicleColor)

sidePanelVehicleColor.PickerSelect = function(menu, item, newindex)
    local message = "ColorPanel index => " .. newindex + 1
    ScaleformUI.Notifications:ShowNotification(message)
end
```
</TabItem>
</Tabs>


