#!/usr/bin/env bash

# Full path to base-components modules as exemple: (/Users/Documents/AVONNI/base-components/src/modules): 
baseComponentsPath="/Users/jeanbaptisteverge/Documents/GitHub/base-components/src/modules"

# Full path to base-components-sfdx modules as exemple: (/Users/Documents/AVONNI/base-components-sfdx/src/modules): 
baseComponentsSfdxPath="/Users/jeanbaptisteverge/Documents/GitHub/base-components-sfdx/src/modules"

containsElement () {
  local e match="$1"
  shift
  for e; do [[ "$e" == "$match" ]] && return 0; done
  return 1
}

for module in "${baseComponentsPath}/"*
do 
    # 1. Create a new folder if doesn't exist in base-components-sfdx modules.

    moduleFolderName=${module##*/}

    [ ! -d "${baseComponentsSfdxPath}/${moduleFolderName}" ] && (
        mkdir "${baseComponentsSfdxPath}/${moduleFolderName}"
        mkdir "${baseComponentsSfdxPath}/${moduleFolderName}/lwc"
    )

    # 2. Clearing base-components-sfdx lwc folder (excluding folders from "notRemoveFolders")

    notRemoveFolders=(
        "avonniIllustration"
        "avonniButtonNavigation"
        "avonniPrimitiveIcon"
    )

    for file in "${baseComponentsSfdxPath}/${moduleFolderName}/lwc/"*
    do 
        if [[ "${baseComponentsSfdxPath}/${moduleFolderName}/lwc/*" != ${file} ]]; 
        then
            folderName=${file##*/}

            containsElement "${folderName}" "${notRemoveFolders[@]}"
            valNumResult=$?

            if [[ $valNumResult -ne 0 ]]
            then
                rm -r "$file"
            fi
        fi
    done

    # 3. Copying folders from base-components to base-components-sfdx lwc (excluding folders from "notCopyFolders")

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
        "primitiveColorpickerButton"
        "primitiveCoordinateItem"
        "primitiveIcon"
        "primitiveIframe"
        "primitiveSelect"
        "quillLib"
        "storybookWrappers"
    )

    for file in "${baseComponentsPath}/${moduleFolderName}/"*
    do 
        folderName=${file##*/}
        containsElement "${folderName}" "${notCopyFolders[@]}"
        valNumResult=$?

        if [[ $valNumResult -ne 0 ]]
        then
            cp -r "$file" "$baseComponentsSfdxPath/${moduleFolderName}/lwc"
        fi
    done

    # 4. Removing documentation and tests folders

    find "$baseComponentsSfdxPath/${moduleFolderName}/lwc" -name __docs__ -a -prune -exec rm -rf {} \;
    find "$baseComponentsSfdxPath/${moduleFolderName}/lwc" -name __examples__ -a -prune -exec rm -rf {} \;
    find "$baseComponentsSfdxPath/${moduleFolderName}/lwc" -name __tests__ -a -prune -exec rm -rf {} \;

    # 5. Adding the avonni prefix (excluding folders from "notRenameFolders")

    notRenameFolders=(
        "avonniButtonNavigation"
        "avonniIllustration"
        "avonniPrimitiveIcon"
        "configProvider"
        "iconUtils"
        "inputUtils"
        "internationalizationLibrary"
        "iso8601Utils"
        "luxon"
        "utils"
        "utilsPrivate"
        "tooltipLibrary"
        "positionLibrary"
        "jsconfig.json"
    )

    notRenameFiles=()

    for folder in "$baseComponentsSfdxPath/${moduleFolderName}/lwc/"*
    do 
        if [[ "$baseComponentsSfdxPath/${moduleFolderName}/lwc/*" != ${folder} ]]; 
        then
            folderName=${folder##*/}
            containsElement "${folderName}" "${notRenameFolders[@]}"
            valNumResult=$?

            if [[ $valNumResult -ne 0 ]]
            then
                prefix="avonni"

                if [[ ${moduleFolderName} != "base" ]];
                then
                    prefix="${prefix}$(tr '[:lower:]' '[:upper:]' <<< ${moduleFolderName:0:1})${moduleFolderName:1}"
                fi

                folderName="${prefix}$(tr '[:lower:]' '[:upper:]' <<< ${folderName:0:1})${folderName:1}"
                mv "$folder" "$(dirname "$folder")/${folderName}"

                # Adding avonni prefix

                find "$(dirname "$folder")/${folderName}" -type f -name '*.js' -exec sed -i '' "s/export default class /export default class $(tr '[:lower:]' '[:upper:]' <<< ${prefix:0:1})${prefix:1}/g" {} \;
                find "$(dirname "$folder")/${folderName}" -type f -name '*.js' -exec sed -i '' "s/querySelector('c-/querySelector('c-avonni-/g" {} \;
                find "$(dirname "$folder")/${folderName}" -type f -name '*.html' -exec sed -i '' "s/c-input-rich-text/lightning-input-rich-text/g" {} \;
                find "$(dirname "$folder")/${folderName}" -type f -name '*.html' -exec sed -i '' "s/<avonni-/<c-/g" {} \;
                find "$(dirname "$folder")/${folderName}" -type f -name '*.html' -exec sed -i '' "s/<\/avonni-/<\/c-/g" {} \;
                find "$(dirname "$folder")/${folderName}" -type f -name '*.html' -exec sed -i '' "s/<c-/<c-avonni-/g" {} \;
                find "$(dirname "$folder")/${folderName}" -type f -name '*.html' -exec sed -i '' "s/<\/c-/<\/c-avonni-/g" {} \;

                for file in "$(dirname "$folder")/${folderName}"/*
                do 
                    if [[ "$(dirname "$folder")/${folderName}/*" != ${file} ]]; 
                    then
                        fileName=${file##*/}
                        fileNameWithPrefix="${prefix}$(tr '[:lower:]' '[:upper:]' <<< ${fileName:0:1})${fileName:1}"

                        fileNameWithoutExtension="${fileName%.*}"
                        fileNameWithoutExtensionWithPrefix="${prefix}$(tr '[:lower:]' '[:upper:]' <<< ${fileNameWithoutExtension:0:1})${fileNameWithoutExtension:1}"

                        find "$(dirname "$folder")/${folderName}" -type f -name '*.js' -exec sed -i '' "s/\.\/${fileNameWithoutExtension}/.\/${fileNameWithoutExtensionWithPrefix}/g" {} \;
                        find "$(dirname "$folder")/${folderName}" -type f -name '*.css' -exec sed -i '' "s/\.\/${fileNameWithoutExtension}/.\/${fileNameWithoutExtensionWithPrefix}/g" {} \;

                        containsElement "${fileName}" "${notRenameFiles[@]}"
                        valFileNumResult=$?

                        if [[ $valFileNumResult -ne 0 ]]
                        then
                            mv "$file" "$(dirname "$file")/${fileNameWithPrefix}"
                        fi
                    fi
                done
            fi
        fi
    done
done
