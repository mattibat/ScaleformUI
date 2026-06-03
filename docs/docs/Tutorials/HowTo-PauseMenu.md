---
title: How to Create a Pause Menu
show_buttons: false
show_all_code: false
---

# How to Create a Pause Menu with Tabs

This guide shows you how to create a pause menu with multiple tabs using ScaleformUI. You will learn how to set up the main menu container, add different types of tabs, populate them with items, and handle user input.

## Step 1: Initialize the TabView Container

The `TabView` is the main container for your pause menu. It holds the tabs and handles rendering and input.

### C#
```csharp
using ScaleformUI;
using ScaleformUI.PauseMenu;
using CitizenFX.Core;
using System;

public async void CreatePauseMenu()
{
    // Create the main container
    TabView pauseMenu = new TabView("My Server", "PAUSE MENU SUBTITLE", "Top Detail", "Middle Detail", "Bottom Detail");

    // Set up a ped headshot for the header picture
    int mugshot = API.RegisterPedheadshot(Game.PlayerPed.Handle);
    while (!API.IsPedheadshotReady(mugshot)) await BaseScript.Delay(1);
    string mugtxd = API.GetPedheadshotTxdString(mugshot);
    pauseMenu.HeaderPicture = new Tuple<string, string>(mugtxd, mugtxd);
    API.UnregisterPedheadshot(mugshot);
}
```

### Lua
```lua
function CreatePauseMenu()
    -- Create the main container
    local pauseMenu = TabView.New("My Server", "PAUSE MENU SUBTITLE", GetPlayerName(PlayerId()), "Middle Detail", "Bottom Detail")

    -- Set up a ped headshot for the header picture
    local handle = RegisterPedheadshot(PlayerPedId())
    while not IsPedheadshotReady(handle) or not IsPedheadshotValid(handle) do Citizen.Wait(0) end
    local txd = GetPedheadshotTxdString(handle)
    pauseMenu:HeaderPicture(txd, txd)
    UnregisterPedheadshot(handle)
end
```

---

## Step 2: Add a Text Tab

A `TextTab` is a simple single-column tab for displaying text-based content.

### C#
```csharp
// Create the tab
TextTab infoTab = new TextTab("INFO", "Server Rules", SColor.HUD_Freemode);

// Add text items
infoTab.AddItem(new PauseMenuItem("Rule 1: Be respectful to other players."));
infoTab.AddItem(new PauseMenuItem("Rule 2: No cheating or exploiting."));
infoTab.AddItem(new PauseMenuItem("Rule 3: Have fun!"));

// Add the tab to the menu
pauseMenu.AddTab(infoTab);
```

### Lua
```lua
-- Create the tab
local infoTab = TextTab.New("INFO", "Server Rules", SColor.HUD_Freemode)

-- Add text items
infoTab:AddItem(PauseMenuItem.New("Rule 1: Be respectful to other players."))
infoTab:AddItem(PauseMenuItem.New("Rule 2: No cheating or exploiting."))
infoTab:AddItem(PauseMenuItem.New("Rule 3: Have fun!"))

-- Add the tab to the menu
pauseMenu:AddTab(infoTab)
```

---

## Step 3: Add a Submenu Tab with Settings

A `SubmenuTab` allows you to create a left-hand navigation column that updates the center column with different items (like settings, statistics, or keymaps).

### C#
```csharp
// Create the tab
SubmenuTab settingsTab = new SubmenuTab("SETTINGS", SColor.HUD_Freemode);

// Create a left-hand navigation item for settings
TabLeftItem leftSettingsItem = new TabLeftItem("Game Settings", LeftItemType.Settings);

// Add settings items to the left item
SettingsCheckboxItem toggleHud = new SettingsCheckboxItem("Show HUD", UIMenuCheckboxStyle.Tick, true);
SettingsSliderItem volumeSlider = new SettingsSliderItem("SFX Volume", 100, 50, SColor.HUD_Red);

leftSettingsItem.AddItem(toggleHud);
leftSettingsItem.AddItem(volumeSlider);

// Add the left item to the tab
settingsTab.AddLeftItem(leftSettingsItem);

// Add the tab to the menu
pauseMenu.AddTab(settingsTab);
```

### Lua
```lua
-- Create the tab
local settingsTab = SubmenuTab.New("SETTINGS", SColor.HUD_Freemode)

-- Create a left-hand navigation item for settings
local leftSettingsItem = TabLeftItem.New("Game Settings", LeftItemType.Settings)

-- Add settings items to the left item
local toggleHud = SettingsCheckboxItem.New("Show HUD", 1, true) -- 1 = Tick style
local volumeSlider = SettingsSliderItem.New("SFX Volume", 100, 50, SColor.HUD_Red)

leftSettingsItem:AddItem(toggleHud)
leftSettingsItem:AddItem(volumeSlider)

-- Add the left item to the tab
settingsTab:AddLeftItem(leftSettingsItem)

-- Add the tab to the menu
pauseMenu:AddTab(settingsTab)
```

---

## Step 4: Handle Events and Open the Menu

You need to handle menu events and draw the menu in a tick loop.

### C#
```csharp
// Handle menu open and close events
pauseMenu.OnPauseMenuOpen += (menu) =>
{
    Debug.WriteLine("Pause menu opened!");
};

pauseMenu.OnPauseMenuClose += (menu) =>
{
    Debug.WriteLine("Pause menu closed!");
};

// Open the menu
pauseMenu.Visible = true;

// Register the tick loop to draw the menu
BaseScript.RegisterTick(async () =>
{
    if (pauseMenu.Visible)
    {
        pauseMenu.Draw();
    }
    await BaseScript.Delay(0);
});
```

### Lua
```lua
-- Handle menu open and close events
pauseMenu.OnPauseMenuOpen = function(menu)
    print("Pause menu opened!")
end

pauseMenu.OnPauseMenuClose = function(menu)
    print("Pause menu closed!")
end

-- Open the menu
pauseMenu:Visible(true)

-- Register the tick loop to draw the menu
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        if pauseMenu:Visible() then
            pauseMenu:Draw()
        end
    end
end)
```
