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

