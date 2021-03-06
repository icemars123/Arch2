/**
 * Created by TengShinan on 10/10/17.
 */

/**
 * Make a gap between the elements
 * */
function makeAGap() {
    var result;
    result = {text: ' '};
    return result;
}

/**
 * Get the value for the table cell
 * */
function getIt(id) {
    var result;
    result = document.getElementById(id).value.trim();
    return result;
}

function getPicDes(id) {
    var myText = document.getElementById(id);
    if (myText) {
        return myText.value;
    } else {
        return '';
    }
}

/**
 * Draw a picture in the PDF file
 * */
function getImage(id) {
    var imageSection;
    var myImage = document.getElementById(id);
    var myWidth = myImage.width;

    if (myWidth == 0) {
        imageSection = {
            text: "",
            width: 0,
            height: 0
        }
    } else {
        imageSection = {
            image: myImage.src,
            width: 160
        }
    }
    return imageSection;
}

function getPhoto(id) {
    var imageSection;
    var myImage = document.getElementById(id);

    if (myImage) {
        var myWidth = myImage.style.width;
        if (myWidth == "0px") {
            imageSection = {
                text: ""
            };
            return imageSection;
        } else {
            imageSection = {
                image: myImage.src,
                width: 250,
                height: 250
            };
            return imageSection;
        }
    } else {
        imageSection = {
            text: ''
        };
        return imageSection;
    }
}

// function getCoverImage(id) {
//     var imageSection;
//     var myImage = document.getElementById(id);
//     var myWidth = myImage.width;
//
//     if (myWidth == 0) {
//         imageSection = {
//             text: "",
//             width: 0,
//             height: 0
//         }
//     } else {
//         imageSection = {
//             image: myImage.src,
//             width: 225,
//             height: 225
//         }
//     }
//     return imageSection;
// }

function getDrawings(id1, id2) {
    var imageSection;
    var myImage = document.getElementById(id1);
    if (myImage)
    {
        //has image, check whether it is from database or just upload
        if(myImage.style.width == '0px')
        {
            console.log("this id exist but does not have drawing display");
            imageSection = {
                text:''
            }
        }
        else
        {
            console.log("this id does have drawing display, but need to check the src");
            if (checkImage(id1) >= 0)
            {
                console.log('src is reload');
                var canvas = document.createElement("canvas");
                canvas.width = myImage.naturalWidth;
                canvas.height = myImage.naturalHeight;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(myImage,0,0);
                var src = canvas.toDataURL("image/png");

                imageSection = {
                    stack: [
                        {
                            text: 'Drawings',
                            style: 'pageTopHeader'
                        },
                        makeAGap(),
                        {
                            text: document.getElementById(id2).value,
                            fontSize: 9,
                            bold: true,
                            alignment: 'center',
                            margin: [0, 0, 0, 4]
                        },
                        {
                            alignment: 'center',
                            columns: [
                                {
                                    image: src,
                                    fit: [500, 700]
                                }
                            ]
                        }
                    ],
                    pageBreak: 'before'
                }

            }
            else
            {
                console.log('src is just upload');
                // console.log(myImage.width);
                // console.log(myImage.style.width);
                imageSection = {
                    stack: [
                        {
                            text: 'Drawings',
                            style: 'pageTopHeader'
                        },
                        makeAGap(),
                        {
                            alignment: 'center',
                            columns: [
                                {
                                    image: myImage.src,
                                    fit: [500, 700]
                                }
                            ]
                        },
                        makeAGap(),
                        {
                            text: document.getElementById(id2).value,
                            fontSize: 9,
                            bold: true,
                            alignment: 'center'
                            // margin: [0, 0, 0, 4]
                        }
                    ],
                    pageBreak: 'before'
                }
            }
        }
    }
    else
    {
        //no image at all
        console.log('no upload images at all');
        imageSection = {
            text:""
        }
    }
    return imageSection;
}

/**
 * Remove all the empty elements in an array
 * */
function cleanArray(actual) {
    var newArray = [];
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

/**
 * Determine the footer
 * */
function determineFooter(mode) {
    var result;
    if (mode == 'final') {
        result = {
            image: footerImage,
            alignment: 'left',
            margin: [40, 0, 0, 0],
            width: 280,
            height: 20
        };
        return result;
    }
    if (mode == 'preview') {
        result = {
            text: '*** THIS IS A DRAFT OF COPY OF THE REPORT ***',
            alignment: 'left',
            fontSize: 11,
            color: 'red',
            bold: true,
            margin: [40, 10, 0, 0]
        };
        return result;
    }
}

/**
 * Determine draft cover page
 * */
function giveMeHugeDraft(mode) {
    var result;
    if (mode == 'final') {
        result = {
            text: ''
        };
        return result;
    }
    if (mode == 'preview') {
        result = {
            text: '******DRAFT******',
            fontSize: 40,
            bold: true,
            color: 'red',
            alignment: 'center'
        };
        return result;
    }
}

/**
 * Get all the photographs (not include the drawings) in Maintenance
 * */
function getAllPhotos() {
    var result = [];
    var uploadedPics = [];
    // Store the image data to the array
    for (var i = 0; i < 40; i++) {
        if (document.getElementById('MaintenanceImage' + i)) {
            result.push(document.getElementById('MaintenanceImage' + i).src);
        }
    }
    // Extract real pics and store it/them to the new array
    for (var i = 0; i < result.length; i++) {
        if (result[i].charAt(0) == 'd') {
            uploadedPics.push(result[i]);
        }
    }
    return uploadedPics;
}

/**
 * Assign all the pics to the pages
 * */
function giveMeThePhotosLeft() {
    var result;
    result = {
        stack: [
            {
                image: getAllPhotos()[0],
                width: 250,
                height: 250
            }
        ]
    };
    return result;
}

function giveMeThePhotosRight() {
    var result;
    result = {
        stack: [
            {
                image: getAllPhotos()[1],
                width: 250,
                height: 250
            }
        ]
    };
    return result;
}

/**
 * Set the photo tables
 * */
function getPhotoTable() {
    var result;
    result = {
        table: {
            widths: ['*', '*'],
            body: [
                [{
                    text: 'PHOTOGRAPHS',
                    style: 'tableHeader',
                    colSpan: 2
                }, {}],
                [{
                    text: [
                        {
                            text: 'Address:  ',
                            bold: true
                        },
                        {
                            text: document.getElementById('5').value.trim()
                        }
                    ],
                    style: 'tableText',
                    colSpan: 2
                }, {}],
                [
                    getPhoto('MaintenanceImage0'),
                    getPhoto('MaintenanceImage1')
                ],
                [{
                    text: getPicDes('MaintenanceImageText0'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }, {
                    text: getPicDes('MaintenanceImageText1'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }],
                [
                    getPhoto('MaintenanceImage2'),
                    getPhoto('MaintenanceImage3')
                ],
                [{
                    text: getPicDes('MaintenanceImageText2'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }, {
                    text: getPicDes('MaintenanceImageText3'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }],
                [
                    getPhoto('MaintenanceImage4'),
                    getPhoto('MaintenanceImage5')
                ],
                [{
                    text: getPicDes('MaintenanceImageText4'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }, {
                    text: getPicDes('MaintenanceImageText5'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }],
                [
                    getPhoto('MaintenanceImage6'),
                    getPhoto('MaintenanceImage7')
                ],
                [{
                    text: getPicDes('MaintenanceImageText6'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }, {
                    text: getPicDes('MaintenanceImageText7'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }],
                [
                    getPhoto('MaintenanceImage8'),
                    getPhoto('MaintenanceImage9')
                ],
                [{
                    text: getPicDes('MaintenanceImageText8'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }, {
                    text: getPicDes('MaintenanceImageText9'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }],
                [
                    getPhoto('MaintenanceImage10'),
                    getPhoto('MaintenanceImage11')
                ],
                [{
                    text: getPicDes('MaintenanceImageText10'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }, {
                    text: getPicDes('MaintenanceImageText11'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }],
                [
                    getPhoto('MaintenanceImage12'),
                    getPhoto('MaintenanceImage13')
                ],
                [{
                    text: getPicDes('MaintenanceImageText12'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }, {
                    text: getPicDes('MaintenanceImageText13'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }],
                [
                    getPhoto('MaintenanceImage14'),
                    getPhoto('MaintenanceImage15')
                ],
                [{
                    text: getPicDes('MaintenanceImageText14'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }, {
                    text: getPicDes('MaintenanceImageText15'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }],
                [
                    getPhoto('MaintenanceImage16'),
                    getPhoto('MaintenanceImage17')
                ],
                [{
                    text: getPicDes('MaintenanceImageText16'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }, {
                    text: getPicDes('MaintenanceImageText17'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }],
                [
                    getPhoto('MaintenanceImage18'),
                    getPhoto('MaintenanceImage19')
                ],
                [{
                    text: getPicDes('MaintenanceImageText18'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }, {
                    text: getPicDes('MaintenanceImageText19'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }],
                [
                    getPhoto('MaintenanceImage20'),
                    getPhoto('MaintenanceImage21')
                ],
                [{
                    text: getPicDes('MaintenanceImageText20'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }, {
                    text: getPicDes('MaintenanceImageText21'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }],
                [
                    getPhoto('MaintenanceImage22'),
                    getPhoto('MaintenanceImage23')
                ],
                [{
                    text: getPicDes('MaintenanceImageText22'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }, {
                    text: getPicDes('MaintenanceImageText23'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }],
                [
                    getPhoto('MaintenanceImage24'),
                    getPhoto('MaintenanceImage25')
                ],
                [{
                    text: getPicDes('MaintenanceImageText24'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }, {
                    text: getPicDes('MaintenanceImageText25'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }],
                [
                    getPhoto('MaintenanceImage26'),
                    getPhoto('MaintenanceImage27')
                ],
                [{
                    text: getPicDes('MaintenanceImageText26'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }, {
                    text: getPicDes('MaintenanceImageText27'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }],
                [
                    getPhoto('MaintenanceImage28'),
                    getPhoto('MaintenanceImage29')
                ],
                [{
                    text: getPicDes('MaintenanceImageText28'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }, {
                    text: getPicDes('MaintenanceImageText29'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }],
                [
                    getPhoto('MaintenanceImage30'),
                    getPhoto('MaintenanceImage31')
                ],
                [{
                    text: getPicDes('MaintenanceImageText30'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }, {
                    text: getPicDes('MaintenanceImageText31'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }],
                [
                    getPhoto('MaintenanceImage32'),
                    getPhoto('MaintenanceImage33')
                ],
                [{
                    text: getPicDes('MaintenanceImageText32'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }, {
                    text: getPicDes('MaintenanceImageText33'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }],
                [
                    getPhoto('MaintenanceImage34'),
                    getPhoto('MaintenanceImage35')
                ],
                [{
                    text: getPicDes('MaintenanceImageText34'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }, {
                    text: getPicDes('MaintenanceImageText35'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }],
                [
                    getPhoto('MaintenanceImage36'),
                    getPhoto('MaintenanceImage37')
                ],
                [{
                    text: getPicDes('MaintenanceImageText36'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }, {
                    text: getPicDes('MaintenanceImageText37'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }],
                [
                    getPhoto('MaintenanceImage38'),
                    getPhoto('MaintenanceImage39')
                ],
                [{
                    text: getPicDes('MaintenanceImageText38'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }, {
                    text: getPicDes('MaintenanceImageText39'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center'
                }]
            ]
        },
        layout: 'noBorders'
    };
    return result;
}


/**
 *   check whether the image src is base64 or url path.
 *   return -1 means base64
 *   otherwise is url path
 **/
function checkImage(id) {
    //console.log("click");
    var image = document.getElementById(id);
    var src = image.src;
    //console.log(src.indexOf("photos"));
    return(src.indexOf("photos"));
}

/**
 * Images
 * */
function getCoverImage(id) {
    var imageSection;
    var myImage = document.getElementById(id);
    var myWidth = myImage.width;
    if (myWidth == 0) {
        console.log('not cover');
        imageSection = {
            text: "",
            width: 0,
            height: 0
        }
    }
    else
    {
        console.log('has cover');
        if (checkImage(id) >= 0)
        {
            console.log('reload');
            var canvas = document.createElement("canvas");
            canvas.width = myImage.naturalWidth;
            canvas.height = myImage.naturalHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(myImage,0,0);
            var src = canvas.toDataURL("image/png");

            imageSection = {
                image:src,
                height: 150,
                width: 200
            }
        }
        else{
            console.log('just upload');
            imageSection = {
                image: myImage.src,
                height: 150,
                width: 200
            }
        }

    }
    return imageSection;
}

function getPhoto(id)
{
    var imageSection;
    var myImage = document.getElementById(id);

    if (myImage)
    {
        //has image, check whether it is from database or just upload
        if(myImage.style.width == '0px')
        {
            console.log("this id exist but does not have image display");
            imageSection = {
                text:''
            }
        }
        else
        {
            console.log("this id does have image display, but need to check the src");
            if (checkImage(id) >= 0)
            {
                console.log('src is reload');
                var canvas = document.createElement("canvas");
                canvas.width = myImage.naturalWidth;
                canvas.height = myImage.naturalHeight;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(myImage,0,0);
                var src = canvas.toDataURL("image/png");

                imageSection = {
                    image:src,
                    height: 120,
                    width: 160
                }

            }
            else
            {
                console.log('src is just upload');
                // console.log(myImage.width);
                // console.log(myImage.style.width);
                imageSection = {
                    image: myImage.src,
                    height: 120,
                    width: 160
                }
            }
        }
    }
    else
    {
        //no image at all
        console.log('no upload images at all');
        imageSection = {
            text:""
        }
    }

    return imageSection;

}



















