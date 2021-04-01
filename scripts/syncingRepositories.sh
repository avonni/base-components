#!/usr/bin/env bash

# Full path to base-components as exemple: (/Users/Documents/AVONNI/base-components/src/modules/base): 
baseComponentsPath="/Users/alex/Documents/AVONNI/base-components/src/modules/base"

# Full path to base-components-sfdx as exemple: (/Users/Documents/AVONNI/base-components-sfdx/src/modules/base/lwc): 
baseComponentsSfdxPath="/Users/alex/Documents/AVONNI/base-components-sfdx/src/modules/base/lwc"

containsElement () {
  local e match="$1"
  shift
  for e; do [[ "$e" == "$match" ]] && return 0; done
  return 1
}

# 1. Clearing base-components-sfdx lwc folder (excluding folders from "notRemoveFolders")

notRemoveFolders=(
    "avonniIllustration"
    "avonniButtonNavigation"
)

for file in "${baseComponentsSfdxPath}/"*
do 
    folderName=${file##*/}

    containsElement "${folderName}" "${notRemoveFolders[@]}"
    valNumResult=$?

    if [[ $valNumResult -ne 0 ]]
    then
        rm -r "$file"
    fi
done

# 2. Copying folders from base-components to base-components-sfdx lwc (excluding folders from "notCopyFolders")

notCopyFolders=(
    "illustration"
    "colorPickerCustom"
    "colorPickerPanel"
    "emojiPicker"
    "externalLink"
    "inputRichText"
    "link"
    "linkToNonSalesforceResource"
    "map"
    "messageDispatcher"
    "positionLibrary"
    "primitiveColorpickerButton"
    "primitiveCoordinateItem"
    "primitiveIframe"
    "primitiveSelect"
    "quillLib"
    "storybookWrappers"
)

for file in "${baseComponentsPath}/"*
do 
    folderName=${file##*/}
    containsElement "${folderName}" "${notCopyFolders[@]}"
    valNumResult=$?

    if [[ $valNumResult -ne 0 ]]
    then
        cp -r "$file" "$baseComponentsSfdxPath"
    fi
done

# 3. Removing documentation and tests folders

find ${baseComponentsSfdxPath} -name __docs__ -a -prune -exec rm -rf {} \;
find ${baseComponentsSfdxPath} -name __examples__ -a -prune -exec rm -rf {} \;
find ${baseComponentsSfdxPath} -name __tests__ -a -prune -exec rm -rf {} \;

# 4. Adding the avonni prefix (excluding folders from "notRenameFolders")

notRenameFolders=(
    "avonniButtonNavigation"
    "avonniIllustration"
    "configProvider"
    "iconUtils"
    "inputUtils"
    "internationalizationLibrary"
    "iso8601Utils"
    "utils"
    "utilsPrivate"
    "jsconfig.json"
)

notRenameFiles=(
    "confettiLib.js"
)

for folder in "${baseComponentsSfdxPath}/"*
do 
    folderName=${folder##*/}
    containsElement "${folderName}" "${notRenameFolders[@]}"
    valNumResult=$?

    if [[ $valNumResult -ne 0 ]]
    then
        folderName="avonni$(tr '[:lower:]' '[:upper:]' <<< ${folderName:0:1})${folderName:1}"
        mv "$folder" "$(dirname "$folder")/${folderName}"

        # Adding avonni prefix
        find "$(dirname "$folder")/${folderName}" -type f -name '*.js' -exec sed -i '' "s/export default class /export default class Avonni/g" {} \;
        find "$(dirname "$folder")/${folderName}" -type f -name '*.html' -exec sed -i '' "s/c-input-rich-text/lightning-input-rich-text/g" {} \;
        find "$(dirname "$folder")/${folderName}" -type f -name '*.html' -exec sed -i '' "s/<c-/<c-avonni-/g" {} \;
        find "$(dirname "$folder")/${folderName}" -type f -name '*.html' -exec sed -i '' "s/<\/c-/<\/c-avonni-/g" {} \;

        for file in "$(dirname "$folder")/${folderName}"/*
        do 
            fileName=${file##*/}
            fileNameWithPrefix="avonni$(tr '[:lower:]' '[:upper:]' <<< ${fileName:0:1})${fileName:1}"

            find "$(dirname "$folder")/${folderName}" -type f -name '*.js' -exec sed -i '' "s/\/${fileName}/\/${fileNameWithPrefix}/g" {} \;

            containsElement "${fileName}" "${notRenameFiles[@]}"
            valFileNumResult=$?

            if [[ $valFileNumResult -ne 0 ]]
            then
                mv "$file" "$(dirname "$file")/${fileNameWithPrefix}"
            fi
        done
    fi
done