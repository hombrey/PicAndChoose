#1/bin/bash
ls $1 > list.txt

echo $1 > array.txt
echo "    ansSet = [" >> array.txt
input="./list.txt"
while IFS= read -r line
do
    echo "        new PromptString(\"$line\",1)," >> array.txt
done < "$input"
    echo "    new PromptSmartString(\"\",1)];" >> array.txt
rm list.txt


