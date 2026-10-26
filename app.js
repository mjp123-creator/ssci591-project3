// Adapted from Esri's Intro to FeatureLayer sample. See README for credits.
const status = document.getElementById('status');
const timeout = setTimeout(() => {
  status.textContent = 'Loading is taking longer than expected. Check your connection and reload if necessary.';
}, 20000);
try {
  const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js');
  const viewElement = document.querySelector('arcgis-map');
  await viewElement.viewOnReady();
  // These are the source's historical LINE values, not modern Metro names.
  const lines = [
    ['Gold', '#b17b00'], ['Blue', '#176bb4'], ['EXPO', '#008a91'],
    ['Green', '#40813b'], ['Red', '#d33436'], ['Purple', '#8055a2'],
    ['Red/Purple', '#883e65'], ['Blue/EXPO', '#245e76']
  ];
  const marker = color => ({
    type: 'simple-marker', style: 'circle', size: 9,
    color, outline: { color: '#ffffff', width: 1 }
  });
  const stations = new FeatureLayer({
    url: 'https://services5.arcgis.com/7nsPwEMP38bSkCjy/arcgis/rest/services/RAIL_BRT/FeatureServer/0',
    title: 'Rail lines (source labels)',
    outFields: ['STATION', 'LINE'],
    renderer: {
      type: 'unique-value', field: 'LINE',
      defaultSymbol: marker('#555555'), defaultLabel: 'Other / unspecified',
      uniqueValueInfos: lines.map(([value, color]) => ({ value, label: value, symbol: marker(color) }))
    },
    popupTemplate: {
      title: '{STATION}',
      content: [{ type: 'fields', fieldInfos: [
        { fieldName: 'STATION', label: 'Station name' },
        { fieldName: 'LINE', label: 'Line (source label)' }
      ] }]
    }
  });
  viewElement.map.add(stations);
  await viewElement.whenLayerView(stations);
  const count = await stations.queryFeatureCount();
  clearTimeout(timeout);
  status.textContent = `${count} stations loaded from the live service. Click a station for details; use Home to reset the view.`;
} catch (error) {
  clearTimeout(timeout);
  status.textContent = 'The map or station service could not load. Check your internet connection and try reloading.';
  console.error('Map initialization failed:', error);
}
