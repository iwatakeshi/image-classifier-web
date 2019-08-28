$(document).ready(function () {
    
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();
    let net;
    let imgEl;
    

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {

            var reader = new FileReader();

            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 
                    'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
                imgEl = new Image();
                imgEl.src = e.target.result
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    // Image Upload - On Change
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    // Predict
    $('#btn-predict').click(function () {        
        
        // Show loading animation
        $(this).hide();
        $('.loader').show();        
        app(imgEl);
        
        
    });

    async function app(imgEl) {
        console.log('Loading mobilenet..');
        
        // Load the model.
        net = await mobilenet.load();
        console.log('Sucessfully loaded model');
        
        // Make a prediction through the model on our image     
        const result = await net.classify(imgEl);
        percent = Math.round(result[0].probability*100,2)
        resultText = percent + "% chance image is a " + result[0].className;
        
        $('#result').text(resultText)        
        $('#result').show();
        $('.loader').hide();  
    }    
});

