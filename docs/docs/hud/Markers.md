---
layout: default
title: Markers
parent: Notifications
show_buttons: true
show_all_code: false
---

# Markers

![image](https://user-images.githubusercontent.com/4005518/162584296-72fb5a66-49af-42e6-92b6-55e7ee726b5b.png)

Markers are 3D visual indicators drawn in the game world. They guide players to specific locations, highlight interaction points, or mark boundaries.

---

## C# API Reference

### Marker Class

#### Constructors
* **Standard Constructor**
  ```csharp
  public Marker(
      MarkerType type, 
      Vector3 position, 
      float distance, 
      SColor color, 
      bool placeOnGround = false, 
      bool bobUpDown = false, 
      bool rotate = false, 
      bool faceCamera = false
  )
  ```
* **Scaled Constructor**
  ```csharp
  public Marker(
      MarkerType type, 
      Vector3 position, 
      Vector3 scale, 
      float distance, 
      SColor color, 
      bool placeOnGround = false, 
      bool bobUpDown = false, 
      bool rotate = false, 
      bool faceCamera = false
  )
  ```

#### Properties
* **MarkerType** (`MarkerType`): The visual shape of the marker.
* **Position** (`Vector3`): The world coordinates where the marker is drawn.
* **Scale** (`Vector3`): The dimensions (width, depth, height) of the marker. Defaults to `(1.5, 1.5, 1.5)`.
* **Distance** (`float`): The maximum distance from the player at which the marker is rendered. Capped at `250.0f`.
* **Color** (`SColor`): The RGBA color of the marker.
* **Direction** (`Vector3`): The direction vector of the marker. Defaults to `Vector3.Zero`.
* **Rotation** (`Vector3`): The rotation vector of the marker. Defaults to `Vector3.Zero`.
* **PlaceOnGround** (`bool`): If `true`, automatically adjusts the Z coordinate to match the ground height.
* **BobUpDown** (`bool`): If `true`, the marker bounces up and down.
* **Rotate** (`bool`): If `true`, the marker rotates around its Z axis.
* **FaceCamera** (`bool`): If `true`, the marker rotates to face the player camera.
* **IsInMarker** (`bool`): Returns `true` if the player ped is currently inside the marker boundaries.
* **IsInRange** (`bool`): Returns `true` if the player ped is within the specified `Distance` of the marker.
* **CheckZ** (`bool`): If `true`, includes the Z axis when calculating if the player is inside the marker.

#### Methods
* **Draw**
  Renders the marker in the world and updates the `IsInMarker` status.
  ```csharp
  public void Draw()
  ```

---

### MarkersHandler Class

The `MarkersHandler` manages a collection of markers, automatically rendering those that are within range of the player.

#### Methods
* **AddMarker**
  Adds a marker to the global handler list.
  ```csharp
  public static void AddMarker(Marker marker)
  ```
* **RemoveMarker**
  Removes a marker from the global handler list.
  ```csharp
  public static void RemoveMarker(Marker marker)
  ```

---

### MarkerType Enum

Defines the visual shape of the marker.

```csharp
public enum MarkerType
{
    UpsideDownCone = 0,
    VerticalCylinder = 1,
    ThickChevronUp = 2,
    ThinChevronUp = 3,
    CheckeredFlagRect = 4,
    CheckeredFlagCircle = 5,
    VerticleCircle = 6,
    PlaneModel = 7,
    LostMCTransparent = 8,
    LostMC = 9,
    Number0 = 10,
    Number1 = 11,
    Number2 = 12,
    Number3 = 13,
    Number4 = 14,
    Number5 = 15,
    Number6 = 16,
    Number7 = 17,
    Number8 = 18,
    Number9 = 19,
    ChevronUpx1 = 20,
    ChevronUpx2 = 21,
    ChevronUpx3 = 22,
    HorizontalCircleFat = 23,
    ReplayIcon = 24,
    HorizontalCircleSkinny = 25,
    HorizontalCircleSkinnyArrow = 26,
    HorizontalSplitArrowCircle = 27,
    DebugSphere = 28,
    DollarSign = 29,
    HorizontalBars = 30,
    WolfHead = 31,
    QuestionMark = 32,
    PlaneSymbol = 33,
    HelicopterSymbol = 34,
    BoatSymbol = 35,
    CarSymbol = 36,
    MotorcycleSymbol = 37,
    BicycleSymbol = 38,
    TruckSymbol = 39,
    ParachuteSymbol = 40,
    JetpackSymbol = 41,
    SawbladeSymbol = 42,
    VerticalRectangle = 43
}
```

---

## Lua API Reference

### Marker Class

#### Constructor
```lua
Marker.New(type, position, scale, distance, color, placeOnGround, bobUpDown, rotate, faceCamera, checkZ)
```
* `type` (`MarkerType`): The shape of the marker.
* `position` (`vector3`): The world coordinates.
* `scale` (`vector3`): The dimensions.
* `distance` (`number`): The maximum render distance.
* `color` (`table`): The color table `{ R = r, G = g, B = b, A = a }`.
* `placeOnGround` (`boolean`): Adjusts Z coordinate to ground level.
* `bobUpDown` (`boolean`): Bounces up and down.
* `rotate` (`boolean`): Rotates around Z axis.
* `faceCamera` (`boolean`): Faces the camera.
* `checkZ` (`boolean`): Includes Z axis in range checks.

#### Properties
* **Type** (`MarkerType`)
* **Position** (`vector3`)
* **Scale** (`vector3`)
* **Direction** (`vector3`)
* **Rotation** (`vector3`)
* **Distance** (`number`)
* **Color** (`table`)
* **PlaceOnGround** (`boolean`)
* **BobUpDown** (`boolean`)
* **Rotate** (`boolean`)
* **FaceCamera** (`boolean`)
* **IsInMarker** (`boolean`)
* **CheckZ** (`boolean`)

#### Methods
* **Draw**
  Renders the marker.
  ```lua
  marker:Draw()
  ```
* **IsInRange**
  Returns `true` if the player is within range.
  ```lua
  marker:IsInRange()
  ```
* **SetColor**
  Updates the marker color.
  ```lua
  marker:SetColor(color)
  ```

---

## Runnable Examples

### C# Example

This example shows how to create a marker, register it with the handler, and check if the player is inside it.

```csharp
using System;
using System.Threading.Tasks;
using CitizenFX.Core;
using ScaleformUI;
using ScaleformUI.Elements;

public class MarkerDemo : BaseScript
{
    private Marker interactionMarker;

    public MarkerDemo()
    {
        Vector3 markerPos = new Vector3(-1037.0f, -2737.0f, 20.0f);
        SColor markerColor = SColor.Cyan;

        // Create a vertical cylinder marker
        interactionMarker = new Marker(
            MarkerType.VerticalCylinder, 
            markerPos, 
            new Vector3(1.5f, 1.5f, 1.0f), 
            50.0f, 
            markerColor, 
            true, 
            false, 
            false, 
            false
        );

        // Add to the handler for automatic rendering
        MarkersHandler.AddMarker(interactionMarker);

        Tick += OnTick;
    }

    private async Task OnTick()
    {
        if (interactionMarker.IsInMarker)
        {
            Notifications.DrawText(0.5f, 0.8f, "Press ~INPUT_CONTEXT~ to interact.");
            if (Game.IsControlJustPressed(0, Control.Context))
            {
                Debug.WriteLine("Player interacted with the marker.");
            }
        }
        await Task.FromResult(0);
    }
}
```

### Lua Example

This example shows how to create and draw a marker manually in a thread.

```lua
Citizen.CreateThread(function()
    local markerPos = vector3(-1037.0, -2737.0, 20.0)
    local markerColor = { R = 0, G = 255, B = 255, A = 150 }
    
    local myMarker = Marker.New(
        1, -- VerticalCylinder
        markerPos, 
        vector3(1.5, 1.5, 1.0), 
        50.0, 
        markerColor, 
        true, 
        false, 
        false, 
        false, 
        true
    )

    while true do
        Citizen.Wait(0)
        myMarker:Draw()

        if myMarker.IsInMarker then
            BeginTextCommandDisplayHelp("STRING")
            AddTextComponentSubstringPlayerName("Press ~INPUT_CONTEXT~ to interact.")
            EndTextCommandDisplayHelp(0, false, true, -1)

            if IsControlJustPressed(0, 51) then
                print("Player interacted with the marker.")
            end
        end
    end
end)
```
