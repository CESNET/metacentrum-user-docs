# Converting Jupyter Notebook to PDF

In this tutorial we will see how to convert your jupyter notebook or ipython notebook source files to pdf or html. There are several ways of accomplishing this task, but we will be using two of these methods.

## Requirements

To begin, you will need to install the following required packages. These requirements are needed for both Windows and Unix based systems such as Linux.

```
nbconvert
pandoc
texlive xetex/miktex
```

For Linux

    sudo apt-get install pandoc texlive-xetex

nbconvert already comes with Jupyterlab or Jupyter Notebook, but you can install it separately by using

     pip install nbconvert

For Windows you can get the software from their official website below

- [Pandoc](https://pandoc.org/installing.html)
- [MikTex](https://miktex.org/download)

## Using the CLI Option

To use the CLI option, you can use `nbconvert`. To create a pdf or html from the notebook use

    jupyter nbconvert --to FORMAT mynotebook.ipynb

To convert to PDF

    jupyter nbconvert --to pdf mynotebook.ipynb

You can also use this format to convert multiple notebooks at once

    jupyter nbconvert --to pdf mynotebook.ipynb notebook2.ipynb

You can check [this video tutorial](https://www.youtube.com/watch?v=Lbu5mNuhbYM).

## Links

[https://jcharistech.wordpress.com/2019/07/28/how-to-convert-jupyter-notebooks-to-pdf](https://jcharistech.wordpress.com/2019/07/28/how-to-convert-jupyter-notebooks-to-pdf)
