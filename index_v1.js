var effectButton;
var paintButton;
var canvas;
var context;

function init() {

    effectButton = document.getElementById('EffectButton');
    paintButton = document.getElementById('PaintButton');

    refCanvas = document.getElementById('ref_canvas');
    compareCanvas = document.getElementById('compare_canvas');
    outputCanvas = document.getElementById('output_canvas');

    refContext = refCanvas.getContext('2d');
    compareContext = compareCanvas.getContext('2d');
    outputContext =outputCanvas.getContext('2d');
    
    outputContext.imageSmoothingEnabled = false;
    refContext.imageSmoothingEnabled = false;
    compareContext.imageSmoothingEnabled = false;

    var refImage = new Image();
        refImage.src = "img.jpg";
        refImage.onload = function () {
            drawImage(refImage ,refCanvas, refContext);
    }
        
    var compareImage = new Image();
        compareImage.src = "img2.jpg";
        compareImage.onload = function () {
            drawImage(compareImage ,compareCanvas, compareContext);
    }
        
    var outputImage = new Image();
        outputImage.src = "1.jpg";
        outputImage.onload = function () {
            drawImage(outputImage ,outputCanvas, outputContext);
    }
        
    document.getElementById("compareButton").onclick = function(){
        
        getData();
    }   
        
}

function drawImage(image, canvas, context) {
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

function getData() {
    var refImageData = refContext.getImageData(0, 0, refCanvas.width, refCanvas.height);
    var compareImageData = compareContext.getImageData(0, 0, compareCanvas.width, compareCanvas.height);
    var outputImageData = outputContext.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    compareData(refImageData.data, compareImageData.data, outputImageData.data);
    outputContext.putImageData(outputImageData, 0, 0);
}

function compareData(refData, compareData, outputData) {
   /* for (var i = 0; i < refData.length; i += 4) {
        
        if (refData[i] == compareData[i] && refData[i+1] == compareData[i+1] && refData[i+2] == compareData[i+2]) {
            outputData[i] = 255;
            outputData[i + 1] = 255;
            outputData[i + 2] = 255;
            //newdataOUptut

        }
        else if (refData[i]+1 == compareData[i] || refData[i+1]+1 == compareData[i+1] || refData[i+2]+1 == compareData[i+2] ||
                 refData[i]-1 == compareData[i] || refData[i+1]-1 == compareData[i+1] || refData[i+2]-1 == compareData[i+2] ||
                 refData[i]+2 == compareData[i] || refData[i+1]+2 == compareData[i+1] || refData[i+2]+2 == compareData[i+2]) {
            outputData[i] = 255;
            outputData[i + 1] = 255;
            outputData[i + 2] = 255; */
            //newdataOUptut
            
                    outputData[1203] = 0;
                    outputData[1204] = 0;
                    outputData[1205] = 0;
    
            
    
            for (var i = 0; i < refData.length; i += 4) {

    
                
                
                
                
            
         //   if(outputData[i+1200] == 255){
            if(outputData[i+2] >= 200){
                
                    outputData[i] = 255;
                    outputData[i+1] = 255;
                    outputData[i+2] = 0;
            }
                
                else if (outputData[i] == 0){}
                
                
        //    if(outputData[i-1200] == 255){
    
                else{
                    
                    outputData[i] = 255;
                    outputData[i+1] = 255;
                    outputData[i+2] = 255;
                }
                
                
                
                
                if(outputData[i+1200] == outputData[i] ){
                    
                    outputData[i] = 255;
                }
                
                
          //  outputData[i] = 255;
        //    }
           // outputData[i+] = 255;
           // outputData[i+1] = 0;
        //    outputData[i+2] = 0;
                
            
            
            }

    //    }
        
        
    //    else {
    //        console.log("("+refData[i]+"."+refData[i+1]+","+refData[i+2]+")"+" -- ("+compareData[i]+"."+compareData[i+1]+","+compareData[i+2]+")");
    //        outputData[i] = 0;
     //       outputData[i + 1] = 0;
       //     outputData[i + 2] = 0;
            
//}
   // }
}

function onClick() {
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    invertColors(imageData.data);
    context.putImageData(imageData, 0, 0);
}

function invertColors(data) {
    for (var i = 0; i < data.length; i += 4) {
        data[i] = data[i] ^ 255;
        data[i + 1] = data[i + 1] ^ 255;
        data[i + 2] = data[i + 2] ^ 255;
    }
}




window.addEventListener('load', init);
