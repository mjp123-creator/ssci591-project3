# LA Metro Rail Stations

Live page: https://mjp123-creator.github.io/ssci591-project3/

Repository: https://github.com/mjp123-creator/ssci591-project3

## What this map shows

This map displays Los Angeles rail stations, colored by the line labels in the source dataset. Clicking a station opens a popup with its name and line. It is a small learning project for SSCI 591 by Jiapei Mei, not a current trip-planning service. The source uses historical names such as EXPO, so users should check Metro's official information before traveling.

## Starting sample (name and link)

The starting point is Esri's [Intro to FeatureLayer](https://developers.arcgis.com/javascript/latest/sample-code/intro-featurelayer/) sample. The app retains its map component, asynchronous SDK import, FeatureLayer creation, and map.add workflow. It loads ArcGIS Maps SDK for JavaScript 5.1 from Esri's CDN. All application HTML, CSS, and JavaScript are in index.html; no build tool, package installation, or API key is required.

## What I changed

I changed the center and zoom to Los Angeles, replaced the hybrid basemap with gray-vector, and replaced the tree-size renderer with colored station markers based on LINE. I also changed the page title and added an About paragraph. The original tree fields, size breaks, ordering, and extent constraints were removed. The popup explicitly lists STATION and LINE, and a loading message reports the station count or a connection problem.

## Data source (name, URL, which layer type you used, and why you picked it)

The dataset is Rail Stations from LA GeoHub's RAIL_BRT service:

https://services5.arcgis.com/7nsPwEMP38bSkCjy/arcgis/rest/services/RAIL_BRT/FeatureServer/0

I used FeatureLayer because it directly reads the public ArcGIS REST endpoint and supports rendering and popups. I chose this teacher-recommended dataset because transit stations provide a clear local example. No station data is bundled in the repository. The layer is requested online, but its metadata reports its last edit in 2017. Online delivery does not mean the dataset is up to date.

## Component I added

I added the Home component to restore the initial Los Angeles view after zooming or panning. The Legend component explains the station colors, and the Zoom component supports navigation. These controls are inside arcgis-map.

## Problems and what I’d improve next

A major limitation is the age of the source, including historical line names. I kept these labels rather than guessing modern replacements. Future work would use a verified current Metro dataset and add station search. The app also depends on the SDK, basemap, and feature service being reachable. To run locally, serve this folder with python3 -m http.server 8000 and open http://localhost:8000. Test a station popup, zoom, Home, and the legend.

## Credits (data, sample, and any AI tools you used and what for)

The sample and SDK are from Esri, and the public rail layer is provided through LA GeoHub. Basemap attribution remains visible. OpenAI Codex assisted with interpreting requirements, adapting the sample, checking service fields, writing and debugging code, browser testing, README wording, and deployment preparation.
