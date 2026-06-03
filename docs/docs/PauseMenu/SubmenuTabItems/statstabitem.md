---
title: StatsTabItem
---

# StatsTabItem

A statistics display item placed in the center column of a `SubmenuTab`.

## Constructors
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

## Properties
* **Type** (`StatItemType`): Gets the stat item type.
* **RightLabel** (`string`): Gets or sets the right-side text label.
* **Value** (`int`): Gets or sets the bar fill value (0 to 100).
* **ColoredBarColor** (`SColor`): Gets or sets the bar color.
