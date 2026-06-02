---
layout: default
title: Pause Menu Items & Enums
parent: Pause Menu
show_buttons: false
show_all_code: false
---

# Pause Menu Items and Enums

This reference page documents the items and enums used to build the content of the Pause Menu and Lobby Menu.

## Base Item

### PauseMenuItem

The base class for all items in the pause menu.

#### Constructors
* **C#**: `public PauseMenuItem(string label)`
* **Lua**: `PauseMenuItem.New(label)`

#### Properties
* **Label** (`ScaleformLabel`): Gets or sets the item label text.
* **LabelFont** (`ItemFont`): Gets or sets the font for the label.
* **Selected** (`bool`): Gets or sets the selection state.

---

## SubmenuTab Items

These items are designed specifically for use within a `SubmenuTab`.

### TabLeftItem

A navigation item placed in the left column of a `SubmenuTab`.

#### Constructors
* **C#**:
  ```csharp
  public TabLeftItem(string label, LeftItemType type);
  public TabLeftItem(string label, LeftItemType type, SColor mainColor, SColor highlightColor);
  ```
* **Lua**:
  ```lua
  TabLeftItem.New(label, type)
  ```

#### Properties
* **ItemType** (`LeftItemType`): Gets the type of the item.
* **ItemList** (`List<PauseMenuItem>`): Gets the list of child items displayed in the center column when this item is selected.
* **RightTitle** (`string`): Gets or sets the title of the right column.
* **KeymapRightLabel_1** (`string`): Gets or sets the first keymap header label.
* **KeymapRightLabel_2** (`string`): Gets or sets the second keymap header label.

#### Methods
* **AddItem(PauseMenuItem item)**: Adds a child item to the center column list.
* **UpdateBackground(string txd, string txn, LeftItemBGType resizeType)**: Sets a background texture.

---

### StatsTabItem

A statistics display item placed in the center column of a `SubmenuTab`.

#### Constructors
* **C#**:
  ```csharp
  public StatsTabItem(string label, string rightLabel); // Basic text stat
  public StatsTabItem(string label, int value, SColor color); // Colored bar stat
  ```
* **Lua**:
  ```lua
  StatsTabItem.NewBasic(label, rightLabel)
  StatsTabItem.NewBar(label, value, color)
  ```

#### Properties
* **Type** (`StatItemType`): Gets the stat item type.
* **RightLabel** (`string`): Gets or sets the right-side text label.
* **Value** (`int`): Gets or sets the bar fill value (0 to 100).
* **ColoredBarColor** (`SColor`): Gets or sets the bar color.

---

### KeymapItem

A key binding display item.

#### Constructors
* **C#**:
  ```csharp
  public KeymapItem(string title, string primaryKeyboard);
  public KeymapItem(string title, string primaryKeyboard, string secondaryKeyboard);
  ```
* **Lua**:
  ```lua
  KeymapItem.New(title, primaryKeyboard, secondaryKeyboard, primaryGamepad, secondaryGamepad)
  ```

#### Properties
* **PrimaryKeyboard** (`string`): Gets the primary keyboard binding.
* **PrimaryGamepad** (`string`): Gets the primary gamepad binding.
* **SecondaryKeyboard** (`string`): Gets the secondary keyboard binding.
* **SecondaryGamepad** (`string`): Gets the secondary gamepad binding.

---

## Settings Items

These items are designed for use within a `SettingsListColumn`.

### SettingsItem

The base class for settings items.

#### Constructors
* **C#**: `public SettingsItem(string label, string rightLabel)`
* **Lua**: `SettingsItem.New(label, rightLabel)`

#### Properties
* **Enabled** (`bool`): Gets or sets whether the item is enabled.
* **RightLabel** (`string`): Gets or sets the right-side label text.

---

### SettingsCheckboxItem

A checkbox settings item.

#### Constructors
* **C#**: `public SettingsCheckboxItem(string label, UIMenuCheckboxStyle style, bool checked)`
* **Lua**: `SettingsCheckboxItem.New(label, style, checked)`

#### Properties
* **IsChecked** (`bool`): Gets or sets the checkbox state.
* **CheckBoxStyle** (`UIMenuCheckboxStyle`): Gets or sets the checkbox style.

#### Events
* **OnCheckboxChange**: Fired when the checkbox state changes.
  ```csharp
  public event SettingsCheckboxChanged OnCheckboxChange;
  ```

---

### SettingsListItem

A dropdown list settings item.

#### Constructors
* **C#**: `public SettingsListItem(string label, List<dynamic> items, int startIndex)`
* **Lua**: `SettingsListItem.New(label, items, startIndex)`

#### Properties
* **ListItems** (`List<dynamic>`): Gets the list of options.
* **ItemIndex** (`int`): Gets or sets the current selection index.

#### Events
* **OnListItemChanged**: Fired when the selected item changes.
* **OnListItemSelected**: Fired when the item is selected.

---

### SettingsProgressItem

A progress bar settings item.

#### Constructors
* **C#**: `public SettingsProgressItem(string label, int max, int startIndex, bool masked, SColor barColor)`
* **Lua**: `SettingsProgressItem.New(label, max, startIndex, masked, barColor)`

#### Properties
* **MaxValue** (`int`): Gets the maximum value.
* **Value** (`int`): Gets or sets the current value.
* **ColoredBarColor** (`SColor`): Gets or sets the bar color.

#### Events
* **OnBarChanged**: Fired when the progress value changes.
* **OnProgressSelected**: Fired when the progress bar is selected.

---

### SettingsSliderItem

A slider settings item.

#### Constructors
* **C#**: `public SettingsSliderItem(string label, int max, int startIndex, SColor barColor)`
* **Lua**: `SettingsSliderItem.New(label, max, startIndex, barColor)`

#### Properties
* **MaxValue** (`int`): Gets the maximum value.
* **Value** (`int`): Gets or sets the current value.
* **ColoredBarColor** (`SColor`): Gets or sets the bar color.

#### Events
* **OnBarChanged**: Fired when the slider value changes.
* **OnSliderSelected**: Fired when the slider is selected.

---

### SettingsSeparatorItem

A separator or divider item.

#### Constructors
* **C#**:
  ```csharp
  public SettingsSeparatorItem(string label); // Labeled separator
  public SettingsSeparatorItem(); // Empty separator
  ```
* **Lua**:
  ```lua
  SettingsSeparatorItem.New(label, isJumpable)
  ```

#### Properties
* **IsJumpable** (`bool`): Gets or sets whether navigation can skip over this item.

---

## Enums

### LeftItemType
Specifies the type of a `TabLeftItem`.
* **Empty**: An empty item.
* **Info**: Displays text-based information.
* **Statistics**: Displays statistics.
* **Settings**: Displays settings.
* **Keymap**: Displays key bindings.

### LeftItemBGType
Specifies the background rendering type for a `TabLeftItem`.
* **Full**: Full background.
* **Masked**: Masked background.
* **Resized**: Resized background.

### StatItemType
Specifies the type of a `StatsTabItem`.
* **Basic**: Text-based statistic.
* **ColoredBar**: Visual bar statistic.

### SettingsItemType
Specifies the type of a settings item.
* **Basic**: Standard settings item.
* **ListItem**: Dropdown list.
* **ProgressBar**: Progress bar.
* **CheckBox**: Checkbox.
* **MaskedProgressBar**: Masked progress bar.
* **BlipType**: Blip icon.
* **Separator**: Separator line.
* **SliderBar**: Slider bar.
* **Empty**: Empty space.

### PM_COLUMNS
Specifies column positions within a tab.
* **LEFT**: Left column.
* **MIDDLE**: Center column.
* **RIGHT**: Right column.

### ScrollType
Specifies the scrolling direction for columns.
* **ALL**: Scroll in all directions.
* **UP_DOWN**: Scroll up and down only.
* **LEFT_RIGHT**: Scroll left and right only.
* **NONE**: No scrolling.

### ScrollArrowsPosition
Specifies the position of scroll arrows in a column.
* **LEFT**: Left side.
* **CENTER**: Center.
* **RIGHT**: Right side.
