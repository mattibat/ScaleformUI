const { visit } = require('unist-util-visit');

const enumNames = [
  'BusySpinner', 'NotificationType', 'NotificationColor', 'CrewHierarchy', 'PM_COLUMNS',
  'LobbyBadgeIcon', 'GPSFlags', 'PlayerCardType', 'PlayerCardTeam', 'StatItemType',
  'LeftItemType', 'LeftItemBGType', 'SettingsItemType', 'ScrollType', 'ScrollArrowsPosition',
  'GalleryState', 'PLT_COLUMNS', 'MenuAnimationType', 'MenuBuildingAnimation', 'ScrollingType',
  'MenuAlignment', 'MenuControls', 'UIMenuCheckboxStyle', 'ChangeDirection', 'BadgeIcon',
  'ColorPanelType', 'ColorPickerType', 'GridType', 'PanelSide', 'SidePanelsTitleType',
  'AnimationDirection', 'HudColor', 'PadCheck', 'InputGroup', 'MouseEvent', 'JobSelectionCardIcon',
  'JobIcon', 'ChatScope', 'ChatVisibility', 'WarningPopupType', 'ScoreDisplayType', 'ScoreRightIconType'
];

function plugin() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (parent.type === 'link' || parent.type === 'code' || parent.type === 'inlineCode' || parent.type === 'heading') {
        return;
      }

      let text = node.value;
      let newNodes = [];
      let lastIndex = 0;

      const regex = new RegExp('\\\\b(' + enumNames.join('|') + ')\\\\b', 'g');
      
      let match;
      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          newNodes.push({ type: 'text', value: text.substring(lastIndex, match.index) });
        }
        
        const enumName = match[1];
        newNodes.push({
          type: 'link',
          url: '/Enums/' + enumName,
          children: [{ type: 'inlineCode', value: enumName }]
        });
        
        lastIndex = regex.lastIndex;
      }

      if (lastIndex < text.length) {
        newNodes.push({ type: 'text', value: text.substring(lastIndex) });
      }

      if (newNodes.length > 0) {
        parent.children.splice(index, 1, ...newNodes);
        return index + newNodes.length;
      }
    });
  };
}

module.exports = plugin;
