# Landsat  

Landsat is a program of Earth observation satellites operated by NASA and the U.S. Geological Survey.

On July 23, 1972, the Earth Resources Technology Satellite (ERTS-1) was launched into Earth's orbit, later renamed Landsat 1.

In subsequent years, additional Landsat satellites were launched, enabling the creation of a comprehensive archive of Earth observation data.

Currently, two active satellites, Landsat 8 and Landsat 9, are in Earth's orbit.

NASA and USGS are already collaborating on the development of future SLI (Sustainable Land Imaging) missions, which will include Landsat Next, the successor to Landsat 9.  

The satellites in the Landsat missions have optimal resolution and spectral bands, making it possible to efficiently monitor changes on Earth caused by climate change, urbanization, drought, fires, biomass changes, and numerous other natural and human activities.  

The Landsat program archive, containing data since 1972, provides critical information about Earth's surface and atmosphere that is unavailable from other sources. It represents the longest continuously operating archive of Earth observation data with optimal resolution.

This archive serves not only as a fundamental data source for the U.S. Department of the Interior but also as a vital resource for the global population, supporting research, education, business, and many other activities.  

## Available datasets

[Landsat 8-9 OLI/TIRS C2 L1](https://www.usgs.gov/media/files/landsat-8-9-olitirs-collection-2-level-1-data-format-control-book)

[Landsat 8-9 OLI/TIRS C2 L2](https://www.usgs.gov/centers/eros/science/usgs-eros-archive-landsat-archives-landsat-8-9-olitirs-collection-2-level-2)

[Landsat 7 ETM+ C2 L1](https://www.usgs.gov/media/files/landsat-7-etm-collection-2-level-1-data-format-control-book)

[Landsat 7 ETM+ C2 L2](https://www.usgs.gov/centers/eros/science/usgs-eros-archive-landsat-archives-landsat-7-etm-plus-collection-2-level-2)

[Landsat 4-5 TM C2 L1](https://www.usgs.gov/centers/eros/science/usgs-eros-archive-landsat-archives-landsat-4-5-thematic-mapper-collection-2)

[Landsat 4-5 TM C2 L2](https://www.usgs.gov/centers/eros/science/usgs-eros-archive-landsat-archives-landsat-4-5-tm-collection-2-level-2-science)

[Landsat 1-5 MSS C2 L1](https://www.usgs.gov/centers/eros/science/usgs-eros-archive-landsat-archives-landsat-1-5-multispectral-scanner-mss-level)

## Data Acquisition and Redistribution  

Data is acquired for the entire territory of the Czech Republic, defined by the bounding box [`48.55, 12.09, 51.06, 18.87`](http://bboxfinder.com/#48.550000,12.090000,51.060000,18.870000).  

Data is downloaded incrementally, with the data increment check performed daily at 9:00 UTC, and data increments are reviewed for the past 30 days.  

All data is made publicly available without the need for registration via a [STAC](https://stacspec.org/en) catalog:  

1) [Landsat 8-9 OLI/TIRS C2 L1](https://stac.vm.cesnet.cz/collections/landsat_ot_c2_l1)

2) [Landsat 8-9 OLI/TIRS C2 L2](https://stac.vm.cesnet.cz/collections/landsat_ot_c2_l2)

3) [Landsat 7 ETM+ C2 L1](https://stac.vm.cesnet.cz/collections/landsat_etm_c2_l1)

4) [Landsat 7 ETM+ C2 L2](https://stac.vm.cesnet.cz/collections/landsat_etm_c2_l2)

5) [Landsat 4-5 TM C2 L1](https://stac.vm.cesnet.cz/collections/landsat_tm_c2_l1)

6) [Landsat 4-5 TM C2 L2](https://stac.vm.cesnet.cz/collections/landsat_tm_c2_l2)

7) [Landsat 1-5 MSS C2 L1](https://stac.vm.cesnet.cz/collections/landsat_mss_c2_l1)

## Data Download  

The data is available to the public without the need for registration via the STAC catalog.

According to the [STAC](https://stacspec.org/en) format specifications, data is divided into individual collections, as described in the section [Data Acquisition and Redistribution](#data-acquisition-and-redistribution).  

A detailed API description is available [here](https://stac.cesnet.cz/api.html).
Additional information is also provided in the [section on the STAC Catalog](./stac.md).  

Items available in individual collections can be accessed via the [`/items`](https://stac.cesnet.cz/api.html#featuresapi--getfeaturesincollection) endpoint.

For example, for the collection [Landsat 8-9 OLI/TIRS C2 L1](https://stac.vm.cesnet.cz/collections/landsat_ot_c2_l1), individual items are available at the endpoint `https://stac.vm.cesnet.cz/collections/landsat_ot_c2_l1/items`.

The `items` endpoint returns 20 items by default; to browse the entire catalog, you need to paginate using the URL parameter `?page=page_number` or adjust the number of displayed items using the URL parameter `?limit=item_count`.

Data is distributed in the `.tar` format, with each `.tar` file corresponding to one image. The download link for this archive is stored for each item in the JSON key `assets`.

For example, for the item **[LC09_L2SP_191025_20240412_02_T1](https://stac.vm.cesnet.cz/collections/landsat_ot_c2_l2/items/8bb8514b-7e73-5a73-8c20-5835018825f3)**, the `assets` node contains metadata available in the `xml` format (**assets/mtl.xml**) and the actual data file (**assets/data**). The download link is stored in the subkey `href`.  

It is recommended to download data using `wget`, as downloading via a web browser may be unstable.  

The STAC catalog can also be conveniently browsed using a graphical interface running directly in a web browser: [STAC Browser](https://stac.cesnet.cz/browser/).

For example, for the dataset **[Landsat 8-9 OLI/TIRS C2 L1](https://stac.vm.cesnet.cz/collections/landsat_ot_c2_l1)**, the browser is available [here](https://stac.cesnet.cz/browser/external/stac.vm.cesnet.cz/collections/landsat_ot_c2_l1).  

## License  

The data is free to use. See: [NASA Landsat Science](https://landsat.gsfc.nasa.gov/data/) and [USGS FAQ](https://www.usgs.gov/faqs/are-there-any-restrictions-use-or-redistribution-landsat-data).  

