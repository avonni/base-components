cmpname=`ls ./src/modules/base/`    
for cmp in $cmpname
do
   ./node_modules/jsdoc/jsdoc.js ./src/modules/base/$cmp/$cmp.js ./src/modules/base/$cmp/__docs__/$cmp.jsdoc.js -t ./jsdoc -c ./jsdoc/jsdoc.config.json -d console > ./docs/$cmp.json
done