---
title: KeymapItem
---

# KeymapItem

A key binding display item.

## Constructors
* **C#**:
  ```csharp
  public KeymapItem(string title, string primaryKeyboard);
  public KeymapItem(string title, string primaryKeyboard, string secondaryKeyboard);
  ```
* **Lua**:
  ```lua
  KeymapItem.New(title, primaryKeyboard, secondaryKeyboard, primaryGamepad, secondaryGamepad)
  ```

## Properties
* **PrimaryKeyboard** (`string`): Gets the primary keyboard binding.
* **PrimaryGamepad** (`string`): Gets the primary gamepad binding.
* **SecondaryKeyboard** (`string`): Gets the secondary keyboard binding.
* **SecondaryGamepad** (`string`): Gets the secondary gamepad binding.
