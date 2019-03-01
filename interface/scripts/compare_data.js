var tolerance = 15;
// tolerance = 2.5;


function compareData(refData, compareData, desiredData, outputData) {
    
    for (var i = 0; i < refData.length; i += 4) {
        
        if (refData[i] == compareData[i] && refData[i+1] == compareData[i+1] && refData[i+2] == compareData[i+2]) {
            outputData[i] = desiredData[i];
            outputData[i + 1] = desiredData[i + 1];
            outputData[i + 2] = desiredData[i + 2];
            //newdataOUptut

        }
    
        
        else {
            //console.log("("+refData[i]+"."+refData[i+1]+","+refData[i+2]+")"+" -- ("+compareData[i]+"."+compareData[i+1]+","+compareData[i+2]+")");
            outputData[i] = compareData[i];
            outputData[i + 1] = compareData[i + 1];
            outputData[i + 2] = compareData[i + 2];
            
        }
        
        for(var o = 0; o < 20; o++){
            if (refData[i]+o == compareData[i] || refData[i+1]+o == compareData[i+1]|| refData[i+2]+o == compareData[i+2]){
                outputData[i] = desiredData[i];
                outputData[i + 1] = desiredData[i + 1];
                outputData[i + 2] = desiredData[i + 2];
                //newdataOUptut
            }
            else if (refData[i]-o == compareData[i] || refData[i+1]-o == compareData[i+1]|| refData[i+2]-o == compareData[i+2]){
                outputData[i] = desiredData[i];
                outputData[i + 1] = desiredData[i + 1];
                outputData[i + 2] = desiredData[i + 2];
                //newdataOUptut
            }
        } 
        
                //check surrounding pixels
        
    
        //CHECK PIXEL NEXT TO IT LEFT
        
        if (desiredData[i] == desiredData[i-3] && outputData[i+1] == desiredData[i-3] && desiredData[i+2] == desiredData[i-3]){
            
                outputData[i] = desiredData[i];
                outputData[i + 1] = desiredData[i + 1];
                outputData[i + 2] = desiredData[i + 2];
            
        }
        
        
        
        //CHECKS SUPOSSEDLY THE PIXEL UDERNEATH
       
        if (desiredData[i] == desiredData[i+1200] && outputData[i+1] == desiredData[i+1201] && desiredData[i+2] == desiredData[i+1202]){
            
                outputData[i] = desiredData[i];
                outputData[i + 1] = desiredData[i + 1];
                outputData[i + 2] = desiredData[i + 2];
            
        }
        

         
    }
}



var refdatalist = [];
var comparedatalist = [];



function compareNew(refData, compareData, desiredData, outputData){
    
        
       // console.log(compareData[0] + " " + compareData[0+1] + " ", compareData[0+2]);
    
    
    
    
    
    //    console.log(deltaE([128, 0, 255], [128, 0, 255]));
    
    ///RGBA order, with integer values between 0 and 255 (inclusive).
    
    for(let i = 0; i < refData.length; i+=4){
        
        refdatalist = [refData[i],refData[i+1],refData[i+2]];
        comparedatalist = [compareData[i],compareData[i+1],compareData[i+2]];
        
    
        if (deltaE(refdatalist, comparedatalist) <= tolerance){
            
            outputData[i] = desiredData[i];
            outputData[i+1] = desiredData[i+1];
            outputData[i+2] = desiredData[i+2];
        }
        
        // INITAL CHECK to SEE IF REF COLORS ARE IDENTICAL TO COMPARE COLORS
        
        else if (refData[i] == compareData[i] && refData[i+1] == compareData[i+1] && refData[i+2] == compareData[i+2]){   

            outputData[i] = desiredData[i];
            outputData[i+1] = desiredData[i+1];
            outputData[i+2] = desiredData[i+2];
        }
        
        
        //CHECK ECLUDIAN DISTANC
        
        else {
            
            outputData[i] = compareData[i];
            outputData[i+1] = compareData[i+1];
            outputData[i+2] = compareData[i+2];
        }
         
    }
    
    
}


function deltaE(rgbA, rgbB) {
  let labA = rgb2lab(rgbA);
  let labB = rgb2lab(rgbB);
  let deltaL = labA[0] - labB[0];
  let deltaA = labA[1] - labB[1];
  let deltaB = labA[2] - labB[2];
  let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
  let deltaC = c1 - c2;
  let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  let sc = 1.0 + 0.045 * c1;
  let sh = 1.0 + 0.015 * c1;
  let deltaLKlsl = deltaL / (1.0);
  let deltaCkcsc = deltaC / (sc);
  let deltaHkhsh = deltaH / (sh);
  let i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
  return i < 0 ? 0 : Math.sqrt(i);
}


// RETURN VALUES


 //   <= not percptible by human eyes
 //  1-2 perceiveable by human eyes
 // 2- 10 perceptble at glance
 //   11-49 colors more similar than opposite
 //   100 colors exact opposite


function rgb2lab(rgb){
  let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;
  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
  return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}



