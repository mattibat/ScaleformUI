---
layout: default
title: How to Create a Lobby Menu
parent: Pause Menu
show_buttons: false
show_all_code: false
---

# How to Create a Lobby Menu

This guide shows you how to create a Lobby Menu (corona mode) using ScaleformUI. You will learn how to set up the three-column layout, add settings, players, and mission details, and handle user interactions.

## Step 1: Initialize the MainView Container

The `MainView` is the entry point for the Lobby Menu. It automatically configures the layout for corona mode.

### C#
```csharp
using ScaleformUI;
using ScaleformUI.LobbyMenu;
using ScaleformUI.PauseMenus.Elements.Columns;
using ScaleformUI.PauseMenus.Elements.Panels;
using CitizenFX.Core;
using System;

public async void CreateLobbyMenu()
{
    // Create the main container
    MainView lobbyMenu = new MainView("Lobby Menu", "Lobby Subtitle", "Detail 1", "Detail 2", "Detail 3");
    lobbyMenu.CanPlayerCloseMenu = true;
    lobbyMenu.TabsColor = HudColor.HUD_COLOUR_PINK;

    // Set up a ped headshot for the header picture
    int mugshot = API.RegisterPedheadshot(Game.PlayerPed.Handle);
    while (!API.IsPedheadshotReady(mugshot)) await BaseScript.Delay(1);
    string ped_txd = API.GetPedheadshotTxdString(mugshot);
    lobbyMenu.HeaderPicture = new Tuple<string, string>(ped_txd, ped_txd);
    API.UnregisterPedheadshot(mugshot);
}
```

### Lua
```lua
function CreateLobbyMenu()
    -- Create the main container
    local lobbyMenu = MainView.New("Lobby Menu", "Lobby Subtitle", "Detail 1", "Detail 2", "Detail 3")
    lobbyMenu:CanPlayerCloseMenu(true)
    lobbyMenu:TabsColor(Colours.HUD_COLOUR_PINK)

    -- Set up a ped headshot for the header picture
    local handle = RegisterPedheadshot(PlayerPedId())
    while not IsPedheadshotReady(handle) or not IsPedheadshotValid(handle) do Citizen.Wait(0) end
    local txd = GetPedheadshotTxdString(handle)
    lobbyMenu:HeaderPicture(txd, txd)
    UnregisterPedheadshot(handle)
end
```

---

## Step 2: Set Up the Columns

A Lobby Menu consists of three columns: a left column (usually settings), a center column (usually players), and a right column (usually mission details or player stats).

### C#
```csharp
// Create the columns
SettingsListColumn settingsCol = new SettingsListColumn("SETTINGS", 16);
PlayerListColumn playersCol = new PlayerListColumn("PLAYERS", 16);
MissionDetailsPanel detailsCol = new MissionDetailsPanel("DETAILS");

// Assign the columns to the lobby menu
lobbyMenu.SetupLeftColumn(settingsCol);
lobbyMenu.SetupCenterColumn(playersCol);
lobbyMenu.SetupRightColumn(detailsCol);
```

### Lua
```lua
-- Create the columns
local settingsCol = SettingsListColumn.New("SETTINGS", 16)
local playersCol = PlayerListColumn.New("PLAYERS", 16)
local detailsCol = MissionDetailsPanel.New("DETAILS")

-- Assign the columns to the lobby menu
lobbyMenu:SetupLeftColumn(settingsCol)
lobbyMenu:SetupCenterColumn(playersCol)
lobbyMenu:SetupRightColumn(detailsCol)
```

---

## Step 3: Populate the Columns

Add settings items, players, and details to the columns.

### C#
```csharp
// 1. Populate Settings Column
UIMenuItem startItem = new UIMenuItem("Start Match", "Start the match immediately.");
UIMenuCheckboxItem friendlyFire = new UIMenuCheckboxItem("Friendly Fire", true, "Toggle friendly fire.");
settingsCol.AddSettings(startItem);
settingsCol.AddSettings(friendlyFire);

// 2. Populate Players Column
CrewTag crew = new CrewTag("DEV", false, false, CrewHierarchy.Leader, SColor.HUD_Green);
FriendItem playerItem = new FriendItem(Game.Player.Name, SColor.HUD_Green, true, 100, "Ready", crew);
playerItem.SetLeftIcon(LobbyBadgeIcon.IS_PC_PLAYER);
playerItem.ClonePed = Game.PlayerPed;

// Create a stats panel for the player
PlayerStatsPanel statsPanel = new PlayerStatsPanel("Player Stats", SColor.HUD_Green);
statsPanel.RankInfo.RankLevel = 50;
statsPanel.RankInfo.LowLabel = "Rank 50";
statsPanel.AddStat(new PlayerStatsPanelStatItem("Kills", "Total kills", 75));
statsPanel.AddStat(new PlayerStatsPanelStatItem("Deaths", "Total deaths", 25));

playerItem.AddPanel(statsPanel);
playersCol.AddPlayer(playerItem);

// 3. Populate Details Column
detailsCol.Title = "Match Details";
detailsCol.UpdatePanelPicture("scaleformui", "lobby_panelbackground");
detailsCol.AddItem(new UIFreemodeDetailsItem("Map", "Los Santos"));
detailsCol.AddItem(new UIFreemodeDetailsItem("Time Limit", "10 Minutes"));
```

### Lua
```lua
-- 1. Populate Settings Column
local startItem = UIMenuItem.New("Start Match", "Start the match immediately.")
local friendlyFire = UIMenuCheckboxItem.New("Friendly Fire", true, 1, "Toggle friendly fire.")
settingsCol:AddSettings(startItem)
settingsCol:AddSettings(friendlyFire)

-- 2. Populate Players Column
local crew = CrewTag.New("DEV", true, false, CrewHierarchy.Leader, SColor.HUD_Green)
local playerItem = FriendItem.New(GetPlayerName(PlayerId()), SColor.HUD_Green, true, 100, "Ready", crew)
playerItem:SetLeftIcon(LobbyBadgeIcon.IS_PC_PLAYER, false)
playerItem.ClonePed = PlayerPedId()

-- Create a stats panel for the player
local statsPanel = PlayerStatsPanel.New("Player Stats", SColor.HUD_Green)
statsPanel.RankInfo:RankLevel(50)
statsPanel.RankInfo:LowLabel("Rank 50")
statsPanel:AddStat(PlayerStatsPanelStatItem.New("Kills", "Total kills", 75))
statsPanel:AddStat(PlayerStatsPanelStatItem.New("Deaths", "Total deaths", 25))

playerItem:AddPanel(statsPanel)
playersCol:AddPlayer(playerItem)

-- 3. Populate Details Column
detailsCol:Title("Match Details")
detailsCol:UpdatePanelPicture("scaleformui", "lobby_panelbackground")
detailsCol:AddItem(UIMenuFreemodeDetailsItem.New("Map", "Los Santos"))
detailsCol:AddItem(UIMenuFreemodeDetailsItem.New("Time Limit", "10 Minutes"))
```

---

## Step 4: Handle Events and Open the Menu

Handle column selection changes and draw the menu in a tick loop.

### C#
```csharp
// Handle column index changes
settingsCol.OnIndexChanged += (col, index) =>
{
    Debug.WriteLine($"Settings column index changed to {index}");
};

playersCol.OnPlayerItemActivated += (col, item) =>
{
    // Switch focus to the right column (details/stats panel) when a player is selected
    lobbyMenu.SelectColumn(PM_COLUMNS.RIGHT);
};

// Open the menu
lobbyMenu.Visible = true;

// Register the tick loop to draw the menu
BaseScript.RegisterTick(async () =>
{
    if (lobbyMenu.Visible)
    {
        lobbyMenu.Draw();
    }
    await BaseScript.Delay(0);
});
```

### Lua
```lua
-- Handle column index changes
settingsCol.OnIndexChanged = function(index)
    print("Settings column index changed to " .. index)
end

playersCol.OnPlayerItemActivated = function(col, item)
    -- Switch focus to the right column (details/stats panel) when a player is selected
    lobbyMenu:SelectColumn(2) -- 0 = Left, 1 = Center, 2 = Right
end

-- Open the menu
lobbyMenu:Visible(true)

-- Register the tick loop to draw the menu
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        if lobbyMenu:Visible() then
            lobbyMenu:Draw()
        end
    end
end)
```
