# I get "permission denied" when I try to clean up scratch directory

The common confusion is that users try to remove the whole scratch directory

rm -rf $SCRATCHDIR

while they should, and are allowed to, remove only the content of the scratch directory:

rm -rf $SCRATCHDIR/*

The empty scratch directory will be removed automatically after some time. 
