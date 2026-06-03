---
layout: default
title: Timer Bars
show_buttons: false
show_all_code: true
---

# Timer Bars

Timer bars provide a visual way to display progress, countdowns, or text information at the bottom right of the screen. They're commonly used in GTA Online missions to show remaining time, player scores, or objective progress.

---

## TimerBarPool

The `TimerBarPool` class manages and renders a collection of timer bars. It handles the layout and positioning of multiple bars automatically.

### C# API Reference

#### Properties
* `int Count`: Returns the number of timer bars in the pool.
* `List<TimerBarBase> ToList`: Returns the list of timer bars in the pool.

#### Methods
* `void Add(TimerBarBase timer)`: Adds a timer bar to the pool.
* `void Remove(TimerBarBase timer)`: Removes a timer bar from the pool.
* `void Draw()`: Renders all timer bars in the pool. Call this in a tick loop.

### Lua API Reference

#### Constructor
* `TimerBarPool.New()`: Creates a new timer bar pool instance.

#### Fields
* `table Bars`: A table containing the active timer bars.

#### Methods
* `TimerBarPool:AddBar(timerBar)`: Adds a timer bar to the pool.
* `TimerBarPool:RemoveBar(timerBar)`: Removes a timer bar from the pool.
* `TimerBarPool:Draw()`: Renders all timer bars in the pool. Call this in a tick loop.

---

## TimerBarBase

TimerBarBase is the abstract base class for all timer bars. It handles the rendering of the label and the background sprite.

### C# API Reference

#### Properties
* `string Label`: The text label displayed on the left side of the timer bar.
* `Font LabelFont`: The font used for the label.

#### Constructor
* `TimerBarBase(string label, Font font = Font.ChaletLondon)`: Initialises a new timer bar base with a label and optional font.

#### Methods
* `virtual void Draw(int interval)`: Renders the timer bar background and label.

---

## TextTimerBar

TextTimerBar displays a text caption on the right side.

### C# API Reference

#### Properties
* `string Caption`: The text caption displayed on the right side.
* `SColor CaptionColor`: The colour of the caption text.
* `Font CaptionFont`: The font used for the caption text.
* `bool Enabled`: Controls whether the timer bar is rendered.

#### Constructors
* `TextTimerBar(string label, string text)`: Initialises with a label and caption text.
* `TextTimerBar(string label, string text, Font labelFont)`: Initialises with a label, caption text, and label font.
* `TextTimerBar(string label, string text, Font labelFont, Font captionFont)`: Initialises with a label, caption text, label font, and caption font.
* `TextTimerBar(string label, string text, Color captionColor)`: Initialises with a label, caption text, and caption colour.
* `TextTimerBar(string label, string text, Color captionColor, Font labelFont)`: Initialises with a label, caption text, caption colour, and label font.
* `TextTimerBar(string label, string text, Color captionColor, Font labelFont, Font captionFont)`: Initialises with a label, caption text, caption colour, label font, and caption font.

### Lua API Reference

#### Constructor
* `TextTimerBar.New(label, text, captionColor)`: Creates a new text timer bar. `captionColor` defaults to `{ R = 240, G = 240, B = 240, A = 255 }`.

#### Methods (Getters / Setters)
* `TextTimerBar:Label(label)`: Gets or sets the label text.
* `TextTimerBar:Caption(caption)`: Gets or sets the caption text.
* `TextTimerBar:LabelFont(font)`: Gets or sets the label font.
* `TextTimerBar:CaptionFont(font)`: Gets or sets the caption font.
* `TextTimerBar:Color(color)`: Gets or sets the caption colour.
* `TextTimerBar:Enabled(bool)`: Gets or sets whether the bar is enabled.

---

## ProgressTimerBar

ProgressTimerBar displays a progress bar on the right side.

### C# API Reference

#### Properties
* `float Percentage`: The progress percentage, from `0.0` to `1.0`.
* `SColor BackgroundColor`: The background colour of the progress bar.
* `SColor ForegroundColor`: The foreground colour of the progress bar.

#### Constructors
* `ProgressTimerBar(string label)`: Initialises with a label. Background colour defaults to dark red, foreground to red.
* `ProgressTimerBar(string label, Font labelFont)`: Initialises with a label and label font.
* `ProgressTimerBar(string label, Color background, Color foreground)`: Initialises with a label, background colour, and foreground colour.
* `ProgressTimerBar(string label, Color background, Color foreground, Font labelFont)`: Initialises with a label, background colour, foreground colour, and label font.

### Lua API Reference

#### Constructor
* `ProgressTimerBar.New(label, backgroundColor, foregroundColor, percentage, time)`: Creates a new progress timer bar.
  * `backgroundColor` defaults to `{ R = 112, G = 25, B = 25, A = 255 }`.
  * `foregroundColor` defaults to `{ R = 224, G = 50, B = 50, A = 255 }`.
  * `percentage` defaults to `0`.
  * `time` defaults to `0`. If it's greater than `0`, the percentage decreases automatically over time.

#### Methods (Getters / Setters)
* `ProgressTimerBar:Label(label)`: Gets or sets the label text.
* `ProgressTimerBar:LabelFont(font)`: Gets or sets the label font.
* `ProgressTimerBar:BackgroundColor(color)`: Gets or sets the background colour.
* `ProgressTimerBar:ForegroundColor(color)`: Gets or sets the foreground colour.
* `ProgressTimerBar:Percentage(val)`: Gets or sets the progress percentage.
* `ProgressTimerBar:Time()`: Gets the start game timer value.
* `ProgressTimerBar:Enabled(bool)`: Gets or sets whether the bar is enabled.

---

## Examples

### C# Example

This example demonstrates how to create a timer bar pool, add text and progress timer bars, and render them inside a tick loop.

```csharp
using System;
using System.Drawing;
using System.Threading.Tasks;
using CitizenFX.Core;
using ScaleformUI;

public class TimerBarTest : BaseScript
{
    private TimerBarPool _pool;
    private TextTimerBar _textBar;
    private ProgressTimerBar _progressBar;

    public TimerBarTest()
    {
        _pool = new TimerBarPool();

        _textBar = new TextTimerBar("INFO", "WAITING", Color.FromArgb(255, 240, 240, 240));
        _progressBar = new ProgressTimerBar("PROGRESS", Color.FromArgb(255, 112, 25, 25), Color.FromArgb(255, 224, 50, 50));

        _pool.Add(_textBar);
        _pool.Add(_progressBar);

        Tick += OnTick;
    }

    private async Task OnTick()
    {
        // Update progress bar percentage dynamically
        float gameTimeSec = Game.GameTime / 1000f;
        _progressBar.Percentage = (gameTimeSec % 10f) / 10f;

        // Update text bar caption based on progress
        if (_progressBar.Percentage > 0.8f)
        {
            _textBar.Caption = "NEARLY DONE";
            _textBar.CaptionColor = SColor.HUD_Red;
        }
        else
        {
            _textBar.Caption = "IN PROGRESS";
            _textBar.CaptionColor = SColor.White;
        }

        _pool.Draw();
        await Task.FromResult(0);
    }
}
```

### Lua Example

This example demonstrates how to create a timer bar pool, add text and progress timer bars, and render them inside a thread loop.

```lua
local pool = TimerBarPool.New()

local textBar = TextTimerBar.New("INFO", "WAITING", { R = 240, G = 240, B = 240, A = 255 })
local progressBar = ProgressTimerBar.New("PROGRESS", { R = 112, G = 25, B = 25, A = 255 }, { R = 224, G = 50, B = 50, A = 255 }, 0.0, 0)

pool:AddBar(textBar)
pool:AddBar(progressBar)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)

        -- Update progress bar percentage dynamically
        local gameTimeSec = GetGameTimer() / 1000.0
        local progress = (gameTimeSec % 10.0) / 10.0
        progressBar:Percentage(progress)

        -- Update text bar caption based on progress
        if progress > 0.8 then
            textBar:Caption("NEARLY DONE")
            textBar:Color({ R = 224, G = 50, B = 50, A = 255 })
        else
            textBar:Caption("IN PROGRESS")
            textBar:Color({ R = 240, G = 240, B = 240, A = 255 })
        end

        pool:Draw()
    end
end)
```
