package com;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;

import config.DBConnector;

public class Doctor {

	public String insertDoctor(String nic, String fname, String lname, String Dob, String age, String email, String gender, String liscen,
			String special, String phone, String charge) {
		String output = "";

		try (Connection con = DBConnector.getConnection()) {

			if (con == null) {
				return "Error while connecting to the database for inserting.";
			}

			// create a prepared statement
			String query = " INSERT INTO doctor(`doc_id`, `doc_nic`, `doc_fname`, `doc_lname`, `DOB`, `age`, `doc_email`, `doc_gender`, `liscen_no`, `specialization`, `phone`, `doc_charge`)"
					+ " VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

			PreparedStatement preparedStmt = con.prepareStatement(query);

			// binding values
			preparedStmt.setInt(1, 0);
			preparedStmt.setString(2, nic);
			preparedStmt.setString(3, fname);
			preparedStmt.setString(4, lname);
			
			java.util.Date date = new SimpleDateFormat("yyyy-MM-dd").parse(Dob);
			java.sql.Date sqlDate = new java.sql.Date(date.getTime());

			preparedStmt.setDate(5, sqlDate);
			preparedStmt.setInt(6, Integer.parseInt(age));
			preparedStmt.setString(7, email);
			preparedStmt.setString(8, gender);
			preparedStmt.setString(9, liscen);
			preparedStmt.setString(10, special);
			preparedStmt.setString(11, phone);
			preparedStmt.setFloat(12, Float.parseFloat(charge));
			

			// execute the statement
			preparedStmt.execute();
			con.close();

			String newDoc = readDoctors();
			output = "{\"status\":\"success\", \"data\": \"" +
					newDoc + "\"}";
			
		} catch (Exception e) {
			output = "{\"status\":\"error\", \"data\":\"Error while inserting the Doctor.\"}";
			System.err.println(e.getMessage());
		}

		return output;
	}

	public String updateDoctor(String d_id, String nic, String fname, String lname, String dob, String age, String email, String gender, String liscen, String special,  String phone, String charge) 
	{   
		String output = ""; 
	 
		try(Connection con  = DBConnector.getConnection())   
		{    
					 
	        if (con == null)    
	        {return "Error while connecting to the database for updating."; } 
	 
	        // create a prepared statement    
	        String updatequery = "UPDATE doctor SET doc_nic =?, doc_fname =?, doc_lname =?, DOB =?, age =?, doc_email=?, doc_gender=?, liscen_no=?, specialization=?, phone=?, doc_charge=? WHERE doc_id=?"; 
	 
	        PreparedStatement preparedStmt = con.prepareStatement(updatequery); 
	 
	        // binding values
	        
	        preparedStmt.setString(1, nic);    
	        preparedStmt.setString(2, fname);
	        preparedStmt.setString(3, lname);
	        
	        java.util.Date date = new SimpleDateFormat("yyyy-MM-dd").parse(dob);
			java.sql.Date sqlDate = new java.sql.Date(date.getTime());

			preparedStmt.setDate(4, sqlDate);
			preparedStmt.setInt(5, Integer.parseInt(age));
	        preparedStmt.setString(6, email);
	        preparedStmt.setString(7, gender);
	        preparedStmt.setString(8, liscen);
	        preparedStmt.setString(9, special);
	        preparedStmt.setString(10,phone);
	        preparedStmt.setDouble(11, Double.parseDouble(charge));
	       
	        preparedStmt.setInt(12, Integer.parseInt(d_id));
	        
	 
	        // execute the statement    
	        preparedStmt.execute();    
	        con.close(); 
	 
	        String newDoc = readDoctors();
			output = "{\"status\":\"success\", \"data\": \""
	        + newDoc + "\"}";  
	    }   
		catch (Exception e)   
		{    
			output = "{\"status\":\"error\", \"data\":\"Error while updating the Doctor.\"}";
			System.err.println(e.getMessage()); 
		} 
	 
	    return output;  
	}
	
	public String deleteDoctor(String d_id) {
		String output = null;
		try (Connection con = DBConnector.getConnection()) {
			if (con == null) {
				return "Error while connecting to the database";
			} else {
				String query = "delete from doctor where doc_id=?";
				PreparedStatement preparedStmt = con.prepareStatement(query);
				preparedStmt.setInt(1, Integer.parseInt(d_id));

				preparedStmt.execute();
				con.close();
				
				String newDoc = readDoctors();
				output = "{\"status\":\"success\", \"data\": \"" 
							+ newDoc + "\"}";
			}
		} catch (Exception e) {
			output = "{\"status\":\"error\", \"data\":\"Error while deleting the Doctor.\"}";
			System.err.println(e.getMessage());
		}
		return output;
	}

	public String readDoctors() {
		String output = "";

		try (Connection con = DBConnector.getConnection()) {

			if (con == null) {
				return "Error while connecting to the database for reading.";
			}

			// Prepare the html table to be displayed
			output = "<table border='1'><tr><th>D_NIC</th><th>D_fname</th><th>D_lanme</th><th>Date_Of_Birth</th><th>Age</th><th>D_email</th><th>D_gender</th><th>Liscen_No</th><th>D_specialization</th><th>D_phone</th><th>D_charge</th><th>Update</th><th>Remove</th></tr>";

			String query = "SELECT * FROM doctor";
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery(query);

			// iterate through the rows in the result set
			while (rs.next()) {
				String id = Integer.toString(rs.getInt("doc_id"));
				String nic = rs.getString("doc_nic");
				String fname = rs.getString("doc_fname");
				String lname = rs.getString("doc_lname");
				String dob = rs.getString("DOB");
				String age = Integer.toString(rs.getInt("age"));
				String email = rs.getString("doc_email");
				String gender = rs.getString("doc_gender");
				String liscen = rs.getString("liscen_No");
				String special = rs.getString("specialization");
				String phone = rs.getString("phone");
				String charge = Double.toString(rs.getDouble("doc_charge"));
				special = special.replace('+', ' ');
				email = email.replaceAll("%40", "@");
				lname = lname.replace('+', ' ');

				// Add into the html table
				output += "<tr><td><input id='hidDocIDUpdate' name='hidDocIDUpdate' type='hidden'"
						+ "value='" + id + "'>" + nic + "</td>";
				output += "<td>" + fname + "</td>";
				output += "<td>" + lname + "</td>";
				output += "<td>" + dob + "</td>";
				output += "<td>" + age + "</td>";
				output += "<td>" + email + "</td>";
				output += "<td>" + gender + "</td>";
				output += "<td>" + liscen + "</td>";
				output += "<td>" + special + "</td>";
				output += "<td>" + phone + "</td>";
				output += "<td>" + charge + "</td>";
			

					// buttons
				output += "<td><input name='btnUpdate' type='button'"
						+ "value='Update'"
						+ "class='btnUpdate btn btn-secondary'></td>"
						+ "<td><input name='btnRemove' type='button'"
						+ "value='Remove'"
						+ "class='btnRemove btn btn-danger' data-docid='"
						+ id + "'>" + "</td></tr>";

				}
				con.close();
				output += "</table>";
			
		} catch (Exception e) {
			output = "Error while reading";
			System.err.println(e.getMessage());
		}
		return output;
	}

	
}
