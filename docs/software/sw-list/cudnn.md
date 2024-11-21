# CuDNN

    module avail cudnn/

[CuDNN](https://developer.nvidia.com/cudnn) (CUDA Deep Neural Network library) is a GPU-accelerated library developed by NVIDIA specifically for deep learning frameworks and applications.

## License

You have to be registered in NVIDIA Accelerated Computing Developer Program and agree with their [licence](https://developer.nvidia.com/rdp/assets/cudnn-65-eula-asset). Then confirm the [licence form](https://signup.e-infra.cz/fed/registrar/?vo=meta&group=lic_cudnn).

!!! note
    `cudnn/` are standalone modules. Usually you need to use it with some of [CUDA modules](../../../software/sw-list/cuda). 

## GPU clusters

CuDNN only works on GPUs with high enough computing capabilities. 

In this table, you can see information about individual GPU clusters and of their GPUs support CuDNN library: 

--8<-- "GPU-clusters-table.md"






