---
layout: default
title: Multiplayer Chat
parent: Scaleforms API
show_buttons: true
show_all_code: false
---

# Multiplayer Chat

The Multiplayer Chat scaleform provides a customisable chat interface similar to the GTA Online multiplayer chat. It supports different chat scopes, player colours, and message history scrolling.

---

## Enums

### ChatScope

Defines the scope or channel of a chat message.

* **C#**: `ScaleformUI.Scaleforms.ChatScope`
* **Lua**: `ChatScope`

| Value | Name | Description |
|---|---|---|
| `0` | `Global` | Global chat channel visible to all players. |
| `1` | `Team` | Team-only chat channel. |
| `2` | `All` | Alternative channel for all players. |
| `3` | `Clan` | Crew or clan chat channel. |

### ChatVisibility / ChatVisible

Defines the visibility state of the chat interface.

* **C#**: `ScaleformUI.Scaleforms.ChatVisibility`
* **Lua**: `ChatVisible`

| Value | Name | Description |
|---|---|---|
| `0` | `Hidden` | The chat interface is completely hidden. |
| `1` | `Default` | The chat interface is visible but not active for typing. |
| `2` | `Typing` | The chat interface is active and accepting text input. |

---

## MultiplayerChatHandler (C#)

The handler class for managing the multiplayer chat scaleform in C#.

### Methods

#### Load
```csharp
public async Task Load()
```
Loads the `MULTIPLAYER_CHAT` scaleform. This method is awaitable.

#### SetFocus
```csharp
public void SetFocus(ChatVisibility visibility, ChatScope scope = ChatScope.Global, string scopeText = "All", string playerName = "", HudColor color = HudColor.HUD_COLOUR_PURE_WHITE)
```
Sets the visibility state and focus parameters of the chat.

#### AddMessage
```csharp
public void AddMessage(string playerName, string message, ChatScope scope, bool teamOnly, HudColor color)
```
Adds a message to the chat history.

#### Close
```csharp
public void Close()
```
Closes the chat interface and resets the typing state.

#### Show
```csharp
public void Show()
```
Shows the chat interface in the default visibility state.

#### StartTyping
```csharp
public void StartTyping()
```
Activates the chat interface for typing.

#### Hide
```csharp
public void Hide()
```
Hides the chat interface.

#### Reset
```csharp
public void Reset()
```
Clears all messages and resets the chat scaleform.

#### PageUp
```csharp
public void PageUp()
```
Scrolls the chat history up. Only works when typing.

#### PageDown
```csharp
public void PageDown()
```
Scrolls the chat history down. Only works when typing.

#### DeleteText
```csharp
public void DeleteText()
```
Deletes the last character in the input field. Only works when typing.

#### AddText
```csharp
public void AddText(string text)
```
Appends text to the input field. Only works when typing.

#### CompleteText
```csharp
public void CompleteText()
```
Completes the text input and adds the message locally. Only works when typing.

#### AbortText
```csharp
public void AbortText()
```
Aborts the current text input. Only works when typing.

#### IsTyping
```csharp
public bool IsTyping()
```
Returns whether the player is currently typing in the chat.

#### SetDuration
```csharp
public void SetDuration(int duration)
```
Sets the duration in milliseconds that the chat remains visible after a message is received.

#### Update
```csharp
public void Update()
```
Renders the chat scaleform and handles the visibility timeout. Call this in a tick loop.

---

## MultiplayerChat (Lua)

The class for managing the multiplayer chat scaleform in Lua.

### Constructor

#### MultiplayerChat.New
```lua
MultiplayerChat.New()
```
Creates a new multiplayer chat instance.

### Methods

#### Load
```lua
MultiplayerChat:Load()
```
Loads the `MULTIPLAYER_CHAT` scaleform. Returns a promise.

#### SetFocus
```lua
MultiplayerChat:SetFocus(visibleState, scopeType, scopeText, playerName, colour)
```
Sets the visibility state and focus parameters of the chat.

#### Show
```lua
MultiplayerChat:Show()
```
Shows the chat interface in the default visibility state.

#### StartTyping
```lua
MultiplayerChat:StartTyping(scopeType, scopeText)
```
Activates the chat interface for typing.

#### PageUp
```lua
MultiplayerChat:PageUp()
```
Scrolls the chat history up.

#### PageDown
```lua
MultiplayerChat:PageDown()
```
Scrolls the chat history down.

#### DeleteText
```lua
MultiplayerChat:DeleteText()
```
Deletes the last character in the input field.

#### SetTypingDone
```lua
MultiplayerChat:SetTypingDone()
```
Resets the typing state.

#### AddMessage
```lua
MultiplayerChat:AddMessage(playerName, message, scope, teamOnly, playerColour)
```
Adds a message to the chat history.

#### AddText
```lua
MultiplayerChat:AddText(text)
```
Appends text to the input field. You can pass `"ENTER"`, `"BACKSPACE"`, or `"ESCAPE"` to trigger corresponding actions.

#### Close
```lua
MultiplayerChat:Close()
```
Closes the chat interface.

#### CompleteText
```lua
MultiplayerChat:CompleteText()
```
Completes the text input and adds the message locally.

#### AbortText
```lua
MultiplayerChat:AbortText()
```
Aborts the current text input.

#### Reset
```lua
MultiplayerChat:Reset()
```
Clears all messages and resets the chat scaleform.

#### IsEnabled
```lua
MultiplayerChat:IsEnabled()
```
Returns whether the chat interface is currently active or visible.

#### IsTyping
```lua
MultiplayerChat:IsTyping()
```
Returns whether the player is currently typing in the chat.

#### Update
```lua
MultiplayerChat:Update()
```
Renders the chat scaleform and handles the visibility timeout. Call this in a thread loop.

#### Dispose
```lua
MultiplayerChat:Dispose()
```
Disposes the chat scaleform.

---

## Examples

### C# Example

This example demonstrates how to load the multiplayer chat, add messages, and handle input to toggle typing mode.

```csharp
using System;
using System.Threading.Tasks;
using CitizenFX.Core;
using CitizenFX.Core.Native;
using ScaleformUI.Scaleforms;

public class ChatTest : BaseScript
{
    private MultiplayerChatHandler _chat;

    public ChatTest()
    {
        _chat = new MultiplayerChatHandler();
        Tick += OnTick;
    }

    private async Task OnTick()
    {
        if (_chat == null) return;

        // Load the scaleform if it's not loaded yet
        await _chat.Load();

        // Render the chat scaleform every frame
        _chat.Update();

        // Press T to start typing
        if (API.IsControlJustPressed(0, 245)) // INPUT_MP_TEXT_CHAT_ALL
        {
            if (!_chat.IsTyping())
            {
                _chat.StartTyping();
                _chat.SetFocus(ChatVisibility.Typing, ChatScope.Global, "All", Game.Player.Name, HudColor.HUD_COLOUR_BLUE);
            }
        }

        // Press ESC to close chat if typing
        if (_chat.IsTyping() && API.IsControlJustPressed(0, 200)) // INPUT_FRONTEND_PAUSE_ALTERNATE
        {
            _chat.AbortText();
            _chat.Close();
        }

        // Example command to add a test message
        if (API.IsControlJustPressed(0, 38)) // INPUT_CONTEXT
        {
            _chat.AddMessage("System", "Welcome to the server!", ChatScope.Global, false, HudColor.HUD_COLOUR_GOLD);
        }
    }
}
```

### Lua Example

This example demonstrates how to load the multiplayer chat, add messages, and handle input to toggle typing mode in Lua.

```lua
local chat = MultiplayerChat.New()

Citizen.CreateThread(function()
    -- Load the scaleform
    chat:Load()

    while true do
        Citizen.Wait(0)

        -- Render the chat scaleform every frame
        chat:Update()

        -- Press T to start typing
        if IsControlJustPressed(0, 245) then -- INPUT_MP_TEXT_CHAT_ALL
            if not chat:IsTyping() then
                chat:StartTyping(ChatScope.Global, "All")
            end
        end

        -- Press ESC to close chat if typing
        if chat:IsTyping() and IsControlJustPressed(0, 200) then -- INPUT_FRONTEND_PAUSE_ALTERNATE
            chat:AbortText()
            chat:Close()
        end

        -- Example key press (E) to add a test message
        if IsControlJustPressed(0, 38) then -- INPUT_CONTEXT
            chat:AddMessage("System", "Welcome to the server!", ChatScope.Global, false, HudColours.HUD_COLOUR_GOLD)
        end
    end
end)
```
