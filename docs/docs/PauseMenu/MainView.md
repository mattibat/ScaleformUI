---
layout: default
title: MainView & Columns/Panels
parent: Pause Menu
show_buttons: false
show_all_code: false
---

# MainView and Column/Panel Types

`MainView` is the entry point for the Lobby Menu (corona mode). It extends `TabView` and wraps a `PlayerListTab` internally to provide the three-column lobby layout.

## MainView API

### Constructors

#### C#
```csharp
public MainView(string title);
public MainView(string title, string subtitle);
public MainView(string title, string subtitle, string sideTop, string sideMid, string sideBot);
```

#### Lua
```lua
MainView.New(title, subtitle, sideTop, sideMid, sideBot)
```

---

### Properties

* **Minimap** (`MinimapPanel`): Gets the minimap panel associated with the lobby menu.
* **Index** (`int`): Gets or sets the current column index.

---

### Events

#### C#
* **OnLobbyMenuOpen**: Fired when the lobby menu opens.
  ```csharp
  public event LobbyMenuOpenEvent OnLobbyMenuOpen;
  ```
* **OnLobbyMenuClose**: Fired when the lobby menu closes.
  ```csharp
  public event LobbyMenuCloseEvent OnLobbyMenuClose;
  ```

#### Lua
Assign functions directly to the menu object:
```lua
menu.OnLobbyMenuOpen = function(menu) end
menu.OnLobbyMenuClose = function(menu) end
```

---

### Methods

* **SelectColumn(int column)**: Switches focus to the specified column index.
* **SelectColumn(PM_COLUMNS column)**: Switches focus to the specified column.
* **SetupLeftColumn(PM_Column column)**: Configures the left column.
* **SetupCenterColumn(PM_Column column)**: Configures the center column.
* **SetupRightColumn(PM_Column column)**: Configures the right column.

---

## Column Types

Columns inherit from `PM_Column` and represent the vertical lists in the menu.

### SettingsListColumn

Used for settings items such as checkboxes, sliders, lists, and progress bars.

#### Constructors
* **C#**: `public SettingsListColumn(string label, int maxItems = 16)`
* **Lua**: `SettingsListColumn.New(label, maxItems, scrollingType)`

#### Events
* **OnIndexChanged**: Fired when the selected item index changes.
* **OnSettingItemActivated**: Fired when a settings item is selected.

#### Methods
* **AddSettings(UIMenuItem item)**: Adds a settings item.
* **RemoveItem(UIMenuItem item)**: Removes a settings item.
* **RemoveItemAt(int index)**: Removes the item at the specified index.
* **AddItemAt(UIMenuItem item, int idx)**: Inserts an item at the specified index.
* **UpdateItemLabels(int index, string leftLabel, string rightLabel)**: Updates the labels of an item.
* **UpdateItemBlinkDescription(int index, bool blink)**: Toggles description blinking.
* **UpdateItemLabel(int index, string label)**: Updates the left label.
* **UpdateItemRightLabel(int index, string label)**: Updates the right label.
* **UpdateItemLeftBadge(int index, BadgeIcon badge)**: Sets the left badge.
* **UpdateItemRightBadge(int index, BadgeIcon badge)**: Sets the right badge.
* **EnableItem(int index, bool enable)**: Enables or disables an item.
* **SortSettings(Comparison&lt;UIMenuItem&gt; compare)**: Sorts the settings items.
* **FilterSettings(Func&lt;UIMenuItem, bool&gt; predicate)**: Filters the settings items.
* **ResetFilter()**: Restores all unfiltered items.

---

### PlayerListColumn

Used for player and friend list items.

#### Constructors
* **C#**: `public PlayerListColumn(string label, int maxItems = 16)`
* **Lua**: `PlayerListColumn.New(label, maxItems)`

#### Events
* **OnIndexChanged**: Fired when the selected player index changes.
* **OnPlayerItemActivated**: Fired when a player item is selected.

#### Methods
* **AddPlayer(FriendItem item)**: Adds a player item.
* **RemoveItem(FriendItem item)**: Removes a player item.
* **RemoveItemAt(int index)**: Removes the item at the specified index.
* **RemovePlayer(int id)**: Removes a player by their ID.
* **Clear()**: Clears all player items.
* **SortPlayers(Comparison&lt;LobbyItem&gt; compare)**: Sorts the player items.
* **FilterPlayers(Func&lt;LobbyItem, bool&gt; predicate)**: Filters the player items.
* **ResetFilter()**: Restores all unfiltered items.

---

### MissionsListColumn

Used for mission list items.

#### Constructors
* **C#**: `public MissionsListColumn(string label, int maxItems = 16)`
* **Lua**: `MissionListColumn.New(label, maxItems, scrollingType)`

#### Events
* **OnIndexChanged**: Fired when the selected mission index changes.
* **OnMissionItemActivated**: Fired when a mission item is selected.

#### Methods
* **AddMissionItem(MissionItem item)**: Adds a mission item.
* **AddItemAt(MissionItem item, int idx)**: Inserts a mission item at the specified index.
* **RemoveItem(MissionItem item)**: Removes a mission item.
* **RemoveItemAt(int index)**: Removes the item at the specified index.
* **RemoveItem(int id)**: Removes a mission by its ID.
* **SortMissions(Comparison&lt;MissionItem&gt; compare)**: Sorts the mission items.
* **FilterMissions(Func&lt;MissionItem, bool&gt; predicate)**: Filters the mission items.
* **ResetFilter()**: Restores all unfiltered items.

---

## Panel Types

Panels are displayed on the right side of the menu to show details or maps.

### MinimapPanel

Manages the in-game minimap display within a tab.

#### Constructors
* **C#**: `public MinimapPanel(BaseTab parenttab)`
* **Lua**: Automatically created on tabs that support it.

#### Properties
* **HidePedBlip** (`bool`): Hides the player blip on the minimap.
* **MinimapRoute** (`MinimapRoute`): Gets the route data for the minimap.
* **MinimapBlips** (`List<FakeBlip>`): Gets the custom blips to display.
* **Enabled** (`bool`): Enables or disables the minimap display.

#### Methods
* **RefreshMapPosition(Vector2 position)**: Updates the minimap center position.
* **MaintainMap()**: Maintained every tick to update map state.
* **ClearMinimap()**: Clears all minimap data.

---

### MissionDetailsPanel

A right-column panel showing mission details.

#### Constructors
* **C#**: `public MissionDetailsPanel(string label)`
* **Lua**: `MissionDetailsPanel.New(label, maxItems)`

#### Properties
* **Title** (`string`): Gets or sets the panel title.
* **TextureDict** (`string`): Gets the panel picture texture dictionary.
* **TextureName** (`string`): Gets the panel picture texture name.

#### Methods
* **UpdatePanelPicture(string txd, string txn)**: Changes the panel picture.
* **AddItem(UIFreemodeDetailsItem item)**: Adds a description item.
* **RemoveItem(int idx)**: Removes a description item.

---

### PlayerStatsPanel

A right-column panel showing player statistics, rank, crew info, and vehicle ownership.

#### Constructors
* **C#**: `public PlayerStatsPanel(string title, SColor titleColor)`
* **Lua**: `PlayerStatsPanel.New(title, titleColor)`

#### Properties
* **ParentItem** (`FriendItem`): Gets the associated friend item.
* **Title** (`string`): Gets or sets the panel title.
* **TitleColor** (`SColor`): Gets or sets the title color.
* **Description** (`ScaleformLabel`): Gets or sets the description text.
* **HasPlane** (`bool`): Shows or hides the plane icon.
* **HasHeli** (`bool`): Shows or hides the helicopter icon.
* **HasBoat** (`bool`): Shows or hides the boat icon.
* **HasVehicle** (`bool`): Shows or hides the vehicle icon.
* **HardwareVisible** (`bool`): Shows or hides hardware info.
* **RankInfo** (`UpperInformation`): Gets the rank display data.
* **CrewInfo** (`BottomInformation`): Gets the crew display data.
* **DetailsItems** (`List<UIFreemodeDetailsItem>`): Gets the additional detail items.

#### Methods
* **AddStat(PlayerStatsPanelStatItem item)**: Adds a stat item.
* **AddDescriptionStatItem(UIFreemodeDetailsItem item)**: Adds a description detail item.
* **UpdatePanel(bool _override = false)**: Refreshes the panel display.
