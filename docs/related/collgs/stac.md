# STAC Catalog

This documentation describes the STAC catalog (SpatioTemporal Asset Catalog) created for the organization and management of Earth observation product metadata. The catalog includes data from the [Sentinel](./sentinel.md), [Landsat](./landsat.md), and [ERA5](./era5.md) programs, which are categorized into collections.

Relevant usage descriptions of the STAC catalog can also be found on the pages of these programs in this documentation.

The catalog is accessible at [https://stac.cesnet.cz/](https://stac.cesnet.cz/).

## STAC Catalog Structure

A detailed specification of the STAC catalog is available at [STAC Specification](https://stacspec.org/en/about/stac-spec/).

### **Catalog**
A STAC catalog is a way of organizing and linking data so that it can be easily browsed and searched. It functions like a list containing data and links to other (sub)catalogs.

### **Collection**
A STAC collection provides additional information about a set of data (e.g., part of Sentinel 1 data - collection sentinel-1-slc). It extends the functionality of the catalog by adding fields that describe the spatial and temporal extent of the data, licenses, keywords, providers, etc. The list of collections is available at the endpoint [/collections](https://stac.vm.cesnet.cz/collections).

### **Item**
A STAC item is a self-contained record containing data and metadata. Its specification may include a timestamp, a thumbnail image, data links, links to relevant items, and asset links.

### **Asset**
An asset is a file associated with a specific item. An asset can be downloaded, e.g., a thumbnail image, GeoTIFF, or NetCDF file. The metadata of an asset includes information such as name, description, type, and the link to the file (`_href_`).

## API

To call the API, use the identical address [https://stac.cesnet.cz/](https://stac.cesnet.cz/).

A detailed documentation of the methods is available in the [API Documentation](https://stac.cesnet.cz/api.html).

Authentication is not required for searching.

To search for products, use the endpoint [/search](https://stac.cesnet.cz/search). In the body of the request, you send a JSON containing bounding box (_bbox_) and time range.


```
{
  "bbox": [5.5, 46, 8, 47.4], 
  "time": "2024-02-12T00:00:00Z/2024-03-12T100:00:00Z"
}
```

The response will be returned in the following format:

```
{
    "type": "FeatureCollection",
    "numberMatched": 330000,
    "numberReturned": 20,
    "features": [...],
    "links": [
        {
            "rel": "next",
            "type": "application/geo+json",
            "href": "https://stac.vm.cesnet.cz/search?&next=227165117419782344"
        },
        ...
    ]
}
```

where **features** contains the items matching the search parameters, **numberMatched** contains the total number of items matching the search parameters, **numberReturned** is the number of items currently returned, and **href** nested within **links** is the URL pointing to the next page of search results.

## Browser
A product browser is also available through the graphical interface: [https://stac.cesnet.cz/browser/](https://stac.cesnet.cz/browser/).

![stac_browser.png](stac_browser.png)

Data is also organized into collections here, and individual assets can be downloaded.

## Python Libraries for Geospatial Data

Python provides the [PySTAC](https://pystac.readthedocs.io/en/stable/) library, which allows working with the STAC catalog.

When using it, you need to use the API address [https://stac.vm.cesnet.cz/](https://stac.vm.cesnet.cz/).

```python
from pystac_client import Client
api_url = "https://stac.vm.cesnet.cz/"
client = Client.open(api_url)
```

Below is an example of how to work with a collection using the STAC API.

```python
collections = client.get_collections()
s1_collection = client.get_collection("sentinel-1-grd")
print(s1_collection.description)
```

The [Leafmap](https://leafmap.org/) library is used in Jupyter notebooks for geospatial analysis. It allows you to retrieve coordinates, which can then be utilized when working with the PySTAC library. Another option is to use some online tool such as a [bbox finder](http://bboxfinder.com).

If you already know the coordinates, you can use the `intersects` filter (for point intersection) or the `bbox` filter (for bounding box). The following examples are inspired by the [existing tutorial in English](https://carpentries-incubator.github.io/geospatial-python/instructor/05-access-data.html#search-a-stac-catalog).

```python
from shapely.geometry import Point
point = Point(16.6068, 49.1951)  # coordinates of Brno
search = client.search(
    collections=[s1_collection],
    intersects=point,
    max_items=10,  # limit on items of response
    method="GET"  # the default method requires authentication, so it is necessary to explicitly specify GET
)
print(search.matched())
```

The result will display how many items match the query - specifically belonging to the sentinel-1-grd collection and intersecting with Brno.

```python
for item in (search.item_collection()):
    print(item.properties)
```

The search results can be iterated further to retrieve details about each of the 10 returned items. The resulting metadata will have a similar format:

```json
{
    "productIdentifier": "dhr1006adbc3-5f9d-4273-8d00-1bdf8b435603",
    "datetime": "2024-05-26T16:43:30.929639Z",
    "start_datetime": "2024-05-26T16:43:18.430587Z",
    "end_datetime": "2024-05-26T16:43:43.428690Z",
    "sar:frequency_band": "C",
    "sar:center_frequency": 5.405,
    "sar:observation_direction": "right",
    "sar:instrument_mode": "IW",
    "sar:polarizations": [
        "VV",
        "VH"
    ],
    "sar:product_type": "GRD",
    "proj:bbox": [
        14.998892,
        47.573769,
        18.942654,
        49.47876
    ],
    "platform": "sentinel-1a",
    "s1:product_identifier": "S1A_IW_GRDH_1SDV_20240526T164318_20240526T164343_054045_069226_1020",
    ...
}
```

To access the download links for specific images, we need to access the assets, which can be listed.

```python
assets = items[0].assets
print(assets.keys())
```

In these, we can then select links to, for example, the preview image, which we can obtain from the given link:

```python
import requests
from matplotlib import pyplot as plt
from PIL import Image
import io

thumbnail = assets["thumbnail"].href
img_data = requests.get(thumbnail).content

plt.figure(figsize=(10, 10))
plt.imshow(Image.open(io.BytesIO(img_data)))
plt.show()
```

![stac_thumbnail.png](stac_thumbnail.png)

## Tutorial

A more complex tutorial for several use cases was prepared for the CSCALE project. You can follow the tutorial at [C-SCALE Data Discovery Notebook](related/notebooks/c-scale-notebooks/1-C-SCALE_Data_Discovery.ipynb).
