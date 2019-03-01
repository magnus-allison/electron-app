
var paused = false;

function init() {

    //Loading the Camera (Ask for permissions)
 
    /*
    if (navigator.mediaDevices.getUserMedia) {       
    navigator.mediaDevices.getUserMedia({video: true})
      .then(function(stream) {
        video.srcObject = stream;
      })
      .catch(function(error) {
        console.log("Something went wrong!");
      });
    }
    
    */
    
    var refCanvas = document.getElementById('ref_canvas');
    var compareCanvas = document.getElementById('compare_canvas');
    var desiredCanvas = document.getElementById('desired_canvas');
    var outputCanvas = document.getElementById('output_canvas');

    var refContext = refCanvas.getContext('2d');
    var desiredContext = desiredCanvas.getContext('2d');
    var compareContext = compareCanvas.getContext('2d');
    var outputContext =outputCanvas.getContext('2d');

    var refImage = new Image();
        refImage.src = "./Images/empty.png";
        refImage.onload = function () {
            drawImage(refImage ,refCanvas, refContext);
    }
        
     var desiredImage = new Image();
        desiredImage.src = "./Images/empty.png";
        desiredImage.onload = function () {
            drawImage(desiredImage ,desiredCanvas, desiredContext);
    }
        
        
    video = document.getElementById('SourceVideo');
    video.muted = true;
    if (video.readyState >= 3) {
        canPlay = true;
        playVideo();
    } else {
        video.addEventListener('canplay', playVideo);
        var compareImage = new Image();
            compareImage.src = "./Images/empty.png";
            compareImage.onload = function () {
            drawImage(compareImage ,compareCanvas, compareContext);
        }
    }
    var outputImage = new Image();
        outputImage.src = "./Images/empty.png";
        outputImage.onload = function () {
            drawImage(outputImage ,outputCanvas, outputContext);
    }
        
    document.getElementById("ref_canvas").onclick = newRef;
    document.getElementById("overlay").onclick = popdown;
    
    //On Enter URL
    
       document.getElementById("custom_url").onblur = function(e){
           
           if( document.getElementById("custom_url").value == ""){
               //do nothing
               document.getElementById("preview").src = "./Images/empty.png";
           }
           else{
               var previewPic = document.getElementById("custom_url").value;

               document.getElementById("preview").src = previewPic;
               
               //document.getElementById("preview").style.backgroundImage = 'url("' + previewPic + '")';
               //document.getElementById("preview").style.backgroundSize = "cover";
           }
           
       };
    
       document.getElementById("preview_file").onchange = function(){
           
           if(this.files[0].type == 'image/jpeg' || this.files[0].type == 'image/png'  || this.files[0].type == 'image/bmp' || this.files[0].type == 'image/raw'){
           
           var file = this.files[0];
           document.getElementById("upload_status").innerHTML = file.name;
           document.getElementById("upload_status").style.color = "#27ae60";
           
         //  document.getElementById("preview").style.backgroundImage = 'url("' + URL.createObjectURL(file) + '")';
         //  document.getElementById("preview").style.backgroundSize = "cover";
           
           document.getElementById("preview").src = URL.createObjectURL(file);
               
               
           } else {
               
               alert("File must be in the format of JPG, PNG, BMP or RAW");
               
           }
           
       };
    
     document.getElementById("overlay_accept").onclick = function(){
         
         copyImage = document.getElementById("preview");
         
         //alert(bg_url.substring(4, bg_url.length-1));
         
        // desiredImage.src = bg_url.substring(4, bg_url.length-1);
         desiredContext.drawImage(copyImage, 0, 0, desiredCanvas.width, desiredCanvas.height);
         popdown(this,true);
         
     };
    
     document.getElementById("overlay_decline").onclick = function(){
         popdown(this,true);
         document.getElementById("upload_status").innerHTML = "No file Selected";
         document.getElementById("upload_status").style.color = "#c0392b";
     };
       
    document.getElementById("desired_canvas").onclick = function(){
        popup(273,"Select a source Destination")
        
        document.getElementById("upload_status").innerHTML = "No file Selected";
        document.getElementById("upload_status").style.color = "#c0392b";
        
    }
    
    
    /// STOCK IMAGES
    
        document.getElementById("stock_1").onclick = function(){document.getElementById("preview").src = "beach.jpg"}
        document.getElementById("stock_2").onclick = function(){document.getElementById("preview").src = "forrest.jpg"}
        document.getElementById("stock_3").onclick = function(){document.getElementById("preview").src = "desert.jpg"}
    

}

//Custom file read // Evrntually make function
function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                alert(e.target.result.toString());
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }


function drawImage(image, canvas, context) {
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

function getData() {
    var refImageData = refContext.getImageData(0, 0, refCanvas.width, refCanvas.height);
    var compareImageData = compareContext.getImageData(0, 0, compareCanvas.width, compareCanvas.height);
    var outputImageData = outputContext.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    var desiredImageData = desiredContext.getImageData(0, 0, desiredCanvas.width, desiredCanvas.height);
    compareNew(refImageData.data, compareImageData.data, desiredImageData.data, outputImageData.data);
    outputContext.putImageData(outputImageData, 0, 0);
}

function popdown(e,bypass){
    if(bypass){
        document.getElementById("overlay").style.display = "none";        
    }else{
    if(e.target !== this)
        return;
    document.getElementById("overlay").style.display = "none";
    }
}

function popup(width,text){

    document.getElementById("overlay").style.display = "block";
    document.getElementById("overlay_title").innerHTML = text;
    document.getElementById("overlay_title").style.width = width + "px";

}

function playVideo() {
    video.play();
    drawFrame(video);
}


function pauseVideo() {
    getData();
    video.pause();
}

function newRef(){
    
    refContext.drawImage(video, 0, 0, refCanvas.width, refCanvas.height);
    getData();
}

function drawFrame(video) {
  compareContext.drawImage(video, 0, 0, compareCanvas.width, compareCanvas.height);
  getData();
    
  setTimeout(function () {
    drawFrame(video);
  }, 1000/120);
}

window.addEventListener('load', init);
