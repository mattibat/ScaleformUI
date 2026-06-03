---
title: SettingsSliderItem
---

# SettingsSliderItem

A slider settings item.

## Constructors
* **C#**: `public SettingsSliderItem(string label, int max, int startIndex, SColor barColor)`
* **Lua**: `SettingsSliderItem.New(label, max, startIndex, barColor)`

## Properties
* **MaxValue** (`int`): Gets the maximum value.
* **Value** (`int`): Gets or sets the current value.
* **ColoredBarColor** (`SColor`): Gets or sets the bar color.

## Events
* **OnBarChanged**: Fired when the slider value changes.
* **OnSliderSelected**: Fired when the slider is selected.
