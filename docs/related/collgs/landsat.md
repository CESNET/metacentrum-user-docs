# Landsat

The Landsat Program is a series of Earth-observing satellite missions jointly managed by NASA and the U.S. Geological Survey. 

On July 23, 1972, in cooperation with NASA, the Earth Resources Technology Satellite (ERTS-1) was launched. It was later renamed Landsat 1. Additional Landsat satellites have launched to bring the world an archive of remote sensing data. Currently orbiting and active satellites are Landsat 8, and Landsat 9. 

NASA and USGS are already planning the development of the follow-on SLI missions, to include Landsat Next, the successor mission to Landsat 9. 

Landsat satellites have the optimal ground resolution and spectral bands to efficiently track land use and to document land change due to climate change, urbanization, drought, wildfire, biomass changes (carbon assessments), and a host of other natural and human-caused changes. 

The Landsat Program’s continuous archive (1972-present) provides essential land change data and trending information not otherwise available. Landsat represents the world’s longest continuously acquired collection of space-based moderate-resolution land remote sensing data. Landsat is an essential capability that enables the U.S. Department of the Interior to wisely manage Federal lands. People around the world are using Landsat data for research, business, education, and other activities.

## Dostupné datasety

[Landsat 8-9 OLI/TIRS C2 L1](https://www.usgs.gov/media/files/landsat-8-9-olitirs-collection-2-level-1-data-format-control-book)

[Landsat 8-9 OLI/TIRS C2 L2](https://www.usgs.gov/centers/eros/science/usgs-eros-archive-landsat-archives-landsat-8-9-olitirs-collection-2-level-2)

[Landsat 7 ETM+ C2 L1](https://www.usgs.gov/media/files/landsat-7-etm-collection-2-level-1-data-format-control-book)

[Landsat 7 ETM+ C2 L2](https://www.usgs.gov/centers/eros/science/usgs-eros-archive-landsat-archives-landsat-7-etm-plus-collection-2-level-2)

[Landsat 4-5 TM C2 L1](https://www.usgs.gov/centers/eros/science/usgs-eros-archive-landsat-archives-landsat-4-5-thematic-mapper-collection-2)

[Landsat 4-5 TM C2 L2](https://www.usgs.gov/centers/eros/science/usgs-eros-archive-landsat-archives-landsat-4-5-tm-collection-2-level-2-science)

[Landsat 1-5 MSS C2 L1](https://www.usgs.gov/centers/eros/science/usgs-eros-archive-landsat-archives-landsat-1-5-multispectral-scanner-mss-level)

## Získávání a redistribuce dat

Data jsou získávána pro celé území České republiky, které je definováno bounding boxem [`48.55, 12.09, 51.06, 18.87`](http://bboxfinder.com/#48.550000,12.090000,51.060000,18.870000). 

Data jsou stahována inkrementálně, kontrola přítůstku dat probíhá každý den v 9:00 UTC, data se na přírustky kontrolují 30 dní zpětně.

Veřejnosti jsou data zpřístupněna bez potřeby registrace prostřednictvím STAC katalogu:
1) [Landsat 8-9 OLI/TIRS C2 L1](https://stac.vm.cesnet.cz/collections/landsat_ot_c2_l1)
2) [Landsat 8-9 OLI/TIRS C2 L2](https://stac.vm.cesnet.cz/collections/landsat_ot_c2_l2)
3) [Landsat 7 ETM+ C2 L1](https://stac.vm.cesnet.cz/collections/landsat_etm_c2_l1)
4) [Landsat 7 ETM+ C2 L2](https://stac.vm.cesnet.cz/collections/landsat_etm_c2_l2)
5) [Landsat 4-5 TM C2 L1](https://stac.vm.cesnet.cz/collections/landsat_tm_c2_l1)
6) [Landsat 4-5 TM C2 L2](https://stac.vm.cesnet.cz/collections/landsat_tm_c2_l2)
7) [Landsat 1-5 MSS C2 L1](https://stac.vm.cesnet.cz/collections/landsat_mss_c2_l1)

## Stažení dat

Data jsou distribuována ve formátu `.tar`, pričem jednomu snímku odpovída právě jeden `.tar` soubor. Uvažujme item **[LC09_L2SP_191025_20240412_02_T1](https://stac.vm.cesnet.cz/collections/landsat_ot_c2_l2/items/8bb8514b-7e73-5a73-8c20-5835018825f3)**, v node `assets` jsou pak dostupné ke stažení metadata ve formátu `xml` - **assets/mtl.xml** a samotný datový soubor **assets/data**. Odkaz pro stažení je v klíči `href`.
                
## Licence

Data jsou volně k použití. Viz: [NASA Landsat Science](https://landsat.gsfc.nasa.gov/data/) a [USGS FAQ](https://www.usgs.gov/faqs/are-there-any-restrictions-use-or-redistribution-landsat-data).
