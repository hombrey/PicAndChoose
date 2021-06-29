#1/bin/bash
ls $1 > list.txt

echo $1 > array.txt
input="./list.txt"
while IFS= read -r line
do
    echo "        \"$line\"," >> array.txt
done < "$input"
rm list.txt


