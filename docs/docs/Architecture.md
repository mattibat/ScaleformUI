---
layout: default
title: Architecture
show_buttons: false
show_all_code: false
---

# Architectural Explanation

ScaleformUI is designed to bridge the gap between GTA V's native Scaleform system and high-level script environments. This page explains the design decisions, rendering model, and patterns used in the library.

## Wrapping GTA V's Native Scaleform System

GTA V uses Autodesk Scaleform (Flash/ActionScript 2) to render its user interface, including menus, HUD elements, and mini-games. Interacting with these scaleforms natively requires calling a sequence of low-level engine natives. For example, calling a function on a scaleform requires calling `BeginScaleformMovieMethod`, pushing each argument individually by type, and then calling `EndScaleformMovieMethod`.

ScaleformUI wraps this complex native pipeline into a clean, type-safe API. It handles the underlying native calls, type conversions, and memory management automatically. This allows developers to focus on UI design rather than native call sequences.

## Low-Level Wrappers vs High-Level Wraps

The architecture is split into two distinct layers:

1. **Low-Level Wrappers (`ScaleformWideScreen` / `Scaleform`)**:
   These classes represent a direct, raw connection to a single scaleform movie instance. They manage the movie handle, check if the movie is loaded, and expose generic methods to call ActionScript functions and render the movie. Crucially, they don't have any knowledge of what the scaleform actually does.

2. **High-Level Wraps (e.g., `PopupWarning`, `BigMessage`, `PauseMenu`)**:
   These classes represent specific UI components. They encapsulate one or more low-level scaleform instances and expose a domain-specific API. For example, `PopupWarning` manages a `POPUP_WARNING` scaleform instance and exposes methods like `ShowWarning` and `UpdateWarning`. It translates these high-level concepts into specific ActionScript function calls (like `SHOW_POPUP_WARNING`) and handles the layout and button events.

This separation keeps the codebase modular. If a new scaleform is added to the game, it can be wrapped using the existing low-level classes without modifying the core rendering logic.

## Tick-Based Rendering Model

Scaleforms in GTA V are transient. They don't persist on screen automatically. Instead, they must be drawn every single frame (tick) to remain visible.

ScaleformUI implements a tick-based rendering model:

- **Registration**: High-level components register themselves or are updated within a global tick loop. In C#, this is managed by `Main` (inheriting from `BaseScript`) via the `Tick` event. Lua resources use a persistent thread (`Citizen.CreateThread`) that runs continuously.
- **State Check**: During each tick, the loop checks which components are active and loaded.
- **Drawing**: Active components call their internal update methods, which invoke the low-level render methods (like `Render2D` or `Render3D`). These methods call the native drawing functions (such as `DrawScaleformMovieFullscreen`) to render the scaleform for that frame.
- **Disposal**: When a component is closed or no longer needed, it's disposed. This stops the tick loop from rendering it and releases the scaleform movie handle from memory.

This model ensures optimal performance by only rendering active scaleforms and immediately freeing resources when they're closed.

## Dual C# and Lua Design Patterns

ScaleformUI supports both C# and Lua, but adapts to the idiomatic patterns of each language.

### C# Design Patterns

C# uses object-oriented patterns and language features:

- **Properties**: Properties are used for state checks and configuration (e.g., `IsShowing`, `IsValid`, `IsLoaded`).
- **Events**: C# delegates and events handle user interactions (e.g., `OnButtonPressed`).
- **Strong Typing**: Arguments passed to scaleforms are type-checked at compile time.
- **Asynchronous Tasks**: Awaiting scaleform return values uses `async/await` and `Task<T>`.

### Lua Design Patterns

Lua uses table-based object-oriented emulation and procedural patterns:

- **Getter/Setter Methods**: Since Lua doesn't have native properties, it uses methods for state checks (e.g., `IsShowing()`, `IsValid()`, `IsLoaded()`).
- **Callback Functions**: Interactions are handled by assigning functions to table fields (e.g., `OnButtonPressed = function(button) ... end`).
- **Dynamic Typing**: Arguments are checked at runtime and dynamically mapped to scaleform types.
- **Promises**: Awaiting scaleform return values or loading states uses promises and callbacks.

These dual patterns ensure that developers in both languages feel at home when using the library.
