import { GiPositionMarker, GiWhaleTail } from 'react-icons/gi';
import { VscPerson } from 'react-icons/vsc';
import { TiTree } from 'react-icons/ti';

const config = [
  {
    "display_name": "Buoys",
    "type": "multiple-select",
    "icon": GiPositionMarker,
    "items": [
      {
        "display_name": "Buoy Paths",
        "info": "Buoy Path Info",
        "key": "buoy_path",
        "default": true
      }
    ]
  },
  {
    "display_name": "Anthropogenic",
    "type": "multiple-select",
    "icon": VscPerson,
    "items": [
      {
        "display_name": "Oil Rigs",
        "info": "Oil Rig Info",
        "key": "oil_rig",
        "default": false
      },
      {
        "display_name": "Shipping Routes",
        "info": "Shipping Route Info",
        "key": "shipping_route",
        "default": false
      }
    ]
  },
  {
    "display_name": "Detections",
    "type": "multiple-select",
    "icon": GiWhaleTail,
    "items": [
      { "display_name": "Unidentified Beaked Whale", "info": "Some interesting info ", "item_name": "BW", "key": "detection", "default": false },
      { "display_name": "Possible Beaked Whale", "info": "Some interesting info ", "item_name": "?BW", "key": "detection", "default": false },
      { "display_name": "Cuvier's Beaked Whale", "info": "Some interesting info ", "item_name": "ZC", "key": "detection", "default": false },
      { "display_name": "Baird's Beaked Whale", "info": "Some interesting info ", "item_name": "BB", "key": "detection", "default": false },
      { "display_name": "Stejneger's Beaked Whale", "info": "Some interesting info ", "item_name": "MS", "key": "detection", "default": false },
      { "display_name": "Possibly Perrin's Beaked Whale", "info": "Some interesting info ", "item_name": "BW43", "key": "detection", "default": false },
      { "display_name": "Possibly Hubb's Beaked Whale", "info": "Some interesting info ", "item_name": "BW37V", "key": "detection", "default": false },
      { "display_name": "Cross Seamount Beaked Whale", "info": "Some interesting info ", "item_name": "BWC", "key": "detection", "default": false },
      { "display_name": "Sperm Whale", "info": "Some interesting info ", "item_name": "PM", "key": "detection", "default": false },
      { "display_name": "Narrow Band High Frequency", "info": "Some interesting info ", "item_name": "NBHF", "key": "detection", "default": false }
    ]
  },
  {
    "display_name": "Habitats",
    "type": "single-select",
    "key": "habitat",
    "default": "none",
    "icon": TiTree,
    "items": [
      { "display_name": "None", "value": "none" },
      { "display_name": "Minke Whale", "info": "Some interesting info ", "value": "MW" },
      { "display_name": "Baird's Beaked Whale", "info": "Some interesting info ", "value": "BBW" },
      { "display_name": "Blue Whale", "info": "Some interesting info ", "value": "BW" },
      { "display_name": "Fin Whale", "info": "Some interesting info ", "value": "FW" },
      { "display_name": "Long-Beaked Common Dolphin", "info": "Some interesting info ", "value": "LBCD" },
      { "display_name": "Short-Beaked Common Dolphin", "info": "Some interesting info ", "value": "SBCD" },
      { "display_name": "Risso's Dolphin", "info": "Some interesting info ", "value": "RD" },
      { "display_name": "Northern Right Whale Dolphin", "info": "Some interesting info ", "value": "NRWD" },
      { "display_name": "Pacific White-Sided Dolphin", "info": "Some interesting info ", "value": "PWSD" },
      { "display_name": "Humpback Whale", "info": "Some interesting info ", "value": "HW" },
      { "display_name": "Dall's Porpoise", "info": "Some interesting info ", "value": "DP" },
      { "display_name": "Striped Dolphin", "info": "Some interesting info ", "value": "SD" },
      { "display_name": "Sea Lion", "info": "Some interesting info ", "value": "SL" },
      { "display_name": "Common Bottlenose Dolphin", "info": "Some interesting info", "value": "CBD" }
    ]
  }
]

export default config;