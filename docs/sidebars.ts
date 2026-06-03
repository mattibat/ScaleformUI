import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // 1. Guides/Documentation Sidebar (contains Setup, UIMenu, PauseMenu, RadialMenu, RadioMenu, Screen Elements)
  docsSidebar: [
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
            'UIMenu/Windows/uimenuheritagewindow',
            'UIMenu/Windows/uimenudetailswindow'
          ]
        },
        {
          type: 'category',
          label: 'Side Panels',
          items: [
            'UIMenu/Side Panels/uimenufreemodedetailsitem',
            'UIMenu/Side Panels/uimissiondetailspanel',
            'UIMenu/Side Panels/uivehiclecolourpickerpanel'
          ]
        }
      ],
    },
    {
      type: 'category',
      label: 'PauseMenu',
      items: [
        'PauseMenu/index',
        'PauseMenu/MainView',
        'PauseMenu/TabView',
        'PauseMenu/pausemenuitem',
        {
          type: 'category',
          label: 'SubmenuTab Items',
          items: [
            'PauseMenu/SubmenuTabItems/tableftitem',
            'PauseMenu/SubmenuTabItems/statstabitem',
            'PauseMenu/SubmenuTabItems/keymapitem'
          ]
        },
        {
          type: 'category',
          label: 'Settings Items',
          items: [
            'PauseMenu/SettingsItems/settingsitem',
            'PauseMenu/SettingsItems/settingscheckboxitem',
            'PauseMenu/SettingsItems/settingslistitem',
            'PauseMenu/SettingsItems/settingsprogressitem',
            'PauseMenu/SettingsItems/settingsslideritem',
            'PauseMenu/SettingsItems/settingsseparatoritem'
          ]
        }
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
    }
  ],

  // 2. Tutorials Sidebar (dedicated tab)
  tutorialsSidebar: [
    {
      type: 'category',
      label: 'Tutorials',
      collapsed: false,
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
    }
  ],

  // 3. API Reference Sidebar (dedicated tab for Enums)
  referenceSidebar: [
    {
      type: 'category',
      label: 'Enums',
      collapsed: false,
      items: [
        { type: 'autogenerated', dirName: 'Enums' }
      ]
    }
  ]
};

export default sidebars;
