<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="com.Doctor"  %>  

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Doctor Service</title>

<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.5.0.min.js"></script>
<script src="Components/Doctor.js"></script>

<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  
<script>
 $(function() {
    $("#dob").datepicker({
    onSelect: function(value, ui) {
        var today = new Date(), 
            age = today.getFullYear() - ui.selectedYear;
        $('#age').val(age);
    },
      
    dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
    });
     
});
</script>

</head>
<body>

	<div class="container">
		<div class="row">
		 <div class="col-6">     
			<form id="formDoctor" name="formDoctor" method="post" action="doctor.jsp">
			<h1>Doctor Service</h1><br>
			
				    NIC: 
				    <input id="docNic" name="docNic" type="text" class="form-control form-control-sm" placeholder="123456789V"> 
					<br> 
					First Name: 
				    <input id="fname" name="fname" type="text" class="form-control form-control-sm"> 
					<br> 
					Last Name: 
				    <input id="lname" name="lname" type="text" class="form-control form-control-sm"> 
					<br> 
					Date of Birth: 
					<input id="dob" name="dob" type="text" class="form-control form-control-sm" placeholder="DD-MM-YYYY"> 
					<br>
					Age: 
				    <input id="age" name="age" type="text" class="form-control form-control-sm" readonly> 
					<br> 
					Email: 
				    <input id="docEmail" name="docEmail" type="email" class="form-control form-control-sm" placeholder="example@gmail.com"> 
				    <br>
				    
				    
				    Gender:<br>
				    	&nbsp;&nbsp;Male  
				    	<input type="radio" id="rdoGenderMale" name="rdoGender" value="Male">  
				    	&nbsp;&nbsp;Female  
				    	<input type="radio" id="rdoGenderFemale" name="rdoGender" value="Female">   
				    
					<br> <br>
					
					Doctor Licen Number: 
					<input id="licen" name="licen" type="text" class="form-control form-control-sm" placeholder="Dxxxxx"> 
					<br> 
					
					Specialization:    
					<select id="special" name="special" class="form-control form-control-sm">     
						<option value="0">--Select Specialization--</option>     
						<option value="Accupuncture">Accupuncture</option>     
						<option value="Anaesthesiologist">Anaesthesiologist</option>
						<option value="Allergy Specialist">Allergy Specialist</option>     
						<option value="Bacteriologist">Bacteriologist</option>     
						<option value="Cardiologist">Cardiologist</option>
						<option value="Cardiac Surgeon">Cardiac Surgeon</option>
						<option value="Counsellor">Counsellor</option>
						<option value="Dentist">Dentist</option>
						<option value="Dietician">Dietician</option>
						<option value="Embryologist">Embryologist</option>
						<option value="Endocnnologist">Endocnnologist</option>
						<option value="Ent And Neck Surgeon">Ent And Neck Surgeon</option>
						<option value="General">General</option>
						<option value="Hepatologists">Hepatologists</option>
						<option value="Immunologist">Immunologist</option> 
						<option value="Mycologist">Mycologist</option> 
						<option value="Neurologist">Neurologist</option>   
						<option value="Urologist">Urologist</option>
						  	
					</select>   
					
					<br>				  
					Phone Number: 
					<input id="docPhone" name="docPhone" type="text" class="form-control form-control-sm" placeholder="000 000 0000">
				    <br>
				    Doctor Charge: 
				    <input id="docCharge" name="docCharge" type="text" class="form-control form-control-sm"> 
				    <br> 
				    
				    <input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary"> 
				    <input type="hidden" id="hidDocIDSave" name="hidDocIDSave" value="">
			</form><br>
		
			<div id="alertSuccess" class="alert alert-success"></div>

			<div id="alertError" class="alert alert-danger"></div>
			
			<br>
   			<div id="divDoctorGrid"> 
				<%
					Doctor docObj = new Doctor();
					out.print(docObj.readDoctors());
				%>
			</div>
		</div>
	</div>
</div>
</body>
</html>