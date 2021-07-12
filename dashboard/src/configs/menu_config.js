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
        "info": "Buoy paths trace the path which recording buoys travel for the duration of the survey they belong to.",
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
        "info": "One source of anthropogenic noise in the oceans comes from oil rigs. Drilling, vehicle traffic, and other related activities all generate noise pollution.",
        "key": "oil_rig",
        "default": false
      },
      {
        "display_name": "Shipping Routes",
        "info": "Vessel noise is the largest contributor of noise pollution to the ocean. The noise vessels produce is in the low frequency ranges.",
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
      { 
        "display_name": "Unidentified Beaked Whale", 
        "info": `**Scientific Name**: _Hyperoodontidae_  
        From the recordings collected, the animal producing the detected acoustic event is a beaked whale, but the species is not identifiable.
# More Info
[Wikipedia](https://en.wikipedia.org/wiki/Beaked_whale)`, 
        "item_name": "BW", "key": "detection", "default": false
      },
      { 
        "display_name": "Possible Beaked Whale", 
        "info": `**Scientific Name**: _Hyperoodontidae_  
        From the recordings collected, it is possible that the animals producing the detected acoustic event is a beaked whale.  
# More Info
[Wikipedia](https://en.wikipedia.org/wiki/Beaked_whale)`, 
        "item_name": "?BW", "key": "detection", "default": false },
      { 
        "display_name": "Cuvier's Beaked Whale", 
        "info": `**Scientific Name**: _Ziphius cavirostris_  
        **Endangered Status**: Least Concern  
        **Life Span**: 60 years  
        **Weight**: 4000 to 6800 pounds  
        **Length**: 15 to 23 feet  
        **Threats**: Entanglement in fishing gear, Hunting(Outside United States), Vessel strikes, Ocean noise  
        **Region**: Alaska, New England/Mid-Atlantic, Pacific Islands, Southeast, West Coast  
        
# More Info  
- [Wikipedia](https://en.wikipedia.org/wiki/Cuvier%27s_beaked_whale)  
- [Whale and Dolphin Conservation Species Guide](https://us.whales.org/whales-dolphins/species-guide/cuviers-beaked-whale/)  
- [N.O.A.A Fisheries Species Guide](https://www.fisheries.noaa.gov/species/cuviers-beaked-whale)`, 
        "item_name": "ZC", "key": "detection", "default": false },
      { 
        "display_name": "Baird's Beaked Whale", 
        "info": `**Scientific Name**: _Berardius bairdii_  
        **Endangered Status**: Least Concern  
        **Life Span**: Up to 54 years (females); 84 years (males)  
        **Weight**: Over 26,000 pounds  
        **Length**: Up to 36 feet (females); 35 feet (males)  
        **Threats**: Commercial whaling, Entanglement in Fishing gear, Marine debris, Ocean noise  
        **Region**: Alaska, West Coast, Foreign  
        
# More Info  
- [Wikipedia](https://en.wikipedia.org/wiki/Berardius)  
- [Whale and Dolphin Conservation Species Guide](https://us.whales.org/whales-dolphins/species-guide/bairds-beaked-whale/)  
- [N.O.A.A Fisheries Species Guide](https://www.fisheries.noaa.gov/species/bairds-beaked-whale)`,
        "item_name": "BB", "key": "detection", "default": false },
      { 
        "display_name": "Stejneger's Beaked Whale", 
        "info": `**Scientific Name**: _Mesoplodon stejnegeri_  
        **Endangered Status**: Near Threatened  
        **Life Span**: Estimated to be at least 35 years  
        **Weight**: up to 3527 pounds  
        **Length**: 18.7 feet  
        **Threats**: Entanglement in fishing gear, Commercial whaling, Ocean noise, Marine debris  
        **Region**: Alaska, West Coast  
        
# More Info  
- [Wikipedia](https://en.wikipedia.org/wiki/Stejneger's_beaked_whale)  
- [Whale and Dolphin Conservation Species Guide](https://us.whales.org/whales-dolphins/species-guide/stejnegers-beaked-whale/)  
- [N.O.A.A Fisheries Species Guide](https://www.fisheries.noaa.gov/species/stejnegers-beaked-whale)`, 
        "item_name": "MS", "key": "detection", "default": false },
      {
        "display_name": "Possibly Perrin's Beaked Whale", 
        "info": `**Scientific Name**: _Mesoplodon perrini_  
        **Endangered Status**: Endangered  
        **Length**: Max Length 12.8 ft (male) and 14.4 ft (female)  
        **Region**: All recorded strandings have occurred around southern and central California  
        
# More Info  
- [Wikipedia](https://en.wikipedia.org/wiki/Perrin's_beaked_whale)  
- [Whale and Dolphin Conservation Species Guide](https://us.whales.org/whales-dolphins/species-guide/perrins-beaked-whale/)`, 
        "item_name": "BW43", "key": "detection", "default": false },
      { 
        "display_name": "Possibly Hubb's Beaked Whale", 
        "info": `**Scientific Name**: _Mesoplodon carlhubbsi_  
        **Endangered Status**: Data Deficient  
        **Weight**: Max weight 3300 pounds (female)  
        **Length**: 17.7 feet  
        **Region**: Coast of Japan and Pacific coast of North America (from San Diego to Prince Rupert)  
        
# More Info  
- [Wikipedia](https://en.wikipedia.org/wiki/Hubbs'_beaked_whale)  
- [Whale and Dolphin Conservation Species Guide](https://us.whales.org/whales-dolphins/species-guide/hubbs-beaked-whale/)`, 
        "item_name": "BW37V", "key": "detection", "default": false },
      { 
        "display_name": "Cross Seamount Beaked Whale", 
        "info": "Acoustic events like these were first detected at Cross Seamount near Hawaii. However, the actual species which produces these signals is unknown.", 
        "item_name": "BWC", "key": "detection", "default": false },
      { 
        "display_name": "Sperm Whale", 
        "info": `**Scientific Name**: _Physeter macrocephalus_  
        **Endangered Status**: Vulnerable  
        **Frequency**: 0.5 - 15 kHz  
        **Life Span**: Up to 60 years  
        **Weight**: 15 tons (female) to 45 tons (male)  
        **Length**: 40 feet (female) to 52 feet (male)  
        **Threats**: Vessel strikes, Entanglement in fishing gear, Ocean noise, Marine debris, Climate change, Oil spills and contaminants  
        **Region**: Alaska, New England/Mid-Atlantic, Pacific Islands, Southeast, West Coast  
        
# More Info  
- [Wikipedia](https://en.wikipedia.org/wiki/Sperm_whale)  
- [Whale and Dolphin Conservation Species Guide](https://us.whales.org/whales-dolphins/species-guide/sperm-whale/)  
- [N.O.A.A Fisheries Species Guide](https://www.fisheries.noaa.gov/species/sperm-whale)`, 
        "item_name": "PM", "key": "detection", "default": false },
      { 
        "display_name": "Narrow Band High Frequency", 
        "info": `A Narrow Band High Frequency (NBHF) acoustic event is a series of high frequency clicks within a narrow frequency range.
        The only known species which produce NBHF acoustic events are Harbor and Dall's porpoises as well as Dwarf and Pygmy Sperm Whales,
        so detections of this type could be any of those four species.`, 
        "item_name": "NBHF", "key": "detection", "default": false }
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
      { 
        "display_name": "Minke Whale", 
        "info": `**Scientific Name**: _Balaenoptera acutorostrata_  
        **Endangered Status**: Least Concern    
        **Life Span**: Up to 50 years  
        **Weight**: Up to approximately 20,000 pounds  
        **Length**: Up to approximately 35 feet  
        **Threats**: Whaling, Entanglement in fishing gear, Ocean noise, Climate change, Vessel strikes  
        **Region**: Alaska, New England/Mid-Atlantic, Pacific Islands, Southeast, West Coast  
        
# More Info  
- [Wikipedia](https://en.wikipedia.org/wiki/Minke_whale)  
- [Whale and Dolphin Conservation Species Guide](https://us.whales.org/whales-dolphins/species-guide/common-minke-whale/)  
- [N.O.A.A Fisheries Species Guide](https://www.fisheries.noaa.gov/species/minke-whale)`, 
        "value": "MW" },
      {
        "display_name": "Baird's Beaked Whale",
        "info": `**Scientific Name**: _Berardius bairdii_  
        **Endangered Status**: Least Concern  
        **Life Span**: Up to 54 years (females); 84 years (males)  
        **Weight**: Over 26,000 pounds  
        **Length**: Up to 36 feet (females); 35 feet (males)  
        **Threats**: Commercial whaling, Entanglement in Fishing gear, Marine debris, Ocean noise  
        **Region**: Alaska, West Coast, Foreign  
        
# More Info  
- [Wikipedia](https://en.wikipedia.org/wiki/Berardius)  
- [Whale and Dolphin Conservation Species Guide](https://us.whales.org/whales-dolphins/species-guide/bairds-beaked-whale/)  
- [N.O.A.A Fisheries Species Guide](https://www.fisheries.noaa.gov/species/bairds-beaked-whale)`,
        "value": "BBW" },
      {
        "display_name": "Blue Whale", 
        "info": `**Scientific Name**: _Balaenoptera musculus_  
        **Endangered Status**: Endangered  
        **Frequency**: 8 to 25 Hz  
        **Life Span**: Estimated at around 80-90 years   
        **Weight**: Up to 330,000 pounds  
        **Length**: Up to 110 feet  
        **Threats**: Vessel strikes, entanglement in fishing gear, ocean noise  
        **Region**: Alaska, New England/Mid-Atlantic, Pacific Islands, Southeast, West Coast  
        
# More Info  
- [Wikipedia](https://en.wikipedia.org/wiki/Blue_whale)  
- [Whale and Dolphin Conservation Species Guide](https://us.whales.org/whales-dolphins/species-guide/blue-whale)  
- [N.O.A.A Fisheries Species Guide](https://www.fisheries.noaa.gov/species/blue-whale)`, 
        "value": "BW" },
      { 
        "display_name": "Fin Whale", 
        "info": `**Scientific Name**: _Balaenoptera physalus_  
        **Endangered Status**: Vulnerable  
        **Frequency**: 16 to 40 Hz  
        **Life Span**: 80 to 90 years  
        **Weight**: 40 to 80 tons  
        **Length**: 75 to 85 feet  
        **Threats**: Entanglement in fishing gear, Vessel strikes, Lack of prey due to overfishing, Ocean noise, Climate change  
        **Region**: Alaska, New England/Mid-Atlantic, Pacific Islands, Southeast, West Coast  
        
# More Info  
- [Wikipedia](https://en.wikipedia.org/wiki/Fin_whale)  
- [Whale and Dolphin Conservation Species Guide](https://us.whales.org/whales-dolphins/species-guide/fin-whale)  
- [N.O.A.A Fisheries Species Guide](https://www.fisheries.noaa.gov/species/fin-whale)`, 
        "value": "FW" },
      { 
        "display_name": "Long-Beaked Common Dolphin",
        "info": `**Scientific Name**: _Delphinus capensis_  
        **Endangered Status**: Data Deficient  
        **Life Span**: About 40 years  
        **Weight**: 160 to 500 pounds  
        **Length**: 6 to 8.5 feet  
        **Threats**: Entanglement in fishing gear, Hunting, Biotoxins  
        **Region**: West Coast  
        
# More Info  
- [Wikipedia](https://en.wikipedia.org/wiki/Long-beaked_common_dolphin)  
- [Whale and Dolphin Conservation Species Guide](https://us.whales.org/whales-dolphins/species-guide/long-beaked-common-dolphin/)  
- [N.O.A.A Fisheries Species Guide](https://www.fisheries.noaa.gov/species/long-beaked-common-dolphin)`, 
        "value": "LBCD" },
      { 
        "display_name": "Short-Beaked Common Dolphin", 
        "info": `**Scientific Name**: _Delphinus delphis_  
        **Endangered Status**: Least Concern  
        **Life Span**: About 40 years  
        **Weight**: About 170 pounds  
        **Length**: About 6 feet  
        **Threats**: Entanglement in fishing gear, Hunting  
        **Region**: New England/Mid-Atlantic, Pacific Islands, Southeast, West Coast  
        
# More Info  
- [Wikipedia](https://en.wikipedia.org/wiki/Short-beaked_common_dolphin)  
- [Whale and Dolphin Conservation Species Guide](https://us.whales.org/whales-dolphins/species-guide/short-beaked-common-dolphin/)  
- [N.O.A.A Fisheries Species Guide](https://www.fisheries.noaa.gov/species/short-beaked-common-dolphin)`, 
        "value": "SBCD" },
      { 
        "display_name": "Risso's Dolphin", 
        "info": `**Scientific Name**: _Grampus griseus_  
        **Endangered Status**: Not endangered or threatened  
        **Life Span**: at least 35 years  
        **Weight**: 660 to 1100 pounds  
        **Length**: 8.5 to 13 feet  
        **Threats**: Entanglement in fishing gear, Hunting, Ocean Noise, Contaminants


# More Info  
- [Wikipedia](https://en.wikipedia.org/wiki/Risso%27s_dolphin)
- [Whale and Dolphin Conservation Species Guide](https://us.whales.org/whales-dolphins/species-guide/rissos-dolphin/)
- [N.O.A.A Fisheries Species Guide](https://www.fisheries.noaa.gov/species/rissos-dolphin)`, 
        "value": "RD" },
      { 
        "display_name": "Northern Right Whale Dolphin", 
        "info": `**Scientific Name**: _Lisodelphis borealis_  
        **Endangered Status**: Least Concern  
        **Life Span**: About 42 years  
        **Weight**: 130 to 254 pounds  
        **Length**: 6.5 to 10 feet  
        **Threats**: Entanglement in fishing gear, Ocean noise, Hunting (Japan)  
        **Region**: West Coast  
        
# More Info  
- [Wikipedia](https://en.wikipedia.org/wiki/Northern_right_whale_dolphin)  
- [Whale and Dolphin Conservation Species Guide](https://us.whales.org/whales-dolphins/species-guide/northern-right-whale-dolphin)  
- [N.O.A.A Fisheries Species Guide](https://www.fisheries.noaa.gov/species/northern-right-whale-dolphin)`, 
        "value": "NRWD" },
      { 
        "display_name": "Pacific White-Sided Dolphin", 
        "info": `**Scientific Name**: _Lagenohynchus obliquidens_  
        **Endangered Status**: Least Concern  
        **Life Span**: 36 to 40 years  
        **Weight**: 300 to 400 pounds  
        **Length**: 5.5 to 8 feet  
        **Threats**: Entanglement in fishing gear, Ocean noise  
        **Region**: Alaska, West Coast  
        
# More Info  
- [Wikipedia](https://en.wikipedia.org/wiki/Pacific_white-sided_dolphin)  
- [Whale and Dolphin Conservation Species Guide](https://us.whales.org/whales-dolphins/species-guide/pacific-white-sided-dolphin)  
- [N.O.A.A Fisheries Species Guide](https://www.fisheries.noaa.gov/species/pacific-white-sided-dolphin)`, 
        "value": "PWSD" },
      { 
        "display_name": "Humpback Whale", 
        "info": `**Scientific Name**: _Megaptera novaeangliae_  
        **Endangered Status**: Least Concern  
        **Frequency**: 80 to 4,000 Hz  
        **Life Span**: About 80 to 90 years  
        **Weight**: Up to approximately 40 tons  
        **Length**: Up to approximately 60 feet  
        **Threats**: Entanglement in fishing gear, Vessel strikes, Vessel-based harassment, Ocean noise  
        **Region**: Alaska, New England/Mid-Atlantic, Pacific Islands, Southeast, West Coast, Foreign  
        
# More Info  
- [Wikipedia](https://en.wikipedia.org/wiki/Humpback_whale)  
- [Whale and Dolphin Conservation Species Guide](https://us.whales.org/whales-dolphins/species-guide/humpback-whale)  
- [N.O.A.A Fisheries Species Guide](https://www.fisheries.noaa.gov/species/humpback-whale)`, 
        "value": "HW" },
      {
        "display_name": "Dall's Porpoise", 
        "info": `**Scientific Name**: _Phocoenoides dalli_  
        **Endangered Status**: Least Concern  
        **Frequency**: 117 to 160 kHz  
        **Life Span**: 15 to 20 years  
        **Weight**: Up to approximately 440 pounds  
        **Length**: 7 to 8 feet  
        **Threats**: Entanglement in fishing gear, Hunting, Habitat alteration, Contaminants, Ocean noise  
        **Region**: Alaska, West Coast  
        
# More Info  
- [Wikipedia](https://en.wikipedia.org/wiki/Dall's_porpoise)  
- [Whale and Dolphin Conservation Species Guide](https://us.whales.org/whales-dolphins/species-guide/dalls-porpoise)  
- [N.O.A.A Fisheries Species Guide](https://www.fisheries.noaa.gov/species/dalls-porpoise)`, 
        "value": "DP" },
      { 
        "display_name": "Striped Dolphin", 
        "info": `**Scientific Name**: _Stenella coeruleoalba_  
        **Endangered Status**: Least Concern  
        **Frequency**: 7.1 to 20.4 kHz  
        **Life Span**: Up to 58 years  
        **Weight**: 350 pounds (male); 330 pounds (female)  
        **Length**: 9 feet (males); 8 feet (females)  
        **Threats**: Entanglement in fishing gear, Hunting, Chemical contaminants, Disease  
        **Region**: New England/Mid-Atlantic, Pacific Islands, Southeast, West Coast  
        
# More Info  
- [Wikipedia](https://en.wikipedia.org/wiki/Striped_dolphin)  
- [Whale and Dolphin Conservation Species Guide](https://us.whales.org/whales-dolphins/species-guide/striped-dolphin)  
- [N.O.A.A Fisheries Species Guide](https://www.fisheries.noaa.gov/species/striped-dolphin)`, 
        "value": "SD" },
      { 
        "display_name": "Sea Lion", 
        "info": `**Scientific Name**: _Zalophus californianus_  
        **Endangered Status**: Least Concern  
        **Life Span**: 20 to 30 years  
        **Weight**: 240 pounds (females) to 700 pounds (males)  
        **Length**: 7.5 feet (males); 6 feet (females)  
        **Threats**: Entanglement in fishing gear, Biotoxins resulting from harmful algal blooms, Human-caused injuries  
        **Region**: West Coast  
        
# More Info  
- [Wikipedia](https://en.wikipedia.org/wiki/Sea_lion)  
- [Whale and Dolphin Conservation Species Guide](https://us.whales.org/seals-sea-lions-and-southern-resident-orcas-in-the-pacific-northwest/)  
- [N.O.A.A Fisheries Species Guide](https://www.fisheries.noaa.gov/species/california-sea-lion)`, 
        "value": "SL" },
      { 
        "display_name": "Common Bottlenose Dolphin", 
        "info": `**Scientific Name**: _Tursiops truncatus_  
        **Endangered Status**: Least Concern  
        **Frequency**: 0.2 to 150 kHz  
        **Life Span**: 40 to 60 years  
        **Weight**: 300 to 1,400 pounds  
        **Length**: 6 to 13 feet  
        **Threats**: Fisheries entanglements and gear ingestion, Illegal feeding and harassment, Habitat alteration, Ocean noise, Chemical contaminants, Oil spills and energy exploration, Disease, Biotoxins, Vessel strikes  
        **Region**: New England/Mid-Atlantic, Pacific Islands, Southeast, West Coast  
        
# More Info  
- [Wikipedia](https://en.wikipedia.org/wiki/Common_bottlenose_dolphin)  
- [Whale and Dolphin Conservation Species Guide](https://us.whales.org/whales-dolphins/species-guide/common-bottlenose-dolphin/)  
- [N.O.A.A Fisheries Species Guide](https://www.fisheries.noaa.gov/species/common-bottlenose-dolphin)`, 
        "value": "CBD" }
    ]
  }
]

export default config;