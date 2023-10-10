# OpenCV 

    module avail opencv/

[OpenCV](https://opencv.org/) is a tool for image processing and performing computer vision tasks. It is an open-source library that can be used to perform tasks like face detection, objection tracking, landmark detection, and much more.

Only some OpenCV modules are compiled with GPU support (Cuda).

## Usage

### Versions

- opencv/2.3.2               - for Python 2.6
- opencv/2.4                 - for Python 2.7
- opencv/2.4-cuda            - for Python 2.6
- opencv/3.2                 - for Python 2.7
- opencv/3.2-cuda            - for Python 2.7 and Cuda 8.0
- opencv/3.3.1-py34          - for Python 3.4
- opencv/3.4.5-py36          - for Python 3.6
- opencv/3.4.5-py36-cuda10.1 - for Python 3.6 and Cuda 10.1

### Python

OpenCV can be used as a Python library. This module is compiled with Python 2.7 and Numpy support. To initialize your environment, use:

```
# for opencv-2.4 module
module add python-2.7.5 numpy-1.7.1-py2.7 ffmpeg opencv-2.4
# for older opencv-2.3.2 module
module add python-2.6.2 numpy-py2.6 ffmpeg opencv-2.3.2
```

Then, in Python, library `cv2` is available, you can import it and use it:

```
import cv2

img = cv2.imread('test.png')
```

### C++

Here is a short demonstration, how to compile a C++ project with OpenCV. OpenCV module uses ffmpeg module internally for video processing.

Initialize your environment:

    module add cmake-2.8 ffmpeg opencv-2.4

Module cmake is used for c++ project compilation. Our sample project is available here: [metacentrum_opencv_demo.zip](http://www.kky.zcu.cz/public/metacentrum_opencv_demo.zip). Decompress this ZIP file in your home directory, at any metacentrum frontend machine.

Directory `metacentrum_opencv_demo` contains source cpp file, `CMakeLists.txt` for cmake, and several sample videos in "samples" subdirectory.

Create new directory `metacentrum_opencv_demo_build` (as a sibling directory to `metacentrum_opencv_demo` directory). Here, we will make a compilation and build of whole project. 

Similarly, create new directory `metacentrum_opencv_demo_install`, where resulting binary file will be installed.

In `metacentrum_opencv_demo_build` directory, execute:

    ccmake ../metacentrum_opencv_demo

This will launch cmake GUI and create new configuration for our build. Configure the project as follows:

```
CMAKE_BUILD_TYPE                
CMAKE_INSTALL_PREFIX            /home/campr/metacentrum_opencv_demo_install
OpenCV_DIR                      /afs/ics.muni.cz/software/opencv-2.4/share/OpenCV
```

`OpenCV_DIR` should be set automatically. Adjust `CMAKE_INSTALL_PREFIX` to link to your `metacentrum_opencv_demo_install` directory.

Press `c` to configure, `g` to generate project (makefile etc. will be created). 

In `metacentrum_opencv_demo_build` directory execute:

    make install

This will compile the project. In case no error was thrown, the resulting files (binary executable and sample videos) will be installed to `metacentrum_opencv_demo_install` directory.

To test, in `metacentrum_opencv_demo_install/bin` directory, execute:

    ./opencv_demo ../samples/test.avi

This will output a set of points (one point per frame from input video). 

