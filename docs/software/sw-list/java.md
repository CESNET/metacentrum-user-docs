# Java

    module avail openjdk/    # versions of OpenJDK

## Description

[OpenJDK](https://openjdk.org/) is open-source implementation of the Java Platform, Standard Edition, and related projects.

## Usage

Run the environment as

     #!/bin/bash
     export CLASSPATH=/home/something/something.jar:/software/java-libs/javamail-1.4/mail.jar:/software/java-libs/jaf-1.1/activation.jar
     java cz.something.SomeClass

### Threading and PBS resources violation

Java uses the garbage collector and other techniques. This can increase the number of used processors which can violate the CPU limit set by scheduler. To avoid this you can:

- try to request more resources (eg. 4 more processors)
- run Java with some parameters, eg. `java  -XX:+UseSerialGC -XX:-BackgroundCompilation`



