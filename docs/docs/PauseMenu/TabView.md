---
layout: default
title: TabView & Tabs
parent: Pause Menu
show_buttons: false
show_all_code: false
---

# TabView and Tab Types

`TabView` is the main container for the Pause Menu system. It manages the header, tabs, and input processing.

## TabView API

### Constructors

#### C#
```csharp
public TabView(string title);
public TabView(string title, string subtitle);
public TabView(string title, string subtitle, string sideTop, string sideMid, string sideBot);
```

#### Lua
```lua
TabView.New(title, subtitle, sideTop, sideMid, sideBot)
```

* **title**: The main title displayed in the header.
* **subtitle**: The subtitle displayed below the main title.
* **sideTop / sideMid / sideBot**: Optional strings displayed on the right side of the header.

---

### Properties

* **Title** (`string`): Gets or sets the menu title.
* **SubTitle** (`string`): Gets or sets the menu subtitle.
* **SideStringTop** (`string`): Gets or sets the top side header string.
* **SideStringMiddle** (`string`): Gets or sets the middle side header string.
* **SideStringBottom** (`string`): Gets or sets the bottom side header string.
* **TabsColor** (`HudColor`): Gets or sets the color of the tabs.
* **ShowBlur** (`bool`): Enables or disables screen blur when the menu is open.
* **HeaderPicture** (`Tuple<string, string>` / `txd, txn`): Sets the header character image.
* **CrewPicture** (`Tuple<string, string>` / `txd, txn`): Sets the crew emblem image.
* **SetHeaderDynamicWidth** (`bool`): Enables or disables dynamic header width.
* **Tabs** (`List<BaseTab>`): Gets the collection of tabs.
* **FocusLevel** (`int`): Gets or sets the current focus level.
* **TemporarilyHidden** (`bool`): Temporarily hides the menu.
* **HideTabs** (`bool`): Hides the tab bar.
* **DisplayHeader** (`bool`): Shows or hides the header.
* **Index** (`int`): Gets or sets the current tab index.
* **CurrentTab** (`BaseTab`): Gets the currently active tab.
* **Visible** (`bool`): Gets or sets the menu visibility.

---

### Events

#### C#
* **OnPauseMenuOpen**: Fired when the pause menu opens.
  ```csharp
  public event PauseMenuOpenEvent OnPauseMenuOpen;
  ```
* **OnPauseMenuClose**: Fired when the pause menu closes.
  ```csharp
  public event PauseMenuCloseEvent OnPauseMenuClose;
  ```
* **OnPauseMenuTabChanged**: Fired when the active tab changes.
  ```csharp
  public event PauseMenuTabChanged OnPauseMenuTabChanged;
  ```
* **OnPauseMenuFocusChanged**: Fired when the focus level changes.
  ```csharp
  public event PauseMenuFocusChanged OnPauseMenuFocusChanged;
  ```
* **OnColumnItemChange**: Fired when a column item is hovered or changed.
  ```csharp
  public event ColumnItemEvent OnColumnItemChange;
  ```
* **OnColumnItemSelect**: Fired when a column item is selected.
  ```csharp
  public event ColumnItemEvent OnColumnItemSelect;
  ```

#### Lua
Assign functions directly to the menu object:
```lua
menu.OnPauseMenuOpen = function(menu) end
menu.OnPauseMenuClose = function(menu) end
menu.OnPauseMenuTabChanged = function(menu, tab, tabIndex) end
menu.OnPauseMenuFocusChanged = function(menu, tab, focusLevel) end
menu.OnColumnItemChange = function(menu, tab, column, itemIndex) end
menu.OnColumnItemSelect = function(menu, tab, column, itemIndex) end
```

---

### Methods

* **AddTab(BaseTab tab)**: Adds a tab to the menu.
* **ShowHeader()**: Rebuilds and displays the header.
* **BuildPauseMenu()**: Rebuilds the pause menu content.
* **GoBack()**: Navigates back or closes the menu.
* **Draw()**: Renders the menu. Call this every tick.
* **ProcessMouse()**: Processes mouse input.
* **ProcessControls()**: Processes controller and keyboard input.

---

## Tab Types

### TextTab

A simple single-column tab for text-based content.

#### Constructors
* **C#**: `public TextTab(string name, string title, SColor color)`
* **Lua**: `TextTab.New(name, title, color)`

#### Properties
* **TextTitle** (`string`): The title text displayed in the tab.
* **WordWrap** (`int`): Word wrap width.
* **LeftColumn** (`TextColumn`): The left column containing the text items.

#### Methods
* **AddItem(PauseMenuItem item)**: Adds a text item to the left column.
* **UpdateBackground(string txd, string txn)**: Sets the background image.
* **AddPicture(string txd, string txn)**: Adds a right-side picture.

---

### SubmenuTab

A two-column tab with a left navigation column and a center content column. It supports Settings, Info, Statistics, and Keymap item types.

#### Constructors
* **C#**: `public SubmenuTab(string name, SColor color)`
* **Lua**: `SubmenuTab.New(name, color)`

#### Methods
* **AddLeftItem(TabLeftItem item)**: Adds a navigation item to the left column.
* **SwitchColumn(int index)**: Switches focus to the specified column index.
* **SwitchColumn(PM_COLUMNS index)**: Switches focus to the specified column.

---

### PlayerListTab

A three-column tab for player lists, settings, and missions. It is used in the Lobby Menu.

#### Constructors
* **C#**: `public PlayerListTab(string name, SColor color)`
* **Lua**: `PlayerListTab.New(name, color, forceFirstSelection)`

#### Properties
* **ForceFirstSelectionOnFocus** (`bool`): Forces the first item to be selected when the tab gains focus.

#### Events
* **OnFocusChanged**: Fired when the column focus changes.
  ```csharp
  public event ColumnFocusedEvent OnFocusChanged;
  ```

#### Methods
* **SetupLeftColumn(PM_Column column)**: Configures the left column.
* **SetupCenterColumn(PM_Column column)**: Configures the center column.
* **SetupRightColumn(PM_Column column)**: Configures the right column.
* **SwitchColumn(int index)**: Switches focus to the specified column index.
* **SwitchColumn(PM_COLUMNS index)**: Switches focus to the specified column.

---

### GalleryTab

A gallery-style tab for displaying images and screenshots with grid navigation.

#### Constructors
* **C#**: `public GalleryTab(string name, SColor color)`
* **Lua**: `GalleryTab.New(name, color)`

#### Events
* **OnGalleryModeChanged**: Fired when the display mode changes (e.g., entering big picture mode).
* **OnGalleryIndexChanged**: Fired when the selected gallery item index changes.
* **OnGalleryItemSelected**: Fired when a gallery item is selected.

#### Methods
* **AddItem(GalleryItem item)**: Adds a gallery item.
* **SetDescriptionLabels(string title, string date, string location, string track, bool visible)**: Sets the description panel labels.
