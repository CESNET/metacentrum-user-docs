# Landsat

Landsat is a satellite program for Earth remote sensing operated by NASA and the U.S. Geological Survey.

On July 23, 1972, the Earth Resources Technology Satellite (ERTS-1) was launched into Earth's orbit, which was later renamed Landsat 1. Over the following years, additional Landsat satellites were launched, making it possible to create an archive of Earth remote sensing data. Currently, two active satellites are orbiting the Earth — Landsat 8 and Landsat 9.

NASA and USGS are already collaborating on the development of subsequent missions for Sustainable Land Imaging (SLI), which will include Landsat Next, the successor to Landsat 9.

The Landsat mission satellites have optimal resolution and spectral bands that allow for efficient monitoring of changes on Earth caused by climate change, urbanization, drought, fires, changes in biomass, and many other natural and human activities.

The Landsat program archive, which contains data dating back to 1972, provides important information about the Earth's surface and atmosphere that is not available from other sources. It represents the longest continuously operating Earth remote sensing data archive with optimal resolution. It is not only one of the key data sources for the U.S. Department of the Interior but also an important source of information for the global population, which uses the data for research, education, business, and many other activities.

## Available datasets

[Landsat 8-9 OLI/TIRS C2 L1](https://www.usgs.gov/media/files/landsat-8-9-olitirs-collection-2-level-1-data-format-control-book)

[Landsat 8-9 OLI/TIRS C2 L2](https://www.usgs.gov/centers/eros/science/usgs-eros-archive-landsat-archives-landsat-8-9-olitirs-collection-2-level-2)

[Landsat 7 ETM+ C2 L1](https://www.usgs.gov/media/files/landsat-7-etm-collection-2-level-1-data-format-control-book)

[Landsat 7 ETM+ C2 L2](https://www.usgs.gov/centers/eros/science/usgs-eros-archive-landsat-archives-landsat-7-etm-plus-collection-2-level-2)

[Landsat 4-5 TM C2 L1](https://www.usgs.gov/centers/eros/science/usgs-eros-archive-landsat-archives-landsat-4-5-thematic-mapper-collection-2)

[Landsat 4-5 TM C2 L2](https://www.usgs.gov/centers/eros/science/usgs-eros-archive-landsat-archives-landsat-4-5-tm-collection-2-level-2-science)

[Landsat 1-5 MSS C2 L1](https://www.usgs.gov/centers/eros/science/usgs-eros-archive-landsat-archives-landsat-1-5-multispectral-scanner-mss-level)

## Data acquisition and redistribution

Data is collected for the entire territory of the Czech Republic, which is defined by the bounding box [`48.55, 12.09, 51.06, 18.87`](http://bboxfinder.com/#48.550000,12.090000,51.060000,18.870000). 

The data is downloaded incrementally, with a check for new data occurring daily at 9:00 UTC. Data is checked for updates for the past 30 days.

All data is made publicly available without the need for registration through the [STAC](https://stacspec.org/en) catalog:

1) [Landsat 8-9 OLI/TIRS C2 L1](https://stac.vm.cesnet.cz/collections/landsat_ot_c2_l1)

2) [Landsat 8-9 OLI/TIRS C2 L2](https://stac.vm.cesnet.cz/collections/landsat_ot_c2_l2)

3) [Landsat 7 ETM+ C2 L1](https://stac.vm.cesnet.cz/collections/landsat_etm_c2_l1)

4) [Landsat 7 ETM+ C2 L2](https://stac.vm.cesnet.cz/collections/landsat_etm_c2_l2)

5) [Landsat 4-5 TM C2 L1](https://stac.vm.cesnet.cz/collections/landsat_tm_c2_l1)

6) [Landsat 4-5 TM C2 L2](https://stac.vm.cesnet.cz/collections/landsat_tm_c2_l2)

7) [Landsat 1-5 MSS C2 L1](https://stac.vm.cesnet.cz/collections/landsat_mss_c2_l1)

## Data download

According to the [STAC](https://stacspec.org/en) format specification the data are sorted into multiple collections - see [Data acquisition and redistribution](#data-acquisition-and-redistribution).

Detailed STAC API description is available [here](https://stac.cesnet.cz/api.html).

Items available in each collection are accessible using endpoint [`/items`](https://stac.cesnet.cz/api.html#featuresapi--getfeaturesincollection), thus for example for collection [Landsat 8-9 OLI/TIRS C2 L1](https://stac.vm.cesnet.cz/collections/landsat_ot_c2_l1), all of the items are avalable at `https://stac.vm.cesnet.cz/collections/landsat_ot_c2_l1/items`. Endpoint `items` returns 20 items and thus for exploration of the entire STAC catalogue paging is nescessary using URL parameter `?page=page_num` or by changing the total number of showed items using URL parameter `?limit=num_of_items`.

Data are distributed using `.tar` archive and each image corresponds to a single .tar file. The download link for this archive is stored for each item in the JSON key `assets`. For example, for an item: **[LC09_L2SP_191025_20240412_02_T1](https://stac.vm.cesnet.cz/collections/landsat_ot_c2_l2/items/8bb8514b-7e73-5a73-8c20-5835018825f3)**, in `assets` node there are metadata in format `xml` - **assets/mtl.xml** available to download as well as the data tar archive itself in **assets/data**. The download URL is stored in sub-key `href`.

The STAC catalog can also be conveniently browsed using a graphical interface running directly in a web browser: [STAC Browser](https://stac.cesnet.cz/browser/). For example, for the dataset considered above **[Landsat 8-9 OLI/TIRS C2 L1](https://stac.vm.cesnet.cz/collections/landsat_ot_c2_l1)** is available in STAC Browser [here](https://stac.cesnet.cz/browser/external/stac.vm.cesnet.cz/collections/landsat_ot_c2_l1).
                
## Licence

The data are free to use. See:

- [NASA Landsat Science](https://landsat.gsfc.nasa.gov/data/),
- [USGS FAQ](https://www.usgs.gov/faqs/are-there-any-restrictions-use-or-redistribution-landsat-data).
