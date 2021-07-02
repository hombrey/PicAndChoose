#!/bin/bash
ls $1 > list.txt

echo "promptSet = [" > fillarray.js
input="./list.txt"
while IFS= read -r line
do
    EVAL=`echo " \"$line\" "`
    if [[ $EVAL == *"jpg"* || $EVAL == *"png"* ]]; then
        echo "        new PromptString(\"$line\",1)," >> fillarray.js
    fi
done < "$input"

rm list.txt
echo "new PromptString(\"\",0)];" >> fillarray.js

#echo "        new PromptString(\"$line\",1)," >> array.txt
