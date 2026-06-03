---
title: TabLeftItem
---

# TabLeftItem

A navigation item placed in the left column of a `SubmenuTab`.

## Constructors
* **C#**:
  ```csharp
  public TabLeftItem(string label, LeftItemType type);
  public TabLeftItem(string label, LeftItemType type, SColor mainColor, SColor highlightColor);
  ```
* **Lua**:
  ```lua
  TabLeftItem.New(label, type)
  ```

## Properties
* **ItemType** (`LeftItemType`): Gets the type of the item.
* **ItemList** (`List<PauseMenuItem>`): Gets the list of child items displayed in the center column when this item is selected.
* **RightTitle** (`string`): Gets or sets the title of the right column.
* **KeymapRightLabel_1** (`string`): Gets or sets the first keymap header label.
* **KeymapRightLabel_2** (`string`): Gets or sets the second keymap header label.

## Methods
* **AddItem(PauseMenuItem item)**: Adds a child item to the center column list.
* **UpdateBackground(string txd, string txn, LeftItemBGType resizeType)**: Sets a background texture.
