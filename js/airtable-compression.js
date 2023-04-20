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

let tableName = "Projects"; // "Graduate Profiles" || "Projects" || "Featured Projects"

let table = base.getTable(tableName);
let imgFields;
let otherFields = ["Status", "Image Refs"];

if (tableName == "Projects") {
    imgFields = [
        "Thumbnail image", // "Hero image", "B - Images", "D - Images", "F - Images",
        "Thumbnail compressed" // , "Hero compressed", "B compressed", "D compressed", "F compressed"
    ];
} else if (tableName == "Graduate Profiles") {
    imgFields = ["Portrait", "Profile picture", "Portrait compressed"];
} else if (tableName == "Featured Projects") {
    imgFields = ["Thumbnail image"];
}

let queryFields = imgFields.concat(otherFields);

let imgQuery = await table.selectRecordsAsync({
    fields: queryFields
});

// only for records with blank Image Refs field
let checkImgRefs = true;
// original image source field!!
let srcField = "Thumbnail";
// compressed image target field
let tgtField = "Thumbnail compressed";
// image params
let imgParams = "?fm=webp&fit=crop&w=735&h=422";


// get data

let imgData = new Array();

imgQuery.records.forEach(function(record) {

    let imgRefsVal = record.getCellValue("Image Refs");
    let recordStatus = record.getCellValue("Status");

    let tgtFieldVal = record.getCellValue(tgtField);

    // don't operate the rest of function on records that haven't been updated
    // and don't operate on records that aren't approved

    if (!checkImgRefs) {
        imgRefsVal = null;
    }

    if (
        (imgRefsVal == "" || imgRefsVal == null) 
        &&
        recordStatus.name == "Approved" 
        // && 
        // (tgtFieldVal == null || tgtFieldVal == "" || tgtFieldVal.length == 0)
    ) {

        let imgRefs = new Object();

        imgFields.forEach(function(fieldName) {
            
            let fieldValue = record.getCellValue(fieldName);

            if (fieldValue !== null) {

                let newURLs = [];

                imgRefs[fieldName] = new Array();

                fieldValue.forEach(function(imgObj, index) {

                    let fileExt = imgObj.filename.split(".");
                    fileExt = fileExt[fileExt.length - 1];

                    imgObj.xRecordId = record.id;
                    imgObj.xRecordName = record.name;
                    imgObj.xFileExt = fileExt;
                    // imgObj.xFieldName = fieldName;
                    // imgObj.xImgIndex = index;

                    /* let singleURL;

                    if (fieldName == srcField) {
                        let id = imgObj.id;
                        let newURL = "https://desn.imgix.net/" + imgObj.id + "." + imgObj.xFileExt + imgParams;

                        singleURL = newURL;
                        newURLs.push({url: newURL});
                    }

                    let currentCellVal = record.getCellValue(tgtField);

                    if (currentCellVal == null || currentCellVal == "") {
                        currentCellVal = [];
                    }

                    table.updateRecordAsync(record.id, {
                        [tgtField]: [...currentCellVal, {url: singleURL}]
                    })*/



                    imgData.push(imgObj);
                    imgRefs[fieldName].push(createImgRef(imgObj));
                });
            }
        });

        // change to string

        imgRefs = JSON.stringify(imgRefs);

        // add image ref string to Airtable field

        table.updateRecordAsync(record.id, {
            "Image Refs": imgRefs
        });
    }
});

output.inspect(imgData);
output.text(JSON.stringify(imgData));

// download all thumbnails
