# Busco 

    module avail busco/

[Busco](https://busco.ezlab.org/) is 

## Usage

**Variables**

You may need to adjust environment variable `AUGUSTUS_CONFIG_PATH` to point to some writable directory with configurations. Eg.:

```
mkdir $SCRATCHDIR/augustus_configs
cp -r $AUGUSTUS_CONFIG_PATH/* $SCRATCHDIR/augustus_configs/
export AUGUSTUS_CONFIG_PATH=$SCRATCHDIR/augustus_configs
```

**Datasets**

Datasets (actual to September 2018) are localized in the directory `/software/busco/3.0.2/src/db/`.
