/**
 * Created by Fafa on 12/1/18.
 */



function formatNumber(click_id)
{
    var val = document.getElementById(click_id).value;

    val = val.replace(/[^0-9\.]/g,'');

    if(val != "") {
        valArr = val.split('.');
        valArr[0] = (parseInt(valArr[0],10)).toLocaleString();
        val = valArr.join('.');
    }

    document.getElementById(click_id).value = "$" + val;
}


/**
 * Add people to the involved table
 */
function addPeople()
{
    var table = document.getElementById('renovationPeopleTable');
    var rowCount = table.rows.length;
    var totalPeople = rowCount - 1;
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    //create input for cell1

    var nameInput = document.createElement('INPUT');
    nameInput.setAttribute('class','form-control');
    nameInput.setAttribute('title','people');
    nameInput.setAttribute('type','text');
    //nameInput.setAttribute('placeholder','enter cost name');
    nameInput.id = 'renovationInvolvedPeople' + totalPeople;
    nameInput.style.textAlign = 'center';
    cell1.appendChild(nameInput);

    var textArea = document.createElement('textarea');
    textArea.setAttribute('class','form-control');
    textArea.setAttribute('class','description');
    textArea.id = 'renovationInvolvedDescription' + totalPeople;
    cell2.appendChild(textArea);
}


/**
 * Calculate the option of cost automatically
 */

function calculateRenovationLow()
{
    var subTotal = 0;
    var rowCount = document.getElementById('renovationFeasibilityTable').rows.length;
    var usefulRow = rowCount - 5;
    for (var i = 0;i<usefulRow;i++)
    {
        var lowCost = String(document.getElementById('renovationLow'+i).value);
        var lowCostNumber = 0;
        if (lowCost.trim() != '')
        {
            if(lowCost.trim() != '$')
            {
                lowCostNumber = lowCost.replace(/[^\d.]/g, '');
            }
        }
        subTotal = (subTotal + parseFloat(lowCostNumber));
    }
    subTotal = subTotal.toFixed(2);

    var lowTotal = (subTotal * 1.1).toFixed(2);
    var lowGST = (subTotal * 0.1).toFixed(2);


    if(subTotal != "") {
        valArr = subTotal.toString().split('.');
        valArr[0] = (parseInt(valArr[0],10)).toLocaleString();
        subTotal = valArr.join('.');
    }


    if(lowTotal != "") {
        valArr = lowTotal.toString().split('.');
        valArr[0] = (parseInt(valArr[0],10)).toLocaleString();
        lowTotal = valArr.join('.');

    }

    if(lowGST != "")
    {
        valArr = lowGST.toString().split('.');
        valArr[0] = (parseInt(valArr[0],10)).toLocaleString();
        lowGST = valArr.join('.');
    }



    console.log(lowGST);

    document.getElementById('renovationLowSubTotal').value = '$' + subTotal;
    document.getElementById('renovationLowTotal').value = '$' + lowTotal;
    document.getElementById('renovationLowGST').value = '$' + lowGST;

}

function calculateRenovationHigh() {
    var subTotal = 0;
    var rowCount = document.getElementById('renovationFeasibilityTable').rows.length;
    var usefulRow = rowCount - 5;
    for (var i = 0; i < usefulRow; i++) {
        var highCost = String(document.getElementById('renovationHigh' + i).value);
        //console.log(lowCost);
        var highCostNumber = 0;
        if (highCost.trim() != '') {
            if (highCost.trim() != '$') {
                highCostNumber = highCost.replace(/[^\d.]/g, '');
            }
        }
        subTotal = (subTotal + parseFloat(highCostNumber));
    }
    subTotal = subTotal.toFixed(2);
    var highTotal = (subTotal * 1.1).toFixed(2);
    var lowGST = (subTotal * 0.1).toFixed(2);

    if (subTotal != "") {
        valArr = subTotal.toString().split('.');
        valArr[0] = (parseInt(valArr[0], 10)).toLocaleString();
        subTotal = valArr.join('.');
    }

    if (highTotal != "") {
        valArr = highTotal.toString().split('.');
        valArr[0] = (parseInt(valArr[0], 10)).toLocaleString();
        highTotal = valArr.join('.');

    }

    if (lowGST != "") {
        valArr = lowGST.toString().split('.');
        valArr[0] = (parseInt(valArr[0], 10)).toLocaleString();
        lowGST = valArr.join('.');
    }

    document.getElementById('renovationHighSubTotal').value = '$' + subTotal;
    document.getElementById('renovationHighTotal').value = '$' + highTotal;
    document.getElementById('renovationHighGST').value = '$' + lowGST;

}


function moreRenovationCost() {
   // console.log('your are in');
    var table = document.getElementById('renovationFeasibilityTable');
    var rowCount = table.rows.length;
    var usefulRow = rowCount - 6;
    var id = usefulRow + 1;
    var row = table.insertRow(rowCount - 3);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    //create an name input for the cell1
    var nameInput = document.createElement('INPUT');
    nameInput.setAttribute('class','form-control');
    nameInput.setAttribute('title','name');
    nameInput.setAttribute('type','text');
    //nameInput.setAttribute('placeholder','enter cost name');
    nameInput.id = 'renovationName' + id;
    cell1.appendChild(nameInput);

    //create an low cost input for the cell2
    var lowInput = document.createElement('INPUT');
    lowInput.setAttribute('class','form-control');
    lowInput.setAttribute('title','name');
    lowInput.setAttribute('type','text');
    lowInput.setAttribute('value','$');
    lowInput.setAttribute('onblur','calculateRenovationLow()');
    lowInput.setAttribute('onkeyup','formatNumber(this.id)');
    lowInput.id = 'renovationLow' + id;
    cell2.appendChild(lowInput);

    //create an high cost input for the cell3
    var highInput = document.createElement('INPUT');
    highInput.setAttribute('class','form-control');
    highInput.setAttribute('title','name');
    highInput.setAttribute('type','text');
    highInput.setAttribute('value','$');
    highInput.setAttribute('onblur','calculateRenovationHigh()');
    highInput.setAttribute('onkeyup','formatNumber(this.id)');
    highInput.id = 'renovationHigh' + id;
    cell3.appendChild(highInput);

}




function RenovationFeasibilityUploadDrawings() {
    document.getElementById('RenovationFeasibilityUploadDrawings').click();
}

$('#RenovationFeasibilityUploadDrawings').change(function(){
    $("#RenovationFeasibilityDrawingsTable").empty();
    var table = document.getElementById("RenovationFeasibilityDrawingsTable");
    table.style.display = 'block';
    var count = this.files.length;
    var imageFile = this.files;
    console.log(count);
    if (count > 4) {
        alert("You can only select 4 drawings. It will only display the first 4 drawings");
    }

    if(count < 4)
    {
        for (var i = 0; i<count;i++)
        {
            try {
                //noinspection ExceptionCaughtLocallyJS
                throw i
            }
            catch (ii) {
                setTimeout(function ()
                {
                    var nameID = ii + 1;
                    var altName = 'drawing  ' + nameID;
                    var imageID = 'renovationDrawing' + ii;
                    var textID = 'renovationDrawingText' + ii;
                    var removeButtonID = 'renovationDrawingRemoveButton' + ii;
                    var addButtonID = 'renovationDrawingAddButton' + ii;
                    var uploadID = 'renovationDrawingUpload' + ii;

                    //var removeFunction = 'RemoveDilapidationImage' + ii + '()';
                    //addDrawing();
                    addImageElements(altName,imageID, textID, removeButtonID, addButtonID, uploadID,
                        'removeOneRenovationDrawing(this.id)', 'addOneRenovationDrawing(this.id)', '100%', '0px');

                    loadImage.parseMetaData(imageFile[ii], function (data) {
                        //console.log('I am in loadImage function');
                        var orientation = 0;
                        var date = new Date();
                        var imageName = imageFile[ii].name;
                        var imageType = imageFile[ii].type;
                        var image = document.getElementById(imageID);
                        var removeButton = document.getElementById(removeButtonID);
                        var description  = document.getElementById(textID);
                        var addButton = document.getElementById(addButtonID);
                        //if exif data available, update orientation
                        if (data.exif) {
                            orientation = data.exif.get('Orientation');
                        }
                        var loadingImage = loadImage(imageFile[ii], function (canvas) {
                                var base64data = canvas.toDataURL(imageType);
                                //var img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
                                image.setAttribute('src',base64data);
                                //$(selectionImage).attr('src',base64data);
                                removeButton.style.display = 'block';
                                removeButton.style.width = '100%';
                                addButton.style.display = 'none';
                                addButton.style.width = '100%';
                                description.style.display = 'block';
                                image.style.display = 'block';
                                image.style.width = '100%';
                                description.style.width = '100%';
                                // image.style.height = '250px';
                                var file = new File([convertBase64UrlToBlob(base64data,imageType)], imageName, {type: imageType, lastModified:date.getTime()});
                                //console.log(file);
                                doUploadFile(file,imageID, textID, removeButtonID, addButtonID,'RenovationFeasibilityDrawingsTable',altName,'',uploadID,'removeOneRenovationDrawing(this.id)','addOneRenovationDrawing(this.id)','100%','100%');

                            },
                            {
                                canvas: true,
                                orientation: orientation,
                                maxWidth:1500,
                                maxHeight:1200
                            }
                        );
                    });

                }, 200);
            }
        }
        setTimeout(function(){
            //addDrawing();
            var altID= count + 1;
            var altName = 'Image' + altID;
            var imageID = 'renovationDrawing' + count;
            var textID = 'renovationDrawingText' + count;
            var removeButtonID = 'renovationDrawingRemoveButton' + count;
            var addButtonID = 'renovationDrawingAddButton' + count;
            var uploadID = 'renovationDrawingUpload' + count;
            addImageElements(altName, imageID, textID, removeButtonID, addButtonID, uploadID,
                'removeOneRenovationDrawing(this.id)', 'addOneRenovationDrawing(this.id)', '100%', '0px');

        },400)
    }
    else
    {
        for (var i = 0; i<4;i++)
        {
            try {
                //noinspection ExceptionCaughtLocallyJS
                throw i
            }
            catch (ii) {
                setTimeout(function () {
                    var nameID = ii + 1;
                    var altName = 'drawing  ' + nameID;
                    var imageID = 'renovationDrawing' + ii;
                    var textID = 'renovationDrawingText' + ii;
                    var removeButtonID = 'renovationDrawingRemoveButton' + ii;
                    var addButtonID = 'renovationDrawingAddButton' + ii;
                    var uploadID = 'renovationDrawingUpload' + ii;
                    //var removeFunction = 'RemoveDilapidationImage' + ii + '()';

                    addImageElements(altName, '', imageID, textID, removeButtonID, addButtonID, uploadID,
                        'removeOneRenovationDrawing(this.id)', 'addOneRenovationDrawing(this.id)', '100%', '0px');
                    //addDrawing();

                    loadImage.parseMetaData(imageFile[ii], function (data) {
                        console.log('I am in loadImage function');
                        var orientation = 0;
                        var date = new Date();
                        var selectionImage = '#AdviceImage' + ii;
                        var imageName = imageFile[ii].name;
                        var imageType = imageFile[ii].type;
                        var image = document.getElementById(imageID);
                        var removeButton = document.getElementById(removeButtonID);
                        var description  = document.getElementById(textID);
                        var addButton = document.getElementById(addButtonID);
                        //if exif data available, update orientation
                        if (data.exif) {
                            orientation = data.exif.get('Orientation');
                        }
                        var loadingImage = loadImage(imageFile[ii], function (canvas) {
                                var base64data = canvas.toDataURL(imageType);
                                //var img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
                                image.setAttribute('src',base64data);
                                //$(selectionImage).attr('src',base64data);
                                removeButton.style.display = 'block';
                                removeButton.style.width = '100%';
                                addButton.style.display = 'none';
                                description.style.display = 'block';
                                image.style.display = 'block';
                                image.style.width = '100%';
                                // image.style.height = '250px';
                                var file = new File([convertBase64UrlToBlob(base64data,imageType)], imageName, {type: imageType, lastModified:date.getTime()});
                                //console.log(file);
                                doUploadFile(file,imageID, textID, removeButtonID, addButtonID,'RenovationFeasibilityDrawingsTable',altName,'',uploadID,'removeOneRenovationDrawing(this.id)','addOneRenovationDrawing(this.id)','100%','100%');
                            },
                            {
                                canvas: true,
                                orientation: orientation,
                                maxWidth:1500,
                                maxHeight:1200
                            }
                        );
                    });
                    //f, imageid, textid, removeid, addid, table = '',imageAltName = '', divID = '', uploadID = '',removeFunction = '',addFunction = '',imageSize = '',width = ''
                    //doUploadFile(imageFile[ii],imageID, textID, removeButtonID, addButtonID,'DilapidationImagesTable',altName,'DilapidationPhotographs',uploadID,'RemoveOneDilapidationImage(this.id)','addOneDilapidationImage(this.id)','510px','510px');
                }, 500);
            }
        }
    }

});


//add an image element into the <form>, need a divID, imageID, imageTextID, uploadID, removeID
function addImageElements(imageAltName, imageID, imageTextID, removeButtonID, addButtonID, uploadFileID, removeFunction, addFunction, imageSize,width) {
    var table = document.getElementById('RenovationFeasibilityDrawingsTable');
    var rowCount = table.rows.length;
    console.log(rowCount);
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);


    //var BigContainer = document.getElementById(divID);
    var form = document.createElement("form");
    // console.log(form);
    //form.setAttribute("class","divForm");
    //need four dividends in a form
    var container1 = document.createElement("div");
    var container2 = document.createElement("div");
    var container3 = document.createElement("div");
    var container4 = document.createElement("div");
    container1.setAttribute("class", "col-sm");
    container2.setAttribute("class", "col-sm");
    container3.setAttribute("class", "col-sm");
    container4.setAttribute("class", "col-sm");

    //crate an image area
    var img = document.createElement('img');
    img.src = "#";
    img.alt = imageAltName;
    img.id = imageID;
    img.style.display = 'none';
    img.style.width = width;
    img.style.height = imageSize;
    img.style.paddingTop = '10px';

    //create an input for the text
    var textInput = document.createElement('INPUT');
    textInput.setAttribute("type", "text");
    textInput.style.width = imageSize;
    textInput.style.height = "10px";
    textInput.style.display = 'none';
    textInput.id = imageTextID;

    //create an input for the remove button
    var removeButton = document.createElement('INPUT');
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("value", "Remove");
    removeButton.setAttribute("onclick", removeFunction);
    removeButton.id = removeButtonID;
    //removeButton.onclick = removeFunction;
    removeButton.style.width = imageSize;
    removeButton.style.height = "25px";
    removeButton.style.display = "none";


    //create an input for add button
    var addButton = document.createElement('INPUT');
    addButton.setAttribute("type", "button");
    addButton.setAttribute("value", "Add");
    addButton.setAttribute("onclick", addFunction);
    addButton.id = addButtonID;
    addButton.style.width = imageSize;
    addButton.style.height = "25px";
    addButton.style.display = 'block';
    addButton.style.marginTop = '20px';

    //create an input for file, to upload images, this is the one with upload action
    var uploadFile = document.createElement('INPUT');
    uploadFile.setAttribute("type", "file");
    uploadFile.id = uploadFileID;
    uploadFile.setAttribute("class", "inputImage");
    uploadFile.setAttribute("accept", "image/x-png,image/jpeg");

    uploadFile.style.display = 'none';




    //put all elements into the correct container
    //BigContainer.appendChild(form);
    cell1.appendChild(form);
    form.appendChild(container1);
    form.appendChild(container2);
    form.appendChild(container3);
    form.appendChild(container4);
    container1.appendChild(img);
    container2.appendChild(textInput);
    container3.appendChild(removeButton);
    container4.appendChild(addButton);
    container4.appendChild(uploadFile);
}


function addDrawing()
{
    var table = document.getElementById('RenovationFeasibilityDrawingsTable');
    var rowCount = table.rows.length;
    console.log(rowCount);
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);

    var form = document.createElement('form');

    var img = document.createElement('img');
    img.src = "#";
    var imageNo  = rowCount + 1;
    img.alt = 'Renovation Drawing' + imageNo;
    img.id = 'renovationDrawing' + rowCount;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.paddingTop = '10px';
    img.style.marginBottom = '10px';
    img.style.display = 'none';


    var nameInput = document.createElement('INPUT');
    nameInput.setAttribute('class','form-control');
    nameInput.setAttribute('title','name');
    nameInput.setAttribute('type','text');
    nameInput.id = 'renovationDrawingText' + rowCount;
    nameInput.style.marginBottom = '10px';

    //create an input for the remove button
    var removeButton = document.createElement('INPUT');
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("value", "Remove");
    removeButton.setAttribute("onclick", 'removeOneRenovationDrawing(this.id)');
    removeButton.id = 'renovationDrawingRemoveButton' + rowCount;
    removeButton.style.width = '100%';
    removeButton.style.height = "25px";
    removeButton.style.display = "none";

    //create an input for add button
    var addButton = document.createElement('INPUT');
    addButton.setAttribute("type", "button");
    addButton.setAttribute("value", "Add");
    addButton.setAttribute("onclick", 'addOneRenovationDrawing(this.id)');
    addButton.id = 'renovationDrawingAddButton' + rowCount;
    addButton.style.width = '100%';
    addButton.style.height = "25px";
    addButton.style.display = 'block';

    //create an input for file, to upload images, this is the one with upload action
    var uploadFile = document.createElement('INPUT');

    uploadFile.setAttribute("type", "file");
    uploadFile.id = 'renovationDrawingUpload' + rowCount;
    uploadFile.setAttribute("class", "inputImage");
    uploadFile.setAttribute("accept", "image/x-png,image/jpeg");
    uploadFile.style.width = '100%';

    uploadFile.style.display = 'none';



    form.appendChild(img);
    form.appendChild(nameInput);
    form.appendChild(removeButton);
    form.appendChild(addButton);
    form.appendChild(uploadFile);
    cell1.appendChild(form);

}

function removeOneRenovationDrawing(click_id)
{
    var selectedID = String(click_id);
    var id = selectedID.replace ( /[^\d.]/g, '' );
    var imageID = 'renovationDrawing' + id;
    var removeButtonID = 'renovationDrawingRemoveButton' + id;
    var addButtonID = 'renovationDrawingAddButton' + id;
    var descriptionID = 'renovationDrawingText' + id;


    var imageSelect = '#' + imageID;
    $(imageSelect).attr('src', '#');
    var image = document.getElementById(imageID);
    var button = document.getElementById(removeButtonID);
    var addButton = document.getElementById(addButtonID);
    var description = document.getElementById(descriptionID);

    button.style.display = 'none';
    addButton.style.display = 'block';
    description.value = "";
    description.style.display = 'none';
    //image.style.width = '0px';
    image.style.display = 'none';
    doRemovePhoto(imageID);
}

function addOneRenovationDrawing(click_id)
{
    console.log(click_id);

    var id;
    var selectedID = String(click_id);
    id = selectedID.replace ( /[^\d.]/g, '' );
    var nameID = Number(id) + 1;
    var altName = 'drawing  ' + nameID;
    var imageID = 'renovationDrawing' + id;
    var textID = 'renovationDrawingText' + id;
    var removeButtonID = 'renovationDrawingRemoveButton' + id;
    var addButtonID = 'renovationDrawingAddButton' + id;
    var uploadID = 'renovationDrawingUpload' + id;
    // console.log(uploadID);
    var x = document.getElementById(uploadID);
    x.click();
    x.addEventListener('change',function(){
        if (this.files && this.files[0]) {
            var imageFile = this.files[0];
            //load the image src to the current imageID.
            loadImage.parseMetaData(imageFile, function (data) {
                //console.log('I am in loadImage function');
                var orientation = 0;
                var date = new Date();
                // var selectionImage = '#AdviceImage' + ii;
                var imageName = imageFile.name;
                var imageType = imageFile.type;
                var image = document.getElementById(imageID);
                var removeButton = document.getElementById(removeButtonID);
                var description  = document.getElementById(textID);
                var addButton = document.getElementById(addButtonID);
                //if exif data available, update orientation
                if (data.exif) {
                    orientation = data.exif.get('Orientation');
                }
                var loadingImage = loadImage(imageFile, function (canvas) {
                        var base64data = canvas.toDataURL(imageType);
                        //var img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
                        image.setAttribute('src',base64data);
                        //$(selectionImage).attr('src',base64data);
                        removeButton.style.display = 'block';
                        removeButton.style.width = '100%';
                        addButton.style.display = 'none';
                        description.style.display = 'block';
                        image.style.display = 'block';
                        image.style.width = '100%';
                        // image.style.height = '250px';
                        var file = new File([convertBase64UrlToBlob(base64data,imageType)], imageName, {type: imageType, lastModified:date.getTime()});
                        //console.log(file);
                        doUploadFile(file,imageID, textID, removeButtonID, addButtonID,'RenovationFeasibilityDrawingsTable',altName,'',uploadID,'removeOneRenovationDrawing(this.id)','addOneRenovationDrawing(this.id)','100%','100%');

                    },
                    {
                        canvas: true,
                        orientation: orientation,
                        maxWidth:1500,
                        maxHeight:1200
                    }
                );
            });
        }

        // if (this.files && this.files[0]) {
        //     var image = '#' + imageID;
        //     var button = document.getElementById(addButtonID);
        //     var removeButton = document.getElementById(removeButtonID);
        //     var drawing = document.getElementById(imageID);
        //     //var text = document.getElementById(textID);
        //     var reader = new FileReader();
        //     reader.onload = function (e) {
        //
        //         $(image).attr('src', e.target.result);
        //         document.getElementById(textID).style.display = 'block';
        //         button.style.display = 'none';
        //         removeButton.style.display = 'block';
        //         drawing.style.display = 'block';
        //         drawing.style.width = '100%';
        //         drawing.style.height = '100%';
        //
        //     };
        //     reader.readAsDataURL(this.files[0]);
        //     doUploadFile(this.files[0],imageID, textID, removeButtonID, addButtonID,'RenovationFeasibilityDrawingsTable','','','','','','100%','100%');
        //     console.log("use the doUploadFile successfully");
        //
        // }
    });

    var table = document.getElementById('RenovationFeasibilityDrawingsTable');
    var noDrawing = table.rows.length;
    if(noDrawing < 4)
    {

        //addDrawing();
        var newID = noDrawing;
        var altID = noDrawing + 1;
        nextAltName = 'drawing  ' + altID;
        console.log("I am here!!! need another drawing element ,the next id  " + newID);
        var nextImageID = 'renovationDrawing' + newID;
        var nextTextID = 'renovationDrawingText' + newID;
        var nextRemoveButtonID = 'renovationDrawingRemoveButton' + newID;
        var nextAddButtonID = 'renovationDrawingAddButton' + newID;
        var nextUploadID = 'renovationDrawingUpload' + newID;
        addImageElements(nextAltName, nextImageID, nextTextID, nextRemoveButtonID, nextAddButtonID, nextUploadID,
            'removeOneRenovationDrawing(this.id)', 'addOneRenovationDrawing(this.id)', '100%', '0px');
    }

}



function RenovationFeasibilityCover()
{
    document.getElementById('RenovationFeasibilityUploadCoverImage').click();
}

$('#RenovationFeasibilityUploadCoverImage').change(function() {
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
            var image = document.getElementById('RenovationFeasibilityCoverImage');
            var removeButton = document.getElementById('RenovationFeasibilityCoverImageRemoveButton');
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
                    doUploadFile(file,'RenovationFeasibilityCoverImage', '', 'RenovationFeasibilityCoverImageRemoveButton', '','','cover image','','','','','100%','100%');

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



function RemoveRenovationFeasibilityCover(){

    var imageSelect = '#' + 'RenovationFeasibilityCoverImage';
    $(imageSelect).attr('src', '#');
    var image = document.getElementById('RenovationFeasibilityCoverImage');
    var button = document.getElementById('RenovationFeasibilityCoverImageRemoveButton');

    button.style.display = 'none';
    image.style.width = '0px';
    image.style.display = 'none';

    doRemovePhoto('RenovationFeasibilityCoverImage');


}

//Source from http://www.blogjava.net/jidebingfeng/articles/406171.html
function convertBase64UrlToBlob(urlData,type){

    var bytes = window.atob(urlData.split(',')[1]);        //remove url, convert to byte

    //deal with anomaly, change the ASCI code less than = 0 to great than zero
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }

    return new Blob( [ab] , {type : type});
}