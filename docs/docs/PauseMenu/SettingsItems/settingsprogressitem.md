---
title: SettingsProgressItem
---

# SettingsProgressItem

A progress bar settings item.

## Constructors
* **C#**: `public SettingsProgressItem(string label, int max, int startIndex, bool masked, SColor barColor)`
* **Lua**: `SettingsProgressItem.New(label, max, startIndex, masked, barColor)`

## Properties
* **MaxValue** (`int`): Gets the maximum value.
* **Value** (`int`): Gets or sets the current value.
* **ColoredBarColor** (`SColor`): Gets or sets the bar color.

## Events
* **OnBarChanged**: Fired when the progress value changes.
* **OnProgressSelected**: Fired when the progress bar is selected.
