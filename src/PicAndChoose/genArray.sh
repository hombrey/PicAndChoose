#!/bin/bash
ls $1 > /tmp/list.txt

echo "promptSet = [" > fillarray.js
input="/tmp/list.txt"
while IFS= read -r line
do
    EVAL=`echo " \"$line\" "`
    if [[ $EVAL == *"jpg"* || $EVAL == *"png"* || $EVAL == *"gif"* ]]; then
        echo "        new PromptString(\"$line\",1)," >> fillarray.js
    fi
done < "$input"

rm /tmp/list.txt
echo "new PromptString(\"\",0)];" >> fillarray.js
