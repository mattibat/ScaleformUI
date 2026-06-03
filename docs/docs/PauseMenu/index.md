---
layout: default
title: Pause Menu
show_buttons: false
show_all_code: false
---

# Pause Menu System

The Pause Menu system in ScaleformUI provides a customisable, grid-based interface that mimics the Rockstar pause and lobby menus. It is built entirely using custom scaleforms, offering full controller support, mouse navigation, and responsive layouts.

## Architecture Overview

The system is structured around a main container that holds multiple tabs. Each tab contains columns, and each column contains items or panels.

### Class Hierarchy

The class hierarchy shows how the different components relate to each other:

* **Containers**
  * `TabView`: The main pause menu container. It manages the header, tabs, and input processing.
  * `MainView`: An extension of `TabView` designed specifically for Lobby Menus (corona mode).

* **Tabs** (`BaseTab`)
  * `TextTab`: A single-column tab for displaying text-based content.
  * `SubmenuTab`: A two-column tab with a left navigation column and a center content column.
  * `PlayerListTab`: A three-column tab for player lists, settings, and missions.
  * `GalleryTab`: A grid-based tab for displaying images and screenshots.

* **Columns** (`PM_Column`)
  * `SettingsListColumn`: A column for settings items (checkboxes, sliders, lists).
  * `PlayerListColumn`: A column for player and friend list items.
  * `MissionsListColumn`: A column for mission list items.

* **Panels**
  * `MinimapPanel`: Manages the in-game minimap display within a tab.
  * `MissionDetailsPanel`: A right-column panel showing mission details.
  * `PlayerStatsPanel`: A right-column panel showing player statistics, rank, crew info, and vehicle ownership.

* **Items** (`PauseMenuItem`)
  * `TabLeftItem`: Left-column navigation item for `SubmenuTab`.
  * `StatsTabItem`: Statistics display item for `SubmenuTab` center column.
  * `KeymapItem`: Key binding display item.
  * `SettingsItem`: Base settings item for `SettingsListColumn`.
    * `SettingsCheckboxItem`: Checkbox settings item.
    * `SettingsListItem`: Dropdown list settings item.
    * `SettingsProgressItem`: Progress bar settings item.
    * `SettingsSliderItem`: Slider settings item.
    * `SettingsSeparatorItem`: Separator/divider item.

## Navigation and Focus

The menu uses a focus level system to handle navigation:
* **Focus Level 0**: The user is navigating the top tab bar.
* **Focus Level 1**: The user is navigating the content inside the active tab (e.g., left column of a `SubmenuTab` or the columns of a `PlayerListTab`).
* **Focus Level 2**: The user is navigating the items inside a column (e.g., center column items when a left item is selected).

This hierarchy ensures that inputs are routed to the correct component.
