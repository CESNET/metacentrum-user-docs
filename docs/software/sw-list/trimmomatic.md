# Trimmomatic 

    module avail trimmomatic/

[Trimmomatic](http://www.usadellab.org/cms/?page=trimmomatic) is  is a fast, multithreaded command line tool that can be used to trim and crop Illumina (FASTQ) data as well as to remove adapters. These adapters can pose a real problem depending on the library preparation and downstream application.

Trimmomatic works with FASTQ files. Files compressed using either `gzip` or `bzip2` are supported, and are identified by use of `.gz` or `.bz2` file extensions. 

## Usage

There is defined an environment variable `TRIMMOMATIC_BIN` which points to the program jar file. Example of running:

```
java -jar /software/trimmomatic-0.32/dist/jar/trimmomatic-0.32.jar
java -jar /software/trimmomatic/0.36/dist/jar/trimmomatic-0.36.jar
java -jar /software/trimmomatic/0.39/trimmomatic-0.39/Trimmomatic-0.39/trimmomatic-0.39.jar
```

If you do not need to set any special parameters to java, you can use the available alias to above command called trimmomatic .
