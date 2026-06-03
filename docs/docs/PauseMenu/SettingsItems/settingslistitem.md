---
title: SettingsListItem
---

# SettingsListItem

A dropdown list settings item.

## Constructors
* **C#**: `public SettingsListItem(string label, List<dynamic> items, int startIndex)`
* **Lua**: `SettingsListItem.New(label, items, startIndex)`

## Properties
* **ListItems** (`List<dynamic>`): Gets the list of options.
* **ItemIndex** (`int`): Gets or sets the current selection index.

## Events
* **OnListItemChanged**: Fired when the selected item changes.
* **OnListItemSelected**: Fired when the item is selected.
