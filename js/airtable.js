// DOWNLOAD SCRIPT




// AIRTABLE SCRIPT

// rename images

// img refs

function createImgRef(imgObj) { // obj with less properties

    let ref = {
        "id": imgObj.id,
        "width": imgObj.width,
        "height": imgObj.height,
        "xFieldName": imgObj.xFieldName,
        "xImgIndex": imgObj.xImgIndex,
        "xFileExt": imgObj.xFileExt
    }

    return ref;
}

// get records

let table = base.getTable("Projects");

let imgFields = ["Thumbnail image", "Hero image", "B - Images", "D - Images", "F - Images"];
let otherFields = ["Status", "Image Refs"];
let queryFields = imgFields.concat(otherFields);

let imgQuery = await table.selectRecordsAsync({
    fields: queryFields
});

// get data

let imgData = new Array();

imgQuery.records.forEach(function(record) {

    let imgRefsVal = record.getCellValue("Image Refs");
    let recordStatus = record.getCellValue("Status");

    // don't operate the rest of function on records that haven't been updated
    // and don't operate on records that aren't approved
    if (
        (imgRefsVal == "" || imgRefsVal == null) &&
        recordStatus.name == "Approved"
    ) {

        let imgRefs = new Object();

        imgFields.forEach(function(fieldName) {
            
            let fieldValue = record.getCellValue(fieldName);

            if (fieldValue !== null) {

                imgRefs[fieldName] = new Array();

                fieldValue.forEach(function(imgObj, index) {

                    let fileExt = imgObj.filename.split(".");
                    fileExt = fileExt[fileExt.length - 1];

                    imgObj.xRecordId = record.id;
                    imgObj.xRecordName = record.name;
                    imgObj.xFileExt = fileExt;
                    // imgObj.xFieldName = fieldName;
                    // imgObj.xImgIndex = index;

                    imgData.push(imgObj);
                    imgRefs[fieldName].push(createImgRef(imgObj));
                });
            }
        });

        // change to string

        imgRefs = JSON.stringify(imgRefs);

        // add image ref string to Airtable field

        table.updateRecordAsync(record.id, {
            "Image Refs": imgRefs,
        });
    }
});

// output.inspect(imgData);

// download all thumbnails