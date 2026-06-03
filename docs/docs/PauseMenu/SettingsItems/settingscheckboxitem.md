---
title: SettingsCheckboxItem
---

# SettingsCheckboxItem

A checkbox settings item.

## Constructors
* **C#**: `public SettingsCheckboxItem(string label, UIMenuCheckboxStyle style, bool checked)`
* **Lua**: `SettingsCheckboxItem.New(label, style, checked)`

## Properties
* **IsChecked** (`bool`): Gets or sets the checkbox state.
* **CheckBoxStyle** (`UIMenuCheckboxStyle`): Gets or sets the checkbox style.

## Events
* **OnCheckboxChange**: Fired when the checkbox state changes.
  ```csharp
  public event SettingsCheckboxChanged OnCheckboxChange;
  ```
