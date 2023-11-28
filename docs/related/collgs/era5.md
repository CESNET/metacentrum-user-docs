# ERA5

*[ERA5](https://www.ecmwf.int/en/forecasts/dataset/ecmwf-reanalysis-v5) is the fifth generation ECMWF atmospheric reanalysis of the global climate covering the period from January 1940 to present. ERA5 is produced by the Copernicus Climate Change Service (C3S) at ECMWF.*

ERA5 provides hourly estimates of a large number of atmospheric, land and oceanic climate variables.

The data cover the Earth on a 30km grid and resolve the atmosphere using 137 levels from the surface up to a height of 80km.

ERA5 includes information about uncertainties for all variables at reduced spatial and temporal resolutions.

ERA5 is available on:

- Single levels
- Pressure levels: 1000/975/950/925/900/875/850/825/800/775/750/700/650/600/550/500/450/400/350/300/250/225/200/175/150/125/100/70/50/30/20/10/7/5/3/2/1

## Redistribuce ERA5 dat

V rámci distribuce ERA5 dat jsou uživatelům poskytovány datasety [ERA5 hourly data on single levels](https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-single-levels) a [ERA5 hourly data on pressure levels](https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-pressure-levels). Data v těchto redistribuovaných datasetech zahrnují celé území České republiky, jež je specifikováno bounding boxem [48.48, 12.07, 51.08, 19.00](http://bboxfinder.com/#48.480000,12.070000,51.080000,19.00000).

K dnešnímu dni (7. listopadu 2023) jsou stažena data od října 2023 do srpna 2018, přičemž jsou stále stahovány starší data, až do prvního poskytovaného měsíce ledna 1940.

Seznamy proměnných, jež jsou v datasetech zahrnuty, jsou dostupné na stránkách:

- [ERA5 reanalysis-single-levels variables](/related/collgs/ERA5_reanalysis-era5-single-levels_variables)
- [ERA5 reanalysis-pressure-levels variables](/related/collgs/ERA5_reanalysis-era5-pressure-levels_variables)

Veřejnosti jsou data zpřístupněna bez potřeby registrace prostřednictvím STAC katalogu na adresách [https://stac.cesnet.cz/collections/reanalysis-era5-single-levels](https://stac.cesnet.cz/collections/reanalysis-era5-single-levels) a [https://stac.cesnet.cz/collections/reanalysis-era5-pressure-levels](https://stac.cesnet.cz/collections/reanalysis-era5-pressure-levels).

Data nejsou připravována pro specifický dotaz uživatele, ale jsou předpřipravená, kdy pro každý dostupný měsíc uvažovaného datasetu jsou k dispozici čtyřy produktové typy:

- Reanalysis
- Ensemble mean
- Ensemble members
- Ensemble spread

Dle specifikace dat mohou být dále měněna a upravována a to až tři měsíce zpětně.

Pro reflektování této skutečnosti jsou nyní data stahována do konce měsíce předcházejícímu aktuálnímu měsíci. Tedy například v listopadu bude posledním staženým měsícem říjen. Je ale nutné mít na paměti, že tato data se ještě můžou měnit.

Dále pak dochází k aktualizaci a finalizaci dat, kdy je po 2. dni aktuálního měsíce stažen aktuálnímu měsící čtyři měsíce předcházející měsíc s finálními daty. Například tedy v listopadu budou stažena finální data pro červenec.

## Postup stažení

Data pro každý uvažovaný dataset a produktový typ jsou distribuovány ve formátu `.grib` a obsahují kompletní hodinová data pro všechny dostupné proměnné uvažovaného měsíce a pro dataset `reanalysis-era5-pressure-levels` také pro všechny úrovně tlaku.

Jednotlivé měsíce jsou organizovány v ploché struktuře:

`/collections/reanalysis-era5-single-levels/items/YYYY-MM-reanalysis-era5-single-levels`

Takovýto API endpoint vrací geojson daného itemu, přičemž pro stažení dat je významný node *assets*.

Node *assets* sestává ze čtyř dalších nodů, totiž jednotlivých produktových typů:

- reanalysis
- ensemble-mean
- ensemble-members
- ensemble-spread

V každém z těchto nodů produktových typů je obsažen klíč `href` jež odkazuje na požadovaný `.grib` soubor.

## Licence

Data jsou dostupná pod licencí [License to use Copernicus Products](https://cds.climate.copernicus.eu/api/v2/terms/static/licence-to-use-copernicus-products.pdf).
