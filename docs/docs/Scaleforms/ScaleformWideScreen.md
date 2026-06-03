---
layout: default
title: Scaleform Widescreen
parent: Scaleforms API
show_buttons: true
show_all_code: false
---

# Scaleform Widescreen

ScaleformWideScreen is the low-level wrapper class in C# that manages GTA V scaleform movie instances. In Lua, this functionality is provided by the Scaleform class. These classes handle loading, rendering, and calling functions on scaleform movies.

## C# ScaleformWideScreen Class

The `ScaleformWideScreen` class inherits from `INativeValue` and `IDisposable`.

### Constructor

```csharp
public ScaleformWideScreen(string scaleformID)
```
Initialises a new instance of the scaleform movie wrapper. It requests the scaleform movie instance using the native `RequestScaleformMovieInstance`.

### Properties

| Property | Type | Access | Description |
| :--- | :--- | :--- | :--- |
| `Handle` | `int` | Read-only | The internal handle of the scaleform movie instance. |
| `IsValid` | `bool` | Read-only | Returns true if the scaleform handle is not zero. |
| `IsLoaded` | `bool` | Read-only | Returns true if the scaleform movie has finished loading into memory. |
| `NativeValue` | `ulong` | Read/Write | The native value representation of the scaleform handle. |

### Methods

#### CallFunction
```csharp
public void CallFunction(string function, params object[] arguments)
```
Calls a function on the scaleform movie. It pushes the arguments based on their type.

#### CallFunctionReturnValueInt
```csharp
public async Task<int> CallFunctionReturnValueInt(string function, params object[] arguments)
```
Calls a function and awaits the returned integer value.

#### CallFunctionReturnValueBool
```csharp
public async Task<bool> CallFunctionReturnValueBool(string function, params object[] arguments)
```
Calls a function and awaits the returned boolean value.

#### CallFunctionReturnValueString
```csharp
public async Task<string> CallFunctionReturnValueString(string function, params object[] arguments)
```
Calls a function and awaits the returned string value.

#### Render2D
```csharp
public void Render2D()
```
Renders the scaleform movie fullscreen.

#### Render2DScreenSpace
```csharp
public void Render2DScreenSpace(PointF location, PointF size)
```
Renders the scaleform movie in screen space coordinates. The location and size are scaled relative to the screen width and height.

#### Render3D
```csharp
public void Render3D(Vector3 position, Vector3 rotation, Vector3 scale)
```
Renders the scaleform movie in 3D space without additive blending.

#### Render3DAdditive
```csharp
public void Render3DAdditive(Vector3 position, Vector3 rotation, Vector3 scale)
```
Renders the scaleform movie in 3D space with additive blending.

#### Dispose
```csharp
public void Dispose()
```
Releases the scaleform movie handle, marking it as no longer needed.

---

## Lua Scaleform Class

The Lua `Scaleform` class provides equivalent functionality for Lua resources.

### Factory Methods

#### Scaleform.Request
```lua
function Scaleform.Request(Name)
```
Creates a new scaleform instance using `RequestScaleformMovie`.

#### Scaleform.RequestWidescreen
```lua
function Scaleform.RequestWidescreen(Name)
```
Creates a new scaleform instance using `RequestScaleformMovieInstance`.

### Properties

| Property | Type | Access | Description |
| :--- | :--- | :--- | :--- |
| `handle` | `number` | Read-only | The internal handle of the scaleform movie. |

### Methods

#### CallFunction
```lua
function Scaleform:CallFunction(theFunction, ...)
```
Calls a function on the scaleform movie with the specified arguments.

#### CallFunctionAsyncReturnInt
```lua
function Scaleform:CallFunctionAsyncReturnInt(theFunction, ...)
```
Calls a function and awaits the returned integer value.

#### CallFunctionAsyncReturnBool
```lua
function Scaleform:CallFunctionAsyncReturnBool(theFunction, ...)
```
Calls a function and awaits the returned boolean value.

#### CallFunctionAsyncReturnString
```lua
function Scaleform:CallFunctionAsyncReturnString(theFunction, ...)
```
Calls a function and awaits the returned string value.

#### Render2D
```lua
function Scaleform:Render2D()
```
Renders the scaleform movie fullscreen.

#### Render2DNormal
```lua
function Scaleform:Render2DNormal(x, y, width, height)
```
Renders the scaleform movie in a rectangle using normalised coordinates.

#### Render2DScreenSpace
```lua
function Scaleform:Render2DScreenSpace(locx, locy, sizex, sizey)
```
Renders the scaleform movie in screen space coordinates.

#### Render3D
```lua
function Scaleform:Render3D(x, y, z, rx, ry, rz, scalex, scaley, scalez)
```
Renders the scaleform movie in 3D space.

#### Render3DAdditive
```lua
function Scaleform:Render3DAdditive(x, y, z, rx, ry, rz, scalex, scaley, scalez)
```
Renders the scaleform movie in 3D space with additive blending.

#### Dispose
```lua
function Scaleform:Dispose()
```
Releases the scaleform movie handle.

#### IsValid
```lua
function Scaleform:IsValid()
```
Returns true if the scaleform instance is valid.

#### IsLoaded
```lua
function Scaleform:IsLoaded()
```
Returns true if the scaleform movie has loaded.

---

## Supported Argument Types

When calling functions on scaleforms, arguments are automatically converted to native scaleform parameters.

| C# Type | Lua Type | Native Scaleform Call | Notes |
| :--- | :--- | :--- | :--- |
| `int` | `number` (integer) | `PushScaleformMovieMethodParameterInt` | Pushes an integer. |
| `float` / `double` | `number` (float) | `PushScaleformMovieMethodParameterFloat` | Pushes a floating-point number. |
| `bool` | `boolean` | `PushScaleformMovieMethodParameterBool` | Pushes a boolean. |
| `string` / `char` | `string` | `PushScaleformMovieMethodParameterString` / `ScaleformMovieMethodAddParamTextureNameString` | Pushes a string. |
| `string` (starts with `b_` or `t_`) | `string` (starts with `b_` or `t_`) | `ScaleformMovieMethodAddParamPlayerNameString` | Pushes a player name or texture string. |
| `string` (starts with `menu_`, etc.) | `string` (starts with `menu_`, etc.) | `BeginTextCommandScaleformString` + `EndTextCommandScaleformString_2` | Pushes a text command string (Lua only). |
| `ScaleformLabel` | `table` (type: `"label"`) | `BeginTextCommandScaleformString` + `EndTextCommandScaleformString` | Pushes a localised text label. |
| `ScaleformLiteralString` | `table` (type: `"literal"`) | `ScaleformMovieMethodAddParamTextureNameString_2` | Pushes a literal texture name string. |
| `SColor` | `table` (SColor) | `PushScaleformMovieMethodParameterInt` | Pushes the ARGB integer value of the colour. |

---

## Usage Examples

### C# Example

```csharp
using CitizenFX.Core;
using ScaleformUI.Scaleforms;
using System.Threading.Tasks;

public class ScaleformTest : BaseScript
{
    private ScaleformWideScreen _myScaleform;

    public ScaleformTest()
    {
        Tick += OnTick;
    }

    private async Task OnTick()
    {
        if (_myScaleform == null)
        {
            _myScaleform = new ScaleformWideScreen("MP_BIG_MESSAGE_FREEMODE");
        }

        if (!_myScaleform.IsLoaded)
        {
            await Delay(0);
            return;
        }

        // Call a function on the scaleform
        _myScaleform.CallFunction("SHOW_CENTERED_MP_MESSAGE", "TEST TITLE", "Test Subtitle", 100, true);

        // Render the scaleform fullscreen
        _myScaleform.Render2D();
    }
}
```

### Lua Example

```lua
local myScaleform = nil

Citizen.CreateThread(function()
    myScaleform = Scaleform.RequestWidescreen("MP_BIG_MESSAGE_FREEMODE")
    
    while not myScaleform:IsLoaded() do
        Citizen.Wait(0)
    end

    -- Call a function on the scaleform
    myScaleform:CallFunction("SHOW_CENTERED_MP_MESSAGE", "TEST TITLE", "Test Subtitle", 100, true)

    while true do
        Citizen.Wait(0)
        -- Render the scaleform fullscreen
        myScaleform:Render2D()
    end
end)
```
