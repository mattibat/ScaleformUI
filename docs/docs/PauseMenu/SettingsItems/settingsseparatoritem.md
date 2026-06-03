---
title: SettingsSeparatorItem
---

# SettingsSeparatorItem

A separator or divider item.

## Constructors
* **C#**:
  ```csharp
  public SettingsSeparatorItem(string label); // Labeled separator
  public SettingsSeparatorItem(); // Empty separator
  ```
* **Lua**:
  ```lua
  SettingsSeparatorItem.New(label, isJumpable)
  ```

## Properties
* **IsJumpable** (`bool`): Gets or sets whether navigation can skip over this item.
