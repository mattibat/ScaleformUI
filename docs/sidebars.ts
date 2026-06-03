import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'index',
    {
      type: 'category',
      label: 'Setup & Core Concepts',
      items: [
        'getting-started',
        'Architecture',
        'menuhandler',
        'breadcrumbshandler'
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        'Tutorials/HowTo-PauseMenu',
        'Tutorials/HowTo-LobbyMenu',
        'Tutorials/Radial-Menus',
        'Tutorials/Radio-Menus',
        'Tutorials/Side-Attached-Panels',
        'Tutorials/Heritage-Details-Windows',
        'Tutorials/Scaleform-Messages',
        'Tutorials/Notifications-HUD'
      ],
    },
    {
      type: 'category',
      label: 'UIMenu (Main Menu)',
      items: [
        'UIMenu/index',
        'UIMenu/Parameters',
        'UIMenu/Functions',
        'UIMenu/Events',
        {
          type: 'category',
          label: 'Items',
          items: [
            'UIMenu/Items/index',
            'UIMenu/Items/uimenuitem',
            'UIMenu/Items/uimenucheckboxitem',
            'UIMenu/Items/uimenulistitem',
            'UIMenu/Items/uimenudynamiclistitem',
            'UIMenu/Items/uimenuslideritem',
            'UIMenu/Items/uimenuprogressitem',
            'UIMenu/Items/uimenustatsitem',
            'UIMenu/Items/uimenuseparatoritem'
          ]
        },
        {
          type: 'category',
          label: 'Panels',
          items: [
            'UIMenu/Panels/index',
            'UIMenu/Panels/uimenucolorpanel',
            'UIMenu/Panels/uimenuvehiclecolourpickerpanel',
            'UIMenu/Panels/uimenugridpanel',
            'UIMenu/Panels/uimenupercentagepanel',
            'UIMenu/Panels/uimenustatisticspanel'
          ]
        },
        {
          type: 'category',
          label: 'Windows',
          items: [
            'UIMenu/Windows/index',
            'UIMenu/Windows/uimenuheritagewindow',
            'UIMenu/Windows/uimenudetailswindow'
          ]
        },
        {
          type: 'category',
          label: 'Side Panels',
          items: [
            'UIMenu/Side Panels/index',
            'UIMenu/Side Panels/uimenufreemodedetailsitem',
            'UIMenu/Side Panels/uimissiondetailspanel',
            'UIMenu/Side Panels/uivehiclecolourpickerpanel'
          ]
        }
      ],
    },
    {
      type: 'category',
      label: 'Specialized Menus',
      items: [
        {
          type: 'category',
          label: 'PauseMenu',
          items: [
            'PauseMenu/index',
            'PauseMenu/MainView',
            'PauseMenu/TabView',
            'PauseMenu/Items'
          ]
        },
        {
          type: 'category',
          label: 'RadialMenu',
          items: [
            'RadialMenu/index',
            'RadialMenu/radialsegment',
            'RadialMenu/segmentitem'
          ]
        },
        {
          type: 'category',
          label: 'RadioMenu',
          items: [
            'RadioMenu/index',
            'RadioMenu/radioitem'
          ]
        }
      ],
    },
    {
      type: 'category',
      label: 'Screen Elements',
      items: [
        {
          type: 'category',
          label: 'HUD & Notifications',
          items: [
            'hud/index',
            'hud/ShowNotifications',
            'hud/AdvancedNotification',
            'hud/HelpNotification',
            'hud/FloatingHelpNotification',
            'hud/StatsNotification',
            'hud/VSNotification',
            'hud/DrawText3D',
            'hud/Markers'
          ]
        },
        {
          type: 'category',
          label: 'Scaleforms',
          items: [
            'Scaleforms/index',
            'Scaleforms/BigMessage',
            'Scaleforms/MidsizeMessage',
            'Scaleforms/Instructionalbuttons',
            'Scaleforms/warningscreen',
            'Scaleforms/rankbar',
            'Scaleforms/MultiplayerChat',
            'Scaleforms/PlayerList',
            'Scaleforms/MissionSelector',
            'Scaleforms/Countdown',
            'Scaleforms/Feed',
            'Scaleforms/ScaleformWideScreen',
            'Scaleforms/MinimapOverlays'
          ]
        },
        {
          type: 'category',
          label: 'TimerBars',
          items: [
            'TimerBars/index'
          ]
        },
        {
          type: 'category',
          label: 'Elements',
          items: [
            'Elements/index'
          ]
        }
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        { type: 'autogenerated', dirName: 'Enums' }
      ],
    }
  ],
};

export default sidebars;
