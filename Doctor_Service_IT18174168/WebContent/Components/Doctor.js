$(document).ready(function() {
	if ($("#alertSuccess").text().trim() == "") {
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});

// SAVE
$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();

	// Form validation-------------------
	var status = validateItemForm();

	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}

	// If valid------------------------
	var type = ($("#hidDocIDSave").val() == "") ? "POST" : "PUT";
	
	$.ajax({
		url : "DoctorAPI",
		type : type,
		data : $("#formDoctor").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onDoctorSaveComplete(response.responseText, status);
		}
	});
});

function onDoctorSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divDoctorGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidDocIDSave").val("");
	$("#formDoctor")[0].reset();
}

$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "DoctorAPI",
		type : "DELETE",
		data : "doc_id=" + $(this).data("docid"),
		dataType : "text",
		complete : function(response, status) {
			onDoctorDeleteComplete(response.responseText, status);
		}
	});
});

function onDoctorDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divDoctorGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}

// UPDATE
$(document).on(
				"click",
				".btnUpdate",
				function(event) {
					$("#hidDocIDSave").val($(this).closest("tr").find('#hidDocIDUpdate').val());
					$("#docNic").val($(this).closest("tr").find('td:eq(0)').text());
					$("#fname").val($(this).closest("tr").find('td:eq(1)').text());
					$("#lname").val($(this).closest("tr").find('td:eq(2)').text());
					$("#dob").val($(this).closest("tr").find('td:eq(3)').text());
					$("#age").val($(this).closest("tr").find('td:eq(4)').text());
					$("#docEmail").val($(this).closest("tr").find('td:eq(5)').text());
					
					var gen = 'Female';
					var value = gen === $(this).closest("tr").find('td:eq(6)').text()? 1:0;
					document.formDoctor.rdoGender[value].checked=true;
					
					$("#licen").val($(this).closest("tr").find('td:eq(7)').text());
					$("#special").val($(this).closest("tr").find('td:eq(8)').text());
					$("#docPhone").val($(this).closest("tr").find('td:eq(9)').text());
					$("#docCharge").val($(this).closest("tr").find('td:eq(10)').text());
					
});

//CLIENTMODEL
function validateItemForm() {
	// NIC
	if ($("#docNic").val().trim() == "") {
		return "Insert NIC.";
	}
	
	var re =  /^[0-9]{9}[vVxX]$/;
	var nic = $("#docNic").val().trim();
	if (re.test(nic) == false) {
		return "Please enter valid NIC Number";
	}
	
	//fname
	if ($("#fname").val().trim() == "") {
		return "Insert First Name.";
	}
	var fname = $("#fname").val().trim();
	if ($.isNumeric(fname)) {
		return "Insert only characters for First Name";
	}
	
	var re = /^[D][r][.]%[A-Za-z]$/;
	var fname = $("#fname").val().trim();

	if(re.test(fname)== false)
	{
		return "Please enter first name with valid type";	
	}
		
	//lname
	if ($("#lname").val().trim() == "") {
		return "Insert Last Name.";
	}
	var lname = $("#lname").val().trim();
	if ($.isNumeric(lname)) {
		return "Insert only characters for Last Name";
	}
	
	
	//DOB
	if ($("#dob").val().trim() == "") {
		return "Insert Date of Birth.";
	}
	
	
	// Doctor Email
	if ($("#docEmail").val().trim() == "") {
		return "Insert Email.";
	}
	//
	var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
	var email = $("#docEmail").val().trim();
	if (re.test(email) == false) {
		return "Please enter valid email address";
	}
	
	// GENDER  
	if ($('input[name="rdoGender"]:checked').length === 0)  {   
		return "Select gender.";  
	}
	
	//license
	if ($("#licen").val().trim() == "") {
		return "Insert License Number.";
	}
	
	var re = /^[D][0-9]{5}$/
	var licen = $("#licen").val().trim()

		if(re.test(licen)== false)
		{
		 return "Please enter valid License Number"	
	}

	// Specialization
	if ($("#special").val() == "0")  {
		return "Select Specialization.";
	}

	// Phone Number
	if ($("#docPhone").val().trim() == "") {
		return "Insert Phone Number.";
	}
	// Check for numeric value
	var phone = $("#docPhone").val().trim();
	if (!$.isNumeric(phone)) {
		return "Insert a correct conatct number (don't insert characters)";
	}
	// check for length
	var pattern = /^\d{10}$/;
	if (!pattern.test(phone)) {
		return "Contact number should have 10 numbers";
	}
	
	// Doctor Charge
	if ($("#docCharge").val().trim() == "") {
		return "Insert Doctor Charge.";
	}

	// Check for numeric value
	var charge = $("#docCharge").val().trim();
	if (!$.isNumeric(charge)) {
		return "Insert a numeric value for doctor charge";
	}
	$("#docCharge").val(parseFloat(charge).toFixed(2));
	
	return true;
}

