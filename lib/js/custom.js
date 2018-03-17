
$(".contactFormBtn").click(function(e) {
    alert("submitclick");
    var url = "http://vetcampus.in/onlinehotel/js/contactUs/template/contactUs.php"; // the script where you handle the form input.

    $.ajax({
        type: "POST",
        url: url,
        data: $("#contactForm").serialize(), // serializes the form's elements.
        success: function(data)
        {
            alert(data); // show response from the php script.
        }
    });

     e.preventDefault(); // avoid to execute the actual submit of the form.
});