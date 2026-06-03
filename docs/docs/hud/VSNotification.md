---
layout: default
title: VS Notification
parent: Notifications
show_buttons: true
show_all_code: false
---

# VS Notification

![image](https://user-images.githubusercontent.com/4005518/162587714-73608b0e-62a3-404d-a888-521ac70e53a6.png)

The VS (Versus) Notification displays a competitive head-to-head banner. It shows two player mugshots, their respective scores, and custom background colors.

---

## C# API Reference

### Accessor
```csharp
ScaleformUI.Notifications
```

### Methods
* **ShowVSNotification (Player vs Ped)**
  Displays a versus notification comparing the current player ped and another ped.
  ```csharp
  public static async Task<ScaleformUINotification> ShowVSNotification(
      int leftScore, 
      HudColor leftColor, 
      Ped rightPed, 
      int rightScore, 
      HudColor rightColor
  )
  ```
* **ShowVSNotification (Ped vs Ped)**
  Displays a versus notification comparing two arbitrary peds.
  ```csharp
  public static async Task<ScaleformUINotification> ShowVSNotification(
      Ped leftPed, 
      int leftScore, 
      HudColor leftColor, 
      Ped rightPed, 
      int rightScore, 
      HudColor rightColor
  )
  ```

### ScaleformUINotification Wrapper Class

This class wraps the active notification handle, allowing you to manage its lifecycle.

#### Methods
* **Hide**
  Removes the notification from the screen immediately.
  ```csharp
  public void Hide()
  ```

---

## Lua API Reference

### Accessor
```lua
Notifications
```

### Methods
* **ShowVSNotification**
  Displays a versus notification between two peds.
  ```lua
  Notifications:ShowVSNotification(leftPed, leftScore, leftColor, rightPed, rightScore, rightColor)
  ```
* **Hide**
  Removes the active notification from the screen.
  ```lua
  Notifications:Hide()
  ```

---

## Reference Catalogs

### NotificationChar Catalog

The following texture dictionary names are available for advanced notifications:

| Key | Texture Dictionary |
| :--- | :--- |
| `Abigail` | `CHAR_ABIGAIL` |
| `Amanda` | `CHAR_AMANDA` |
| `Ammunation` | `CHAR_AMMUNATION` |
| `Andreas` | `CHAR_ANDREAS` |
| `Antonia` | `CHAR_ANTONIA` |
| `Ashley` | `CHAR_ASHLEY` |
| `BankOfLiberty` | `CHAR_BANK_BOL` |
| `BankFleeca` | `CHAR_BANK_FLEECA` |
| `BankMaze` | `CHAR_BANK_MAZE` |
| `Barry` | `CHAR_BARRY` |
| `Beverly` | `CHAR_BEVERLY` |
| `BikeSite` | `CHAR_BIKESITE` |
| `BlankEntry` | `CHAR_BLANK_ENTRY` |
| `Blimp` | `CHAR_BLIMP` |
| `Blocked` | `CHAR_BLOCKED` |
| `BoatSite` | `CHAR_BOATSITE` |
| `BrokenDownGirl` | `CHAR_BROKEN_DOWN_GIRL` |
| `BugStars` | `CHAR_BUGSTARS` |
| `Call911` | `CHAR_CALL911` |
| `LegendaryMotorsport` | `CHAR_CARSITE` |
| `SSASuperAutos` | `CHAR_CARSITE2` |
| `Castro` | `CHAR_CASTRO` |
| `ChatCall` | `CHAR_CHAT_CALL` |
| `Chef` | `CHAR_CHEF` |
| `Cheng` | `CHAR_CHENG` |
| `ChengSenior` | `CHAR_CHENGSR` |
| `Chop` | `CHAR_CHOP` |
| `Cris` | `CHAR_CRIS` |
| `Dave` | `CHAR_DAVE` |
| `Default` | `CHAR_DEFAULT` |
| `Denise` | `CHAR_DENISE` |
| `DetonateBomb` | `CHAR_DETONATEBOMB` |
| `DetonatePhone` | `CHAR_DETONATEPHONE` |
| `Devin` | `CHAR_DEVIN` |
| `SubMarine` | `CHAR_DIAL_A_SUB` |
| `Dom` | `CHAR_DOM` |
| `DomesticGirl` | `CHAR_DOMESTIC_GIRL` |
| `Dreyfuss` | `CHAR_DREYFUSS` |
| `DrFriedlander` | `CHAR_DR_FRIEDLANDER` |
| `Epsilon` | `CHAR_EPSILON` |
| `EstateAgent` | `CHAR_ESTATE_AGENT` |
| `Facebook` | `CHAR_FACEBOOK` |
| `FilmNoire` | `CHAR_FILMNOIR` |
| `Floyd` | `CHAR_FLOYD` |
| `Franklin` | `CHAR_FRANKLIN` |
| `FranklinTrevor` | `CHAR_FRANK_TREV_CONF` |
| `GayMilitary` | `CHAR_GAYMILITARY` |
| `Hao` | `CHAR_HAO` |
| `HitcherGirl` | `CHAR_HITCHER_GIRL` |
| `Hunter` | `CHAR_HUNTER` |
| `Jimmy` | `CHAR_JIMMY` |
| `JimmyBoston` | `CHAR_JIMMY_BOSTON` |
| `Joe` | `CHAR_JOE` |
| `Josef` | `CHAR_JOSEF` |
| `Josh` | `CHAR_JOSH` |
| `LamarDog` | `CHAR_LAMAR` |
| `Lester` | `CHAR_LESTER` |
| `Skull` | `CHAR_LESTER_DEATHWISH` |
| `LesterFranklin` | `CHAR_LEST_FRANK_CONF` |
| `LesterMichael` | `CHAR_LEST_MIKE_CONF` |
| `LifeInvader` | `CHAR_LIFEINVADER` |
| `LsCustoms` | `CHAR_LS_CUSTOMS` |
| `LSTI` | `CHAR_LS_TOURIST_BOARD` |
| `Manuel` | `CHAR_MANUEL` |
| `Marnie` | `CHAR_MARNIE` |
| `Martin` | `CHAR_MARTIN` |
| `MaryAnn` | `CHAR_MARY_ANN` |
| `Maude` | `CHAR_MAUDE` |
| `Mechanic` | `CHAR_MECHANIC` |
| `Michael` | `CHAR_MICHAEL` |
| `MichaelFranklin` | `CHAR_MIKE_FRANK_CONF` |
| `MichaelTrevor` | `CHAR_MIKE_TREV_CONF` |
| `WarStock` | `CHAR_MILSITE` |
| `Minotaur` | `CHAR_MINOTAUR` |
| `Molly` | `CHAR_MOLLY` |
| `MorsMutual` | `CHAR_MP_MORS_MUTUAL` |
| `ArmyContact` | `CHAR_MP_ARMY_CONTACT` |
| `Brucie` | `CHAR_MP_BRUCIE` |
| `FibContact` | `CHAR_MP_FIB_CONTACT` |
| `RockStarLogo` | `CHAR_MP_FM_CONTACT` |
| `Gerald` | `CHAR_MP_GERALD` |
| `Julio` | `CHAR_MP_JULIO` |
| `MechanicChinese` | `CHAR_MP_MECHANIC` |
| `MerryWeather` | `CHAR_MP_MERRYWEATHER` |
| `Unicorn` | `CHAR_MP_STRIPCLUB_PR` |
| `Mom` | `CHAR_MRS_THORNHILL` |
| `MrsThornhill` | `CHAR_MRS_THORNHILL` |
| `PatriciaTrevor` | `CHAR_PATRICIA` |
| `PegasusDelivery` | `CHAR_PEGASUS_DELIVERY` |
| `ElitasTravel` | `CHAR_PLANESITE` |
| `Sasquatch` | `CHAR_SASQUATCH` |
| `Simeon` | `CHAR_SIMEON` |
| `SocialClub` | `CHAR_SOCIAL_CLUB` |
| `Solomon` | `CHAR_SOLOMON` |
| `Taxi` | `CHAR_TAXI` |
| `Trevor` | `CHAR_TREVOR` |
| `YouTube` | `CHAR_YOUTUBE` |
| `Wade` | `CHAR_WADE` |

### HudColor Values

Commonly used HUD color indices:

| Enum Name | Value |
| :--- | :--- |
| `HUD_COLOUR_PURE_WHITE` | `0` |
| `HUD_COLOUR_WHITE` | `1` |
| `HUD_COLOUR_BLACK` | `2` |
| `HUD_COLOUR_GREY` | `3` |
| `HUD_COLOUR_RED` | `6` |
| `HUD_COLOUR_BLUE` | `9` |
| `HUD_COLOUR_YELLOW` | `12` |
| `HUD_COLOUR_ORANGE` | `15` |
| `HUD_COLOUR_GREEN` | `18` |
| `HUD_COLOUR_PURPLE` | `21` |
| `HUD_COLOUR_PINK` | `24` |

---

## Runnable Examples

### C# Example

This example shows how to trigger a VS notification when a player kills an opponent.

```csharp
using System;
using System.Threading.Tasks;
using CitizenFX.Core;
using ScaleformUI;
using ScaleformUI.Scaleforms;

public class PvPTracker : BaseScript
{
    private int playerScore = 0;
    private int opponentScore = 0;

    public PvPTracker()
    {
        Tick += OnTick;
    }

    private async Task OnTick()
    {
        // Press F6 to simulate a player kill
        if (Game.IsControlJustPressed(0, Control.SelectCharacterFranklin))
        {
            playerScore++;
            Ped opponent = Game.PlayerPed; // Using player ped as a placeholder opponent

            ScaleformUINotification vsNotification = await Notifications.ShowVSNotification(
                Game.PlayerPed, 
                playerScore, 
                HudColor.HUD_COLOUR_BLUE, 
                opponent, 
                opponentScore, 
                HudColor.HUD_COLOUR_RED
            );

            // Keep the notification on screen for 5 seconds, then hide it
            await Delay(5000);
            vsNotification.Hide();
        }
    }
}
```

### Lua Example

This example shows how to trigger a VS notification in Lua.

```lua
local playerScore = 0
local opponentScore = 0

RegisterCommand("testvs", function()
    playerScore = playerScore + 1
    local playerPed = PlayerPedId()
    local opponentPed = playerPed -- Using player ped as a placeholder opponent
    
    Notifications:ShowVSNotification(
        playerPed, 
        playerScore, 
        9, -- HUD_COLOUR_BLUE
        opponentPed, 
        opponentScore, 
        6 -- HUD_COLOUR_RED
    )
    
    -- Hide the notification after 5 seconds
    Citizen.CreateThread(function()
        Citizen.Wait(5000)
        Notifications:Hide()
    end)
end, false)
```
