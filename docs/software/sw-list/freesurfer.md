# Freesurfer 

    module avail freesurfer/

[Freesurfer](https://surfer.nmr.mgh.harvard.edu/) is a set of automated tools for reconstruction of the brain’s cortical surface from structural MRI data. 

## Usage

### Parallel usage

For parallel use you can run the job on the multiprocessor machine (with proper amount of memory) and add the proper switch to freesurfer tools which supports it.

For example to the `mri_glmfit-sim` you can add `--bg number_of_processors` parameter. On the basis of tutorial and downloaded data set you can use following example:

```
qsub -X -I -q short -l nodes=1:ppn=8,mem=4gb#excl
...
export SUBJECTS_DIR=/scratch/hanousek/fsf_demo/samples/buckner_data/tutorial_subjs
cd $SUBJECTS_DIR/glm
mris_preproc --fsgd gender_age.fsgd --cache-in thickness.fwhm10.fsaverage --target fsaverage --hemi lh --out lh.gender_age.thickness.10.mgh
mri_glmfit --y lh.gender_age.thickness.10.mgh --fsgd gender_age.fsgd dods --C lh-Avg-thickness-age-Cor.mtx --surf fsaverage lh --cortex --glmdir lh.gender_age.glmdir
mri_glmfit-sim --glmdir lh.gender_age.glmdir --sim mc-z 100 4 mc-z.negative --sim-sign neg --overwrite --bg 8
```

Computing of 100 iterations run by the last row lasts without 8-processor parallelization (without parameter `--bg 8`) approx. 50 minutes, with parallelization about 8 minutes. You can use more processors to shorten the computing.

### Possible faults

**Memory allocation**

Memory allocation failure, ie:

```
reading colortable from annotation file...
colortable with 36 entries read (originally /autofs/space/terrier_001/users/nicks/freesurfer/average/colortable_desikan_killiany.txt)
*** glibc detected *** mri_surfcluster: malloc(): memory corruption: 0x0000000029b768d0 ***
```

Occured while try the submission:

```
/storage/brno2/home/hanousek/inst/freesurfer_project/samples/buckner_data/tutorial_subjs/glm$ mri_glmfit-sim --glmdir lh.gender_age.glmdir --sim mc-z 40 4 mc-z.negative --sim-sign neg --overwrite
```

after adding the `--bg 8` was everything OK.

Conclusion: Maybe it depends on the count of executed iterations defined by `--sim mc-z 40 4 mc-z.negative` parameter (here 40). 



