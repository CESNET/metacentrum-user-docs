# STAC katalog
Tato dokumentace popisuje STAC katalog (SpatioTemporal Asset Catalog) vytvořený pro organizaci a správu metadat produktů
dálkového průzkumu Země. Katalog zahrnuje data z programů [Sentinel](./sentinel.md), [Landsat](./landsat.md) a [ERA5](./era5.md),
která jsou rozřazena do kolekcí.
Relevantní popisy použití STAC katalogu naleznete také na stránkách těchto programů v této dokumentaci.
Katalog je přístupný na adrese [https://stac.cesnet.cz/](https://stac.cesnet.cz/).

## Struktura katalogu
Podrobná specifikace STAC katalogu je dostupná v angličtině na [https://stacspec.org/en/about/stac-spec/](https://stacspec.org/en/about/stac-spec/). 

**Katalog** - STAC katalog je způsob, jak uspořádat a propojit data, aby se dala snadno procházet a vyhledávat. 
Funguje jako seznam, který obsahuje data a odkazy na další (pod)katalogy.

**Kolekce** - STAC kolekce poskytuje dodatečné informace o souboru dat (např. část dat Sentinelu 1 - kolekce sentinel-1-slc).
Rozšiřuje funkčnost katalogu přidáním dalších polí, která umožňují popis prostorového a časového rozsahu dat,
licence, klíčových slov, poskytovatelů, apod. Seznam kolekcí je přístupný na endpointu [/collections](https://stac.vm.cesnet.cz/collections).

**Item** - STAC item je ucelený záznam obsahující data a metadata, jehož specifikace může obsahovat časovou značku, náhledový obrázek,
odkazy k datům, odkazy k relevantním itemům a asset linky.

**Asset** - soubor přidružený ke konkrétnímu itemu. Asset je možné stáhnout, např.
náhledový obrázek, GeoTIFF nebo NetCDF soubor. Součástí metadat assetu jsou informace jako název, popis, typ a odkaz na soubor (_href_).

## API
Pro volání API použijte identickou adresu [https://stac.cesnet.cz/](https://stac.cesnet.cz/).
Podrobná dokumentace metod je k dispozici v angličtině zde: [https://stac.cesnet.cz/api.html](https://stac.cesnet.cz/api.html).
Pro prohledávání není potřeba autentizace.

K vyhledání produktů slouží endpoint [/search](https://stac.cesnet.cz/search).
Na tento endpoint v těle requestu zasíláte JSON obsahující ohraničující body (_bbox_) a časové rozmezí.

```
{
  "bbox": [5.5, 46, 8, 47.4], 
  "time": "2024-02-12T00:00:00Z/2024-03-12T100:00:00Z"
}
```

Odpověď získáte v následujícím formátu:

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
kde **features** obsahuje itemy splňující vyhledávací parametry, **numberMatched** obsahuje celkový počet itemů splňujících
vyhledávací parametry, **numberReturned** počet aktuálně vrácených itemů a **href** zanořený v **links** je URL odkazující na další
stránku výsledků tohoto vyhledávání.


## Prohlížeč
Rovněž je k dispozici prohlížeč produktů v grafickém rozhraní: [https://stac.cesnet.cz/browser/](https://stac.cesnet.cz/browser/).
![stac_browser.png](stac_browser.png)
I zde jsou data rozřazena do kolekcí a je možné sáhnout jednotlivé assety.
