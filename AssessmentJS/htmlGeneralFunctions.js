/**
 * Created by Fafa on 10/1/18.
 */

var flag = false;

/**
 *
 * @param tableID
 * @param selectIDName
 * @param noteIDName
 * create access limitation dynamically
 */
function addAccessLimitation(tableID,selectIDName,noteIDName)
{
    // console.log(tableID);
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    var id = rowCount - 9;
    // console.log(id);
    var row = table.insertRow(id+1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);


    //create limitation select options for cell 1
    var limitationOption = ["Reasonably Accessible","Partially Accessible - Obstructed","Partially Accessible - Inspection Safety Hazard",
        "Not Accessible - Obstructed","Not Accessible - Inspection Safety Hazard"];
    var selectList = document.createElement("select");
    selectList.id = selectIDName + id;

    //Create and append the options
    for (var i = 0; i < limitationOption.length; i++) {
        var option = document.createElement("option");
        option.value = limitationOption[i];
        option.text = limitationOption[i];
        selectList.appendChild(option);
    }
    cell1.appendChild(selectList);


    //create the limitation notes for cell2
    var textArea = document.createElement('textarea');
    textArea.setAttribute('class','form-control');
    textArea.setAttribute('title','limitationNotes');
    textArea.id = noteIDName + id;
    cell2.appendChild(textArea);

}


function addRecommendations(labelID,selectID)
{
    var label = document.getElementById(labelID);
    label.value += document.getElementById(selectID).value + ' ';
}

function clearRecommendation(labelID)
{
    var label = document.getElementById(labelID);
    label.value = "";
    label.placeholder = "Recommendations will be displayed here";
}


function moreEvidentDefect()
{

    var newEDIDNumber;
    var newEDID;
    var div = document.getElementById('evidentDefectSummary');
    var divNumber = $('#evidentDefectSummary').find('> div').length;
    //console.log(divNumber);
    var lastRowIDNo = divNumber - 1;

    var lastRowID = 'EDRow' + lastRowIDNo;
    //console.log(lastRowID);
    var nestDivNumber = document.getElementById(lastRowID).childElementCount;
    //console.log(nestDivNumber);
    if (nestDivNumber === 3)
    {
        //need to create a new big DIV and a small div contain the label and select option
        var emptyLine = document.createElement('br');
        div.appendChild(emptyLine);
        var newDivID = 'EDRow' + divNumber;
        console.log(newDivID);
        newEDIDNumber = divNumber * 3;
        newEDID = 'ED' + newEDIDNumber;
        console.log(newEDID);

        var newDivRow = document.createElement('div');
        newDivRow.setAttribute('class', 'row');
        newDivRow.id = 'EDRow' + divNumber;
        div.appendChild(newDivRow);

        var newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'col-sm-4');
        newDiv.id = 'ED' + newEDIDNumber;
        newDivRow.appendChild(newDiv);


        var name = document.createElement('INPUT');
        name.setAttribute('class', 'form-control');
        name.setAttribute('title', 'name');
        name.setAttribute('type','text');

        name.id = 'EDName' + newEDIDNumber;
        newDiv.appendChild(name);


        var selectList = document.createElement("select");
        selectList.id = "EDSelect" + newEDIDNumber;
        selectList.style.width = '100%';
        var selectOption = ["✔", "XX", 'X', 'U', 'NA'];
        var selectOptionValue = ["√", "XX", 'X', 'U', 'NA'];
        var selectValue = ["No Visible Significant Defect", "Major Defect", "Maintenance Item or Minor Defect",
            "Unknown / Inaccessible / Not Tested", "Not Applicable; No Such Item"];


        //Create and append the options
        for (var i = 0; i < selectOption.length; i++) {
            var option = document.createElement("option");
            var group = document.createElement('optgroup');
            group.label = selectValue[i];
            option.value = selectOptionValue[i];
            option.text = selectOption[i];
            group.appendChild(option);
            selectList.appendChild(group);
        }

        newDiv.appendChild(selectList);


    }
    else
    {
        //just create a new small div and append to the last existing

        var lastDivRow = document.getElementById(lastRowID);
        newEDIDNumber = (divNumber - 1) * 3 + nestDivNumber;
        console.log(newEDIDNumber);
        var newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'col-sm-4');
        newDiv.id = 'ED' + newEDIDNumber;
        lastDivRow.appendChild(newDiv);


        var name = document.createElement('INPUT');
        name.setAttribute('class', 'form-control');
        name.setAttribute('title', 'name');
        name.setAttribute('type','text');

        name.id = 'EDName' + newEDIDNumber;
        newDiv.appendChild(name);


        var selectList = document.createElement("select");
        selectList.id = "EDSelect" + newEDIDNumber;
        selectList.style.width = '100%';
        var selectOption = ["✔", "XX", 'X', 'U', 'NA'];
        var selectOptionValue = ["√", "XX", 'X', 'U', 'NA'];
        var selectValue = ["No Visible Significant Defect", "Major Defect", "Maintenance Item or Minor Defect",
            "Unknown / Inaccessible / Not Tested", "Not Applicable; No Such Item"];


        //Create and append the options
        for (var i = 0; i < selectOption.length; i++) {
            var option = document.createElement("option");
            var group = document.createElement('optgroup');
            group.label = selectValue[i];
            option.value = selectOptionValue[i];
            option.text = selectOption[i];
            group.appendChild(option);
            selectList.appendChild(group);
        }

        newDiv.appendChild(selectList);
    }
}





/**
 * Check if Summary of the Condition of the Property selects the [Other] option - BetterTENG 
 * */
function checkIfOther() {
    if (document.getElementById('conditionOfBuilding').value == 'Other') {
        document.getElementById('XiaoKe').style.display = 'block';
        flag = true;
        return 'otherSelected';
    }
    if (flag) {
        if (document.getElementById('conditionOfBuilding').value != 'Other') {
            document.getElementById('XiaoKe').style.display = 'none';
            flag = false;
            return 'otherNotSelected';
        }
    }
    return 'normalCondition';
}


/**
 * Open extra fields for the input, fields have been coded in the html, not create dynamically
 */
function moreSiteGardenBoundaries() {
    var div = document.getElementById('SiteGardenBoundary');
    var button = document.getElementById('moreBoundariesButton');
    // var div2 = document.getElementById('SiteGardenBoundary2');
    if (div.style.display === 'none') {
        div.style.display = 'block';
        button.innerHTML = "Hide";
    }
    else {
        div.style.display = 'none';
        button.innerHTML = "Add More Boundaries";
    }

}

function moreSiteGardenSheds() {
    var div = document.getElementById('SiteGardenShed');
    var button = document.getElementById('moreShedButton');

    if (div.style.display === 'none') {
        div.style.display = 'block';
        button.innerHTML = "Hide";
    }
    else {
        div.style.display = 'none';
        button.innerHTML = "Add More Garage or Sheds";
    }

}

function morePropertyExteriorWall() {
    var div = document.getElementById('PropertyExteriorWall');
    var button = document.getElementById('morePropertyExteriorWallButton');
    if (div.style.display === 'none') {
        div.style.display = 'block';
        button.innerHTML = "Hide"
    }
    else {
        div.style.display = 'none';
        button.innerHTML = "Add More Wall"
    }

}

function morePropertyExteriorVerandas() {
    var div = document.getElementById('PropertyExteriorVerandas');
    var button = document.getElementById('morePropertyExteriorVerandasButton');
    if (div.style.display === 'none') {
        div.style.display = 'block';
        button.innerHTML = "Hide"
    }
    else {
        div.style.display = 'none';
        button.innerHTML = "Add More Verandahs"
    }

}

function moreLivingAreaRooms() {
//    alert("you click add more rooms button LivingAreaRooms moreLivingAreaRoomButton")
    var div = document.getElementById('LivingAreaRooms');
    var button = document.getElementById('moreLivingAreaRoomButton');
    if (div.style.display === 'none') {
        div.style.display = 'block';
        button.innerHTML = "Hide"
    }
    else {
        div.style.display = 'none';
        button.innerHTML = "Add More Rooms"
    }
}

function moreLivingAreaStair() {

    var div = document.getElementById('LivingAreaStair2');
    var button = document.getElementById('moreLivingAreaStairButton');
    if (div.style.display === 'none') {
        div.style.display = 'block';
        button.innerHTML = "Hide"
    }
    else {
        div.style.display = 'none';
        button.innerHTML = "Add One Stair"
    }
}

function moreLivingAreaKitchen() {

    var div = document.getElementById('LivingAreaKitchen2');
    var button = document.getElementById('moreLivingAreaKitchenButton');
    if (div.style.display === 'none') {
        div.style.display = 'block';
        button.innerHTML = "Hide"
    }
    else {
        div.style.display = 'none';
        button.innerHTML = "Add One Kitchen"
    }
}

function moreBedrooms() {
    var div = document.getElementById('BedroomAreasMoreRooms');
    var button = document.getElementById('moreBedroomsButton');
    if (div.style.display === 'none') {
        div.style.display = 'block';
        button.innerHTML = "Hide"
    }
    else {
        div.style.display = 'none';
        button.innerHTML = "Add More Bedrooms"
    }
}

function moreBathrooms() {
    var div = document.getElementById('ServiceAreaBathRooms');
    var button = document.getElementById('moreBathroomsButton');
    if (div.style.display === 'none') {
        div.style.display = 'block';
        button.innerHTML = "Hide"
    }
    else {
        div.style.display = 'none';
        button.innerHTML = "Add More Bathroom"
    }

}

function morePowderRooms() {

    var div = document.getElementById('ServiceAreaMorePowderRooms');
    var button = document.getElementById('morePowderRoomsButton');
    if (div.style.display === 'none') {
        div.style.display = 'block';
        button.innerHTML = "Hide"
    }
    else {
        div.style.display = 'none';
        button.innerHTML = "Add More Powder Rooms"
    }
}

function moreLaundry() {
    var div = document.getElementById('ServiceAreaMoreLaundry');
    var button = document.getElementById('moreLaundryButton');
    if (div.style.display === 'none') {
        div.style.display = 'block';
        button.innerHTML = "Hide"
    }
    else {
        div.style.display = 'none';
        button.innerHTML = "Add One Laundry"
    }
}

/**
 * Images
 */


function AssessmentCoverImage(){
    document.getElementById('AssessmentUploadCoverImage').click();
}
$("#AssessmentUploadCoverImage").change(function(){

    if(this.files && this.files[0]) {
        var imageFile = this.files[0];
        var imageType = imageFile.type;
        var imageName = imageFile.name;
        var date = new Date();
        // console.log(imageType);
        // console.log(imageName);
        loadImage.parseMetaData(imageFile, function (data) {
            console.log('I am in loadImage function');
            var orientation = 0;
            var image = document.getElementById('AssessmentCoverImage');
            var removeButton = document.getElementById('AssessmentCoverImageRemoveButton');
            //if exif data available, update orientation
            if (data.exif) {
                orientation = data.exif.get('Orientation');
            }
            var loadingImage = loadImage(imageFile, function (canvas) {
                    var base64data = canvas.toDataURL(imageType);
                    //var img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
                    image.setAttribute('src',base64data);
                    removeButton.style.display = 'block';
                    //removeButton.style.width = '100%';
                    image.alt = 'Cover Image';
                    image.style.display = 'block';
                    image.style.width = '100%';
                    image.style.height = '100%';
                    var file = new File([convertBase64UrlToBlob(base64data)], imageName, {type: imageType, lastModified:date.getTime()});
                    //console.log(file);
                    doUploadFile(file,'AssessmentCoverImage', '', 'AssessmentCoverImageRemoveButton', '','','cover image','','','','','100%','100%');

                },
                {
                    canvas: true,
                    orientation: orientation,
                    maxWidth:1300,
                    maxHeight:1000
                }
            );
        });
    }

});

function RemoveAssessmentCoverImage(){
    //RemoveCoverImage('AssessmentCoverImage','AssessmentCoverImageRemoveButton');
    var imageSelect = '#' + 'AssessmentCoverImage';
    $(imageSelect).attr('src', '#');
    var image = document.getElementById('AssessmentCoverImage');
    var button = document.getElementById('AssessmentCoverImageRemoveButton');

    button.style.display = 'none';
    image.style.width = '0px';

    doRemovePhoto('AssessmentCoverImage');
}





//Only upload one image per time
// function readOneImageURL(input, imageID0, addButtonID, removeButtonID, textID, imageSize) {
//     if (input.files && input.files[0]) {
//         var image = '#' + imageID0;
//         var reader = new FileReader();
//         var button = document.getElementById(addButtonID);
//         var removeButton = document.getElementById(removeButtonID);
//         var imageID = document.getElementById(imageID0);
//         var text = document.getElementById(textID);
//         reader.onload = function (e) {
//
//             $(image).attr('src', e.target.result);
//             button.style.display = 'none';
//             removeButton.style.display = 'block';
//             imageID.style.display = 'block';
//             imageID.style.width = imageSize;
//             imageID.style.height = imageSize;
//             text.style.display = 'block';
//         };
//         reader.readAsDataURL(input.files[0]);
//         doUploadFile(input.files[0],imageID0, textID, removeButtonID, addButtonID,'','','','','','',imageSize,imageSize);
//     }
// }

//Only upload one image per time
function readOneImageURL(input, imageID0, addButtonID, removeButtonID, textID, imageSize,nextAddButtonID) {
    if (input.files && input.files[0]) {
        var imageFile = input.files[0];
        var imageType = imageFile.type;
        var imageName = imageFile.name;
        var date = new Date();

        if (nextAddButtonID != "")
        {
            var nextAddButton = document.getElementById(nextAddButtonID);
            if (nextAddButton.style.display == 'none')
            {
                console.log('button is hidden, need to activate it');
                nextAddButton.style.display = 'block';
            }
            else
            {
                console.log('no need to activate');
            }
        }

        loadImage.parseMetaData(imageFile, function (data) {
            console.log("i am in loadImage function");
            var orientation = 0;
            var image = '#' + imageID0;
            var reader = new FileReader();
            var button = document.getElementById(addButtonID);
            var removeButton = document.getElementById(removeButtonID);
            var imageID = document.getElementById(imageID0);
            var description = document.getElementById(textID);
            imageID.alt = '';
            //if exif data available, update orientation
            if (data.exif) {
                orientation = data.exif.get('Orientation');
            }
            var loadingImage = loadImage(imageFile, function(canvas) {
                    //here's the base64 data result
                    var base64data = canvas.toDataURL('image/jpeg');
                    //here's example to show it as on imae preview
                    var img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
                    $(image).attr('src', base64data);
                    button.style.display = 'none';
                    removeButton.style.display = 'block';
                    imageID.style.display = 'block';
                    imageID.style.width = imageSize;
                    imageID.style.height = imageSize;
                    description.style.display = 'block';
                    var file = new File([convertBase64UrlToBlob(base64data)], imageName, {type: imageType, lastModified:date.getTime()});
                    doUploadFile(file,imageID0, textID, removeButtonID, addButtonID,'','','','','','',imageSize,imageSize);
                }, {
                    //should be set to canvas : true to activate auto fix orientation
                    canvas: true,
                    orientation: orientation,
                    maxWidth:1000,
                    maxHeight:850

                }
            );
        });
    }
}

//upload max 3 images
function read3ImagesURL(input, addButtonID0, addButtonID1, addButtonID2, imageID0, imageID1, imageID2, text0, text1, text2, removeButton0, removeButton1, removeButton2) {
    var count = input.files.length;
    var date = new Date();
    //check if the selected images are more than 3
    if (count > 3) {
        alert("You can only selected three images maximum, will display the first images");
    }

    //Display all the add button first
    var addButton0 = document.getElementById(addButtonID0);
    var addButton1 = document.getElementById(addButtonID1);
    var addButton2 = document.getElementById(addButtonID2);






    if (input.files && input.files[0]) {
        //Clear all the images if the user select a new one.
        document.getElementById(imageID0).setAttribute('src','#');
        document.getElementById(imageID1).setAttribute('src','#');
        document.getElementById(imageID2).setAttribute('src','#');
        //Hide all the remove buttons first if the user select a new image.
        document.getElementById(removeButton0).style.display = 'none';
        document.getElementById(removeButton1).style.display = 'none';
        document.getElementById(removeButton2).style.display = 'none';
        //Display the add buttons first if the user select a new image;
        addButton0.style.display = 'block';
        addButton1.style.display = 'block';
        addButton2.style.display = 'block';

        var imageFile = input.files[0];
        var imageType = imageFile.type;
        var imageName = imageFile.name;
        loadImage.parseMetaData(imageFile, function (data) {
            console.log("i am in loadImage function");
            var orientation = 0;
            //if exif data available, update orientation
            if (data.exif) {
                orientation = data.exif.get('Orientation');
            }
            var loadingImage = loadImage(imageFile, function(canvas) {
                    //here's the base64 data result
                    var base64data = canvas.toDataURL('image/jpeg');
                    //here's example to show it as on imae preview
                    // var img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
                    var image = '#' + imageID0;
                    $(image).attr('src', base64data);
                    var image = document.getElementById(imageID0);
                    var description = document.getElementById(text0);
                    var button = document.getElementById(removeButton0);
                    image.style.width = '265px';
                    image.style.height = '265px';
                    image.style.display = 'block';
                    description.style.display = 'block';
                    button.style.display = 'block';
                    addButton0.style.display = 'none';
                    var file = new File([convertBase64UrlToBlob(base64data)], imageName, {type: imageType, lastModified:date.getTime()});
                    doUploadFile(file,imageID0, text0, removeButton0, addButtonID0,'','','','','','','265px','265px');
                }, {
                    //should be set to canvas : true to activate auto fix orientation
                    canvas: true,
                    orientation: orientation,
                    maxWidth:1000,
                    maxHeight:850
                }
            );
            //doUploadFile(input.files[0],imageID0, text0, removeButton0, addButtonID0,'','','','','','','265px','265px');
        });
    }


    setTimeout(function(){ if (input.files && input.files[1]) {
        var imageFile = input.files[1];
        var imageType = imageFile.type;
        var imageName = imageFile.name;
        loadImage.parseMetaData(imageFile, function (data) {
            console.log("i am in loadImage function");
            var orientation = 0;
            //if exif data available, update orientation
            if (data.exif) {
                orientation = data.exif.get('Orientation');
            }
            var loadingImage = loadImage(
                input.files[1],
                function(canvas) {
                    //here's the base64 data result
                    var base64data = canvas.toDataURL('image/jpeg');
                    //here's example to show it as on image preview
                    var img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
                    var image = '#' + imageID1;
                    $(image).attr('src', base64data);
                    var image = document.getElementById(imageID1);
                    var description = document.getElementById(text1);
                    var button = document.getElementById(removeButton1);
                    image.style.width = '265px';
                    image.style.height = '265px';
                    image.style.display = 'block';
                    description.style.display = 'block';
                    button.style.display = 'block';
                    addButton1.style.display = 'none';
                    var file = new File([convertBase64UrlToBlob(base64data)], imageName, {type: imageType, lastModified:date.getTime()});
                    doUploadFile(file,imageID1, text1, removeButton1, addButtonID1,'','','','','','','265px','265px');
                }, {
                    //should be set to canvas : true to activate auto fix orientation
                    canvas: true,
                    orientation: orientation,
                    maxWidth:1000,
                    maxHeight:850

                }
            );
            //doUploadFile(input.files[1],imageID1, text1, removeButton1, addButtonID1,'','','','','','','265px','265px');
            //doUploadFile(loadingImage,imageID1, text1, removeButton1, addButtonID1,'','','','','','','265px','265px');
        });

    }},100);

    setTimeout(function(){ if (input.files && input.files[2]) {
        var imageFile = input.files[2];
        var imageType = imageFile.type;
        var imageName = imageFile.name;
        loadImage.parseMetaData(imageFile, function (data) {
            console.log("i am in loadImage function");
            var orientation = 0;
            //if exif data available, update orientation
            if (data.exif) {
                orientation = data.exif.get('Orientation');
            }
            var loadingImage = loadImage(input.files[2], function(canvas) {
                    //here's the base64 data result
                    var base64data = canvas.toDataURL('image/jpeg');
                    //here's example to show it as on imae preview
                    var img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
                    var image = '#' + imageID2;
                    $(image).attr('src', base64data);
                    var image = document.getElementById(imageID2);
                    var description = document.getElementById(text2);
                    var button = document.getElementById(removeButton2);
                    image.style.width = '265px';
                    image.style.height = '265px';
                    image.style.display = 'block';
                    description.style.display = 'block';
                    button.style.display = 'block';
                    addButton2.style.display = 'none';
                    var file = new File([convertBase64UrlToBlob(base64data)], imageName, {type: imageType, lastModified:date.getTime()});
                    doUploadFile(file,imageID2, text2, removeButton2, addButtonID2,'','','','','','','265px','265px');

                }, {
                    //should be set to canvas : true to activate auto fix orientation
                    canvas: true,
                    orientation: orientation,
                    maxWidth:1000,
                    maxHeight:850

                }
            );
            //doUploadFile(input.files[2],imageID2, text2, removeButton2, addButtonID2,'','','','','','','265px','265px');
            //doUploadFile(loadingImage,imageID2, text2, removeButton2, addButtonID2,'','','','','','','265px','265px');
        });
    } },120);



}

//upload max 6 images
function read6ImagesURL(input, addButtonID0, addButtonID1, addButtonID2, addButtonID3, addButtonID4, addButtonID5, imageID0, imageID1, imageID2, imageID3, imageID4, imageID5, text0, text1, text2, text3, text4, text5, removeButton0, removeButton1, removeButton2, removeButton3, removeButton4, removeButton5) {
    var count = input.files.length;
     var date = new Date();
    console.log(count);
    //check if the number of images are more than six
    if (count > 6) {
        alert("You can only selected six images maximum");
    }
    var addButton0 = document.getElementById(addButtonID0);
    var addButton1 = document.getElementById(addButtonID1);
    var addButton2 = document.getElementById(addButtonID2);
    var addButton3 = document.getElementById(addButtonID3);
    var addButton4 = document.getElementById(addButtonID4);
    var addButton5 = document.getElementById(addButtonID5);

    if (input.files && input.files[0]) {
        //Clear all the images if the user select a new one.
        document.getElementById(imageID0).setAttribute('src','#');
        document.getElementById(imageID1).setAttribute('src','#');
        document.getElementById(imageID2).setAttribute('src','#');
        document.getElementById(imageID3).setAttribute('src','#');
        document.getElementById(imageID4).setAttribute('src','#');
        document.getElementById(imageID5).setAttribute('src','#');
        //Display the add button if the user select a new one.
        addButton0.style.display = 'block';
        addButton1.style.display = 'block';
        addButton2.style.display = 'block';
        addButton3.style.display = 'block';
        addButton4.style.display = 'block';
        addButton5.style.display = 'block';
        //Hide all the remove buttons first if the user select a new one.
        document.getElementById(removeButton0).style.display = 'none';
        document.getElementById(removeButton1).style.display = 'none';
        document.getElementById(removeButton2).style.display = 'none';
        document.getElementById(removeButton3).style.display = 'none';
        document.getElementById(removeButton4).style.display = 'none';
        document.getElementById(removeButton5).style.display = 'none';
        var imageFile = input.files[0];
        var imageType = imageFile.type;
        var imageName = imageFile.name;
        loadImage.parseMetaData(imageFile, function (data) {
            console.log("i am in loadImage function");
            var orientation = 0;
            //if exif data available, update orientation
            if (data.exif) {
                orientation = data.exif.get('Orientation');
            }
            var loadingImage = loadImage(imageFile, function(canvas) {
                    //here's the base64 data result
                    var base64data = canvas.toDataURL('image/jpeg');
                    //here's example to show it as on imae preview
                    // var img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
                    var image = '#' + imageID0;
                    $(image).attr('src', base64data);
                    var image = document.getElementById(imageID0);
                    var description = document.getElementById(text0);
                    var button = document.getElementById(removeButton0);
                    image.style.width = '265px';
                    image.style.height = '265px';
                    image.style.display = 'block';
                    description.style.display = 'block';
                    button.style.display = 'block';
                    addButton0.style.display = 'none';
                    var file = new File([convertBase64UrlToBlob(base64data)], imageName, {type: imageType, lastModified:date.getTime()});
                    doUploadFile(file,imageID0, text0, removeButton0, addButtonID0,'','','','','','','265px','265px');
                }, {
                    //should be set to canvas : true to activate auto fix orientation
                    canvas: true,
                    orientation: orientation,
                    maxWidth:1000,
                    maxHeight:850
                }
            );
            //doUploadFile(input.files[0],imageID0, text0, removeButton0, addButtonID0,'','','','','','','265px','265px');
        });
    }


    setTimeout(function(){if (input.files && input.files[1]) {
        var imageFile = input.files[1];
        var imageType = imageFile.type;
        var imageName = imageFile.name;
        loadImage.parseMetaData(imageFile, function (data) {
            console.log("i am in loadImage function");
            var orientation = 0;
            //if exif data available, update orientation
            if (data.exif) {
                orientation = data.exif.get('Orientation');
            }
            var loadingImage = loadImage(imageFile, function(canvas) {
                    //here's the base64 data result
                    var base64data = canvas.toDataURL('image/jpeg');
                    //here's example to show it as on image preview
                    var img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
                    var image = '#' + imageID1;
                    $(image).attr('src', base64data);
                    var image = document.getElementById(imageID1);
                    var description = document.getElementById(text1);
                    var button = document.getElementById(removeButton1);
                    image.style.width = '265px';
                    image.style.height = '265px';
                    image.style.display = 'block';
                    description.style.display = 'block';
                    button.style.display = 'block';
                    addButton1.style.display = 'none';
                    var file = new File([convertBase64UrlToBlob(base64data)], imageName, {type: imageType, lastModified:date.getTime()});
                    doUploadFile(file,imageID1, text1, removeButton1, addButtonID1,'','','','','','','265px','265px');
                }, {
                    //should be set to canvas : true to activate auto fix orientation
                    canvas: true,
                    orientation: orientation,
                    maxWidth:1000,
                    maxHeight:850

                }
            );
            //doUploadFile(input.files[1],imageID1, text1, removeButton1, addButtonID1,'','','','','','','265px','265px');
            //doUploadFile(loadingImage,imageID1, text1, removeButton1, addButtonID1,'','','','','','','265px','265px');
        });

    }},100);
    setTimeout(function(){if (input.files && input.files[2]) {
        var imageFile = input.files[2];
        var imageType = imageFile.type;
        var imageName = imageFile.name;
        loadImage.parseMetaData(imageFile, function (data) {
            console.log("i am in loadImage function");
            var orientation = 0;
            //if exif data available, update orientation
            if (data.exif) {
                orientation = data.exif.get('Orientation');
            }
            var loadingImage = loadImage(imageFile, function(canvas) {
                    //here's the base64 data result
                    var base64data = canvas.toDataURL('image/jpeg');
                    //here's example to show it as on imae preview
                    var img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
                    var image = '#' + imageID2;
                    $(image).attr('src', base64data);
                    var image = document.getElementById(imageID2);
                    var description = document.getElementById(text2);
                    var button = document.getElementById(removeButton2);
                    image.style.width = '265px';
                    image.style.height = '265px';
                    image.style.display = 'block';
                    description.style.display = 'block';
                    button.style.display = 'block';
                    addButton2.style.display = 'none';
                    var file = new File([convertBase64UrlToBlob(base64data)], imageName, {type: imageType, lastModified:date.getTime()});
                    doUploadFile(file,imageID2, text2, removeButton2, addButtonID2,'','','','','','','265px','265px');

                }, {
                    //should be set to canvas : true to activate auto fix orientation
                    canvas: true,
                    orientation: orientation,
                    maxWidth:1000,
                    maxHeight:850

                }
            );
            //doUploadFile(input.files[2],imageID2, text2, removeButton2, addButtonID2,'','','','','','','265px','265px');
            //doUploadFile(loadingImage,imageID2, text2, removeButton2, addButtonID2,'','','','','','','265px','265px');
        });
    }},110);
    setTimeout(function(){if (input.files && input.files[3]) {
        var imageFile = input.files[3];
        var imageType = imageFile.type;
        var imageName = imageFile.name;
        loadImage.parseMetaData(imageFile, function (data) {
            console.log("i am in loadImage function");
            var orientation = 0;
            //if exif data available, update orientation
            if (data.exif) {
                orientation = data.exif.get('Orientation');
            }
            var loadingImage = loadImage(imageFile, function(canvas) {
                    //here's the base64 data result
                    var base64data = canvas.toDataURL('image/jpeg');
                    //here's example to show it as on image preview
                    var img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
                    var image = '#' + imageID3;
                    $(image).attr('src', base64data);
                    var image = document.getElementById(imageID3);
                    var description = document.getElementById(text3);
                    var button = document.getElementById(removeButton3);
                    image.style.width = '265px';
                    image.style.height = '265px';
                    image.style.display = 'block';
                    description.style.display = 'block';
                    button.style.display = 'block';
                    addButton3.style.display = 'none';
                    var file = new File([convertBase64UrlToBlob(base64data)], imageName, {type: imageType, lastModified:date.getTime()});
                    doUploadFile(file,imageID3, text3, removeButton3, addButtonID3,'','','','','','','265px','265px');
                }, {
                    //should be set to canvas : true to activate auto fix orientation
                    canvas: true,
                    orientation: orientation,
                    maxWidth:1000,
                    maxHeight:850

                }
            );
            //doUploadFile(input.files[1],imageID1, text1, removeButton1, addButtonID1,'','','','','','','265px','265px');
            //doUploadFile(loadingImage,imageID1, text1, removeButton1, addButtonID1,'','','','','','','265px','265px');
        });

    }},120);
    setTimeout(function(){if (input.files && input.files[4]) {
        var imageFile = input.files[4];
        var imageType = imageFile.type;
        var imageName = imageFile.name;
        loadImage.parseMetaData(imageFile, function (data) {
            console.log("i am in loadImage function");
            var orientation = 0;
            //if exif data available, update orientation
            if (data.exif) {
                orientation = data.exif.get('Orientation');
            }
            var loadingImage = loadImage(imageFile, function(canvas) {
                    //here's the base64 data result
                    var base64data = canvas.toDataURL('image/jpeg');
                    //here's example to show it as on image preview
                    var img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
                    var image = '#' + imageID4;
                    $(image).attr('src', base64data);
                    var image = document.getElementById(imageID4);
                    var description = document.getElementById(text4);
                    var button = document.getElementById(removeButton4);
                    image.style.width = '265px';
                    image.style.height = '265px';
                    image.style.display = 'block';
                    description.style.display = 'block';
                    button.style.display = 'block';
                    addButton4.style.display = 'none';
                    var file = new File([convertBase64UrlToBlob(base64data)], imageName, {type: imageType, lastModified:date.getTime()});
                    doUploadFile(file,imageID4, text4, removeButton4, addButtonID4,'','','','','','','265px','265px');
                }, {
                    //should be set to canvas : true to activate auto fix orientation
                    canvas: true,
                    orientation: orientation,
                    maxWidth:1000,
                    maxHeight:850

                }
            );
            //doUploadFile(input.files[1],imageID1, text1, removeButton1, addButtonID1,'','','','','','','265px','265px');
            //doUploadFile(loadingImage,imageID1, text1, removeButton1, addButtonID1,'','','','','','','265px','265px');
        });

    }},130);
    setTimeout(function(){if (input.files && input.files[5]) {
        var imageFile = input.files[5];
        var imageType = imageFile.type;
        var imageName = imageFile.name;
        loadImage.parseMetaData(imageFile, function (data) {
            console.log("i am in loadImage function");
            var orientation = 0;
            //if exif data available, update orientation
            if (data.exif) {
                orientation = data.exif.get('Orientation');
            }
            var loadingImage = loadImage(imageFile, function(canvas) {
                    //here's the base64 data result
                    var base64data = canvas.toDataURL('image/jpeg');
                    //here's example to show it as on image preview
                    var img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
                    var image = '#' + imageID5;
                    $(image).attr('src', base64data);
                    var image = document.getElementById(imageID5);
                    var description = document.getElementById(text5);
                    var button = document.getElementById(removeButton5);
                    image.style.width = '265px';
                    image.style.height = '265px';
                    image.style.display = 'block';
                    description.style.display = 'block';
                    button.style.display = 'block';
                    addButton5.style.display = 'none';
                    var file = new File([convertBase64UrlToBlob(base64data)], imageName, {type: imageType, lastModified:date.getTime()});
                    doUploadFile(file,imageID5, text5, removeButton5, addButtonID5,'','','','','','','265px','265px');
                }, {
                    //should be set to canvas : true to activate auto fix orientation
                    canvas: true,
                    orientation: orientation,
                    maxWidth:1000,
                    maxHeight:850

                }
            );
            //doUploadFile(input.files[1],imageID1, text1, removeButton1, addButtonID1,'','','','','','','265px','265px');
            //doUploadFile(loadingImage,imageID1, text1, removeButton1, addButtonID1,'','','','','','','265px','265px');
        });

    }},140);

}


function RemoveImage(imageID0, removeButtonID, addButtonID) {
    var imageSelect = '#' + imageID0;
    $(imageSelect).attr('src', '#');
    var image = document.getElementById(imageID0);
    var button = document.getElementById(removeButtonID);
    var addButton = document.getElementById(addButtonID);
    button.style.display = 'none';
    addButton.style.display = 'block';
    image.style.width = '0px';
    doRemovePhoto(imageID0);
}



function AssessmentSiteUploadImages(){
    document.getElementById('AssessmentSiteUploadImages').click();
}

function AssessmentExteriorUploadImages() {
    document.getElementById('AssessmentExteriorUploadImages').click();
}

function AssessmentInteriorLivingUploadImages() {

    document.getElementById('AssessmentInteriorLivingUploadImages').click();
}

function AssessmentInteriorBedroomUploadImages() {

    document.getElementById('AssessmentInteriorBedroomUploadImages').click();
}

function AssessmentInteriorServiceUploadImages() {
    document.getElementById('AssessmentInteriorServiceUploadImages').click();
}



$("#AssessmentSiteUploadImages").change(function () {
    read3ImagesURL(this, 'AddAssessmentSiteImageButton0', 'AddAssessmentSiteImageButton1', 'AddAssessmentSiteImageButton2', 'AssessmentSiteImage0', 'AssessmentSiteImage1', 'AssessmentSiteImage2', 'AssessmentSiteImageText0', 'AssessmentSiteImageText1', 'AssessmentSiteImageText2', 'AssessmentSiteRemoveButton0', 'AssessmentSiteRemoveButton1', 'AssessmentSiteRemoveButton2');
    //  read6ImagesURL(this,'AddAssessmentSiteImageButton0','AddAssessmentSiteImageButton1','AddAssessmentSiteImageButton2','AddAssessmentSiteImageButton3','AddAssessmentSiteImageButton4','AddAssessmentSiteImageButton5','AssessmentSiteImage0','AssessmentSiteImage1','AssessmentSiteImage2','AssessmentSiteImage3','AssessmentSiteImage4','AssessmentSiteImage5','AssessmentSiteImageText0','AssessmentSiteImageText1','AssessmentSiteImageText2','AssessmentSiteImageText3','AssessmentSiteImageText4','AssessmentSiteImageText5','AssessmentSiteRemoveButton0','AssessmentSiteRemoveButton1','AssessmentSiteRemoveButton2','AssessmentSiteRemoveButton3','AssessmentSiteRemoveButton4','AssessmentSiteRemoveButton5');
});
$("#AssessmentExteriorUploadImages").change(function () {
    read6ImagesURL(this, 'AddAssessmentExteriorImageButton0', 'AddAssessmentExteriorImageButton1', 'AddAssessmentExteriorImageButton2', 'AddAssessmentExteriorImageButton3', 'AddAssessmentExteriorImageButton4', 'AddAssessmentExteriorImageButton5', 'AssessmentExteriorImage0', 'AssessmentExteriorImage1', 'AssessmentExteriorImage2', 'AssessmentExteriorImage3', 'AssessmentExteriorImage4', 'AssessmentExteriorImage5', 'AssessmentExteriorImageText0', 'AssessmentExteriorImageText1', 'AssessmentExteriorImageText2', 'AssessmentExteriorImageText3', 'AssessmentExteriorImageText4', 'AssessmentExteriorImageText5', 'AssessmentExteriorRemoveButton0', 'AssessmentExteriorRemoveButton1', 'AssessmentExteriorRemoveButton2', 'AssessmentExteriorRemoveButton3', 'AssessmentExteriorRemoveButton4', 'AssessmentExteriorRemoveButton5');
});
$("#AssessmentInteriorLivingUploadImages").change(function () {
    read6ImagesURL(this, 'AddAssessmentInteriorLivingImageButton0', 'AddAssessmentInteriorLivingImageButton1', 'AddAssessmentInteriorLivingImageButton2', 'AddAssessmentInteriorLivingImageButton3', 'AddAssessmentInteriorLivingImageButton4', 'AddAssessmentInteriorLivingImageButton5', 'AssessmentInteriorLivingImage0', 'AssessmentInteriorLivingImage1', 'AssessmentInteriorLivingImage2', 'AssessmentInteriorLivingImage3', 'AssessmentInteriorLivingImage4', 'AssessmentInteriorLivingImage5', 'AssessmentInteriorLivingImageText0', 'AssessmentInteriorLivingImageText1', 'AssessmentInteriorLivingImageText2', 'AssessmentInteriorLivingImageText3', 'AssessmentInteriorLivingImageText4', 'AssessmentInteriorLivingImageText5', 'AssessmentInteriorLivingRemoveButton0', 'AssessmentInteriorLivingRemoveButton1', 'AssessmentInteriorLivingRemoveButton2', 'AssessmentInteriorLivingRemoveButton3', 'AssessmentInteriorLivingRemoveButton4', 'AssessmentInteriorLivingRemoveButton5');
});
$("#AssessmentInteriorBedroomUploadImages").change(function () {
    read6ImagesURL(this, 'AddAssessmentInteriorBedroomImageButton0', 'AddAssessmentInteriorBedroomImageButton1', 'AddAssessmentInteriorBedroomImageButton2', 'AddAssessmentInteriorBedroomImageButton3', 'AddAssessmentInteriorBedroomImageButton4', 'AddAssessmentInteriorBedroomImageButton5', 'AssessmentInteriorBedroomImage0', 'AssessmentInteriorBedroomImage1', 'AssessmentInteriorBedroomImage2', 'AssessmentInteriorBedroomImage3', 'AssessmentInteriorBedroomImage4', 'AssessmentInteriorBedroomImage5', 'AssessmentInteriorBedroomImageText0', 'AssessmentInteriorBedroomImageText1', 'AssessmentInteriorBedroomImageText2', 'AssessmentInteriorBedroomImageText3', 'AssessmentInteriorBedroomImageText4', 'AssessmentInteriorBedroomImageText5', 'AssessmentInteriorBedroomRemoveButton0', 'AssessmentInteriorBedroomRemoveButton1', 'AssessmentInteriorBedroomRemoveButton2', 'AssessmentInteriorBedroomRemoveButton3', 'AssessmentInteriorBedroomRemoveButton4', 'AssessmentInteriorBedroomRemoveButton5');
});
$("#AssessmentInteriorServiceUploadImages").change(function () {
    read3ImagesURL(this, 'AddAssessmentInteriorServiceImageButton0', 'AddAssessmentInteriorServiceImageButton1', 'AddAssessmentInteriorServiceImageButton2', 'AssessmentInteriorServiceImage0', 'AssessmentInteriorServiceImage1', 'AssessmentInteriorServiceImage2', 'AssessmentInteriorServiceImageText0', 'AssessmentInteriorServiceImageText1', 'AssessmentInteriorServiceImageText2', 'AssessmentInteriorServiceRemoveButton0', 'AssessmentInteriorServiceRemoveButton1', 'AssessmentInteriorServiceRemoveButton2');
});


//Assessment - Site and Garden, upload one image per time
$("#AssessmentSiteUploadImage0").change(function () {
    readOneImageURL(this, 'AssessmentSiteImage0', 'AddAssessmentSiteImageButton0', 'AssessmentSiteRemoveButton0', 'AssessmentSiteImageText0', '265px','AddAssessmentSiteImageButton1');
});

$("#AssessmentSiteUploadImage1").change(function () {
    readOneImageURL(this, 'AssessmentSiteImage1', 'AddAssessmentSiteImageButton1', 'AssessmentSiteRemoveButton1', 'AssessmentSiteImageText1', '265px','AddAssessmentSiteImageButton2');
});

$("#AssessmentSiteUploadImage2").change(function () {
    readOneImageURL(this, 'AssessmentSiteImage2', 'AddAssessmentSiteImageButton2', 'AssessmentSiteRemoveButton2', 'AssessmentSiteImageText2', '265px','');
});


//Assessment - Exterior, upload one image per time
$("#AssessmentExteriorUploadImage0").change(function () {
    readOneImageURL(this, 'AssessmentExteriorImage0', 'AddAssessmentExteriorImageButton0', 'AssessmentExteriorRemoveButton0', 'AssessmentExteriorImageText0', '265px','AddAssessmentExteriorImageButton1');
});
$("#AssessmentExteriorUploadImage1").change(function () {
    readOneImageURL(this, 'AssessmentExteriorImage1', 'AddAssessmentExteriorImageButton1', 'AssessmentExteriorRemoveButton1', 'AssessmentExteriorImageText1', '265px','AddAssessmentExteriorImageButton2');
});
$("#AssessmentExteriorUploadImage2").change(function () {
    readOneImageURL(this, 'AssessmentExteriorImage2', 'AddAssessmentExteriorImageButton2', 'AssessmentExteriorRemoveButton2', 'AssessmentExteriorImageText2', '265px','AddAssessmentExteriorImageButton3');
});
$("#AssessmentExteriorUploadImage3").change(function () {
    readOneImageURL(this, 'AssessmentExteriorImage3', 'AddAssessmentExteriorImageButton3', 'AssessmentExteriorRemoveButton3', 'AssessmentExteriorImageText3', '265px','AddAssessmentExteriorImageButton4');
});
$("#AssessmentExteriorUploadImage4").change(function () {
    readOneImageURL(this, 'AssessmentExteriorImage4', 'AddAssessmentExteriorImageButton4', 'AssessmentExteriorRemoveButton4', 'AssessmentExteriorImageText4', '265px','AddAssessmentExteriorImageButton5');
});
$("#AssessmentExteriorUploadImage5").change(function () {
    readOneImageURL(this, 'AssessmentExteriorImage5', 'AddAssessmentExteriorImageButton5', 'AssessmentExteriorRemoveButton5', 'AssessmentExteriorImageText5', '265px','');
});

//Assessment - Interior Living Room, upload one image per time

$("#AssessmentInteriorLivingUploadImage0").change(function () {
    readOneImageURL(this, 'AssessmentInteriorLivingImage0', 'AddAssessmentInteriorLivingImageButton0', 'AssessmentInteriorLivingRemoveButton0', 'AssessmentInteriorLivingImageText0', '265px','AddAssessmentInteriorLivingImageButton1');
});
$("#AssessmentInteriorLivingUploadImage1").change(function () {
    readOneImageURL(this, 'AssessmentInteriorLivingImage1', 'AddAssessmentInteriorLivingImageButton1', 'AssessmentInteriorLivingRemoveButton1', 'AssessmentInteriorLivingImageText1', '265px','AddAssessmentInteriorLivingImageButton2');
});
$("#AssessmentInteriorLivingUploadImage2").change(function () {
    readOneImageURL(this, 'AssessmentInteriorLivingImage2', 'AddAssessmentInteriorLivingImageButton2', 'AssessmentInteriorLivingRemoveButton2', 'AssessmentInteriorLivingImageText2', '265px','AddAssessmentInteriorLivingImageButton3');
});
$("#AssessmentInteriorLivingUploadImage3").change(function () {
    readOneImageURL(this, 'AssessmentInteriorLivingImage3', 'AddAssessmentInteriorLivingImageButton3', 'AssessmentInteriorLivingRemoveButton3', 'AssessmentInteriorLivingImageText3', '265px','AddAssessmentInteriorLivingImageButton4');
});
$("#AssessmentInteriorLivingUploadImage4").change(function () {
    readOneImageURL(this, 'AssessmentInteriorLivingImage4', 'AddAssessmentInteriorLivingImageButton4', 'AssessmentInteriorLivingRemoveButton4', 'AssessmentInteriorLivingImageText4', '265px','AddAssessmentInteriorLivingImageButton5');
});
$("#AssessmentInteriorLivingUploadImage5").change(function () {
    readOneImageURL(this, 'AssessmentInteriorLivingImage5', 'AddAssessmentInteriorLivingImageButton5', 'AssessmentInteriorLivingRemoveButton5', 'AssessmentInteriorLivingImageText5', '265px','');
});

//Assessment - Interior Bedroom, upload one image per time
$("#AssessmentInteriorBedroomUploadImage0").change(function () {
    readOneImageURL(this, 'AssessmentInteriorBedroomImage0', 'AddAssessmentInteriorBedroomImageButton0', 'AssessmentInteriorBedroomRemoveButton0', 'AssessmentInteriorBedroomImageText0', '265px','AddAssessmentInteriorBedroomImageButton1');
});
$("#AssessmentInteriorBedroomUploadImage1").change(function () {
    readOneImageURL(this, 'AssessmentInteriorBedroomImage1', 'AddAssessmentInteriorBedroomImageButton1', 'AssessmentInteriorBedroomRemoveButton1', 'AssessmentInteriorBedroomImageText1', '265px','AddAssessmentInteriorBedroomImageButton2');
});
$("#AssessmentInteriorBedroomUploadImage2").change(function () {
    readOneImageURL(this, 'AssessmentInteriorBedroomImage2', 'AddAssessmentInteriorBedroomImageButton2', 'AssessmentInteriorBedroomRemoveButton2', 'AssessmentInteriorBedroomImageText2', '265px','AddAssessmentInteriorBedroomImageButton3');
});
$("#AssessmentInteriorBedroomUploadImage3").change(function () {
    readOneImageURL(this, 'AssessmentInteriorBedroomImage3', 'AddAssessmentInteriorBedroomImageButton3', 'AssessmentInteriorBedroomRemoveButton3', 'AssessmentInteriorBedroomImageText3', '265px','AddAssessmentInteriorBedroomImageButton4');
});
$("#AssessmentInteriorBedroomUploadImage4").change(function () {
    readOneImageURL(this, 'AssessmentInteriorBedroomImage4', 'AddAssessmentInteriorBedroomImageButton4', 'AssessmentInteriorBedroomRemoveButton4', 'AssessmentInteriorBedroomImageText4', '265px','AddAssessmentInteriorBedroomImageButton5');
});
$("#AssessmentInteriorBedroomUploadImage5").change(function () {
    readOneImageURL(this, 'AssessmentInteriorBedroomImage5', 'AddAssessmentInteriorBedroomImageButton5', 'AssessmentInteriorBedroomRemoveButton5', 'AssessmentInteriorBedroomImageText5', '265px','');
});

//Assessment - Interior Service, upload one image per time
$("#AssessmentInteriorServiceUploadImage0").change(function () {
    readOneImageURL(this, 'AssessmentInteriorServiceImage0', 'AddAssessmentInteriorServiceImageButton0', 'AssessmentInteriorServiceRemoveButton0', 'AssessmentInteriorServiceImageText0', '265px','AddAssessmentInteriorServiceImageButton1');
});
$("#AssessmentInteriorServiceUploadImage1").change(function () {
    readOneImageURL(this, 'AssessmentInteriorServiceImage1', 'AddAssessmentInteriorServiceImageButton1', 'AssessmentInteriorServiceRemoveButton1', 'AssessmentInteriorServiceImageText1', '265px','AddAssessmentInteriorServiceImageButton2');
});
$("#AssessmentInteriorServiceUploadImage2").change(function () {
    readOneImageURL(this, 'AssessmentInteriorServiceImage2', 'AddAssessmentInteriorServiceImageButton2', 'AssessmentInteriorServiceRemoveButton2', 'AssessmentInteriorServiceImageText2', '265px','');
});

function AddAssessmentSiteImage0() {
    document.getElementById('AssessmentSiteUploadImage0').click();
}

function AddAssessmentSiteImage1() {
    document.getElementById('AssessmentSiteUploadImage1').click();
}

function AddAssessmentSiteImage2() {
    document.getElementById('AssessmentSiteUploadImage2').click();
}

function AddAssessmentExteriorImage0() {
    document.getElementById('AssessmentExteriorUploadImage0').click();
}

function AddAssessmentExteriorImage1() {
    document.getElementById('AssessmentExteriorUploadImage1').click();
}

function AddAssessmentExteriorImage2() {
    document.getElementById('AssessmentExteriorUploadImage2').click();
}

function AddAssessmentExteriorImage3() {
    document.getElementById('AssessmentExteriorUploadImage3').click();
}

function AddAssessmentExteriorImage4() {
    document.getElementById('AssessmentExteriorUploadImage4').click();
}

function AddAssessmentExteriorImage5() {
    document.getElementById('AssessmentExteriorUploadImage5').click();
}

function AddAssessmentInteriorLivingImage0() {
    document.getElementById('AssessmentInteriorLivingUploadImage0').click();
}

function AddAssessmentInteriorLivingImage1() {
    document.getElementById('AssessmentInteriorLivingUploadImage1').click();
}

function AddAssessmentInteriorLivingImage2() {
    document.getElementById('AssessmentInteriorLivingUploadImage2').click();
}

function AddAssessmentInteriorLivingImage3() {
    document.getElementById('AssessmentInteriorLivingUploadImage3').click();
}

function AddAssessmentInteriorLivingImage4() {
    document.getElementById('AssessmentInteriorLivingUploadImage4').click();
}

function AddAssessmentInteriorLivingImage5() {
    document.getElementById('AssessmentInteriorLivingUploadImage5').click();
}

function AddAssessmentInteriorBedroomImage0() {
    document.getElementById('AssessmentInteriorBedroomUploadImage0').click();
}

function AddAssessmentInteriorBedroomImage1() {
    document.getElementById('AssessmentInteriorBedroomUploadImage1').click();
}

function AddAssessmentInteriorBedroomImage2() {
    document.getElementById('AssessmentInteriorBedroomUploadImage2').click();
}

function AddAssessmentInteriorBedroomImage3() {
    document.getElementById('AssessmentInteriorBedroomUploadImage3').click();
}

function AddAssessmentInteriorBedroomImage4() {
    document.getElementById('AssessmentInteriorBedroomUploadImage4').click();
}

function AddAssessmentInteriorBedroomImage5() {
    document.getElementById('AssessmentInteriorBedroomUploadImage5').click();
}

function AddAssessmentInteriorServiceImage0() {
    document.getElementById('AssessmentInteriorServiceUploadImage0').click();
}

function AddAssessmentInteriorServiceImage1() {
    document.getElementById('AssessmentInteriorServiceUploadImage1').click();
}

function AddAssessmentInteriorServiceImage2() {
    document.getElementById('AssessmentInteriorServiceUploadImage2').click();
}




function RemoveAssessmentSiteImage0() {
    RemoveImage('AssessmentSiteImage0', 'AssessmentSiteRemoveButton0', 'AddAssessmentSiteImageButton0');
}

function RemoveAssessmentSiteImage1() {
    RemoveImage('AssessmentSiteImage1', 'AssessmentSiteRemoveButton1', 'AddAssessmentSiteImageButton1');
}

function RemoveAssessmentSiteImage2() {
    RemoveImage('AssessmentSiteImage2', 'AssessmentSiteRemoveButton2', 'AddAssessmentSiteImageButton2');
}


function RemoveAssessmentExteriorImage0() {
    RemoveImage('AssessmentExteriorImage0', 'AssessmentExteriorRemoveButton0', 'AddAssessmentExteriorImageButton0');
}

function RemoveAssessmentExteriorImage1() {
    RemoveImage('AssessmentExteriorImage1', 'AssessmentExteriorRemoveButton1', 'AddAssessmentExteriorImageButton1');
}

function RemoveAssessmentExteriorImage2() {
    RemoveImage('AssessmentExteriorImage2', 'AssessmentExteriorRemoveButton2', 'AddAssessmentExteriorImageButton2');
}

function RemoveAssessmentExteriorImage3() {
    RemoveImage('AssessmentExteriorImage3', 'AssessmentExteriorRemoveButton3', 'AddAssessmentExteriorImageButton3');
}

function RemoveAssessmentExteriorImage4() {
    RemoveImage('AssessmentExteriorImage4', 'AssessmentExteriorRemoveButton4', 'AddAssessmentExteriorImageButton4');
}

function RemoveAssessmentExteriorImage5() {
    RemoveImage('AssessmentExteriorImage5', 'AssessmentExteriorRemoveButton5', 'AddAssessmentExteriorImageButton5');
}


function RemoveAssessmentInteriorLivingImage0() {
    RemoveImage('AssessmentInteriorLivingImage0', 'AssessmentInteriorLivingRemoveButton0', 'AddAssessmentInteriorLivingImageButton0');
}

function RemoveAssessmentInteriorLivingImage1() {
    RemoveImage('AssessmentInteriorLivingImage1', 'AssessmentInteriorLivingRemoveButton1', 'AddAssessmentInteriorLivingImageButton1');
}

function RemoveAssessmentInteriorLivingImage2() {
    RemoveImage('AssessmentInteriorLivingImage2', 'AssessmentInteriorLivingRemoveButton2', 'AddAssessmentInteriorLivingImageButton2');
}

function RemoveAssessmentInteriorLivingImage3() {
    RemoveImage('AssessmentInteriorLivingImage3', 'AssessmentInteriorLivingRemoveButton3', 'AddAssessmentInteriorLivingImageButton3');
}

function RemoveAssessmentInteriorLivingImage4() {
    RemoveImage('AssessmentInteriorLivingImage4', 'AssessmentInteriorLivingRemoveButton4', 'AddAssessmentInteriorLivingImageButton4');
}

function RemoveAssessmentInteriorLivingImage5() {
    RemoveImage('AssessmentInteriorLivingImage5', 'AssessmentInteriorLivingRemoveButton5', 'AddAssessmentInteriorLivingImageButton5');
}

function RemoveAssessmentInteriorBedroomImage0() {
    RemoveImage('AssessmentInteriorBedroomImage0', 'AssessmentInteriorBedroomRemoveButton0', 'AddAssessmentInteriorBedroomImageButton0');
}

function RemoveAssessmentInteriorBedroomImage1() {
    RemoveImage('AssessmentInteriorBedroomImage1', 'AssessmentInteriorBedroomRemoveButton1', 'AddAssessmentInteriorBedroomImageButton1');
}

function RemoveAssessmentInteriorBedroomImage2() {
    RemoveImage('AssessmentInteriorBedroomImage2', 'AssessmentInteriorBedroomRemoveButton2', 'AddAssessmentInteriorBedroomImageButton2');
}

function RemoveAssessmentInteriorBedroomImage3() {
    RemoveImage('AssessmentInteriorBedroomImage3', 'AssessmentInteriorBedroomRemoveButton3', 'AddAssessmentInteriorBedroomImageButton3');
}

function RemoveAssessmentInteriorBedroomImage4() {
    RemoveImage('AssessmentInteriorBedroomImage4', 'AssessmentInteriorBedroomRemoveButton4', 'AddAssessmentInteriorBedroomImageButton4');
}

function RemoveAssessmentInteriorBedroomImage5() {
    RemoveImage('AssessmentInteriorBedroomImage5', 'AssessmentInteriorBedroomRemoveButton5', 'AddAssessmentInteriorBedroomImageButton5');
}

function RemoveAssessmentInteriorServiceImage0() {
    RemoveImage('AssessmentInteriorServiceImage0', 'AssessmentInteriorServiceRemoveButton0', 'AddAssessmentInteriorServiceImageButton0');
}

function RemoveAssessmentInteriorServiceImage1() {
    RemoveImage('AssessmentInteriorServiceImage1', 'AssessmentInteriorServiceRemoveButton1', 'AddAssessmentInteriorServiceImageButton1');
}

function RemoveAssessmentInteriorServiceImage2() {
    RemoveImage('AssessmentInteriorServiceImage2', 'AssessmentInteriorServiceRemoveButton2', 'AddAssessmentInteriorServiceImageButton2');
}


//Source from http://www.blogjava.net/jidebingfeng/articles/406171.html
function convertBase64UrlToBlob(urlData,type){

    var bytes=window.atob(urlData.split(',')[1]);        //remove url, convert to byte

    //deal with anomaly, change the ASCI code less than = 0 to great than zero
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }

    return new Blob( [ab] , {type : type});
}