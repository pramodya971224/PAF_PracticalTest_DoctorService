package com;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class DoctorAPI
 */
@WebServlet("/DoctorAPI")
public class DoctorAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	Doctor docObj = new Doctor(); 
	
    public DoctorAPI() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String output = docObj.insertDoctor(request.getParameter("docNic"), request.getParameter("fname"),request.getParameter("lname"),request.getParameter("dob"),
				request.getParameter("age"), request.getParameter("docEmail"),request.getParameter("rdoGender"),request.getParameter("licen"), request.getParameter("special"),
				request.getParameter("docPhone"),request.getParameter("docCharge"));
		
		response.getWriter().write(output);
	}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Map paras = getParasMap(request);
		
		String output = docObj.updateDoctor(paras.get("hidDocIDSave").toString(), paras.get("docNic").toString(),
						paras.get("fname").toString(),paras.get("lname").toString(),paras.get("dob").toString(),paras.get("age").toString(),
						paras.get("docEmail").toString(),paras.get("rdoGender").toString(),
						paras.get("licen").toString(), paras.get("special").toString(),
						paras.get("docPhone").toString(),paras.get("docCharge").toString());
		
		response.getWriter().write(output);
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Map paras = getParasMap(request);
		String output = docObj.deleteDoctor(paras.get("doc_id").toString());
		response.getWriter().write(output);
	}
	
	private static Map getParasMap(HttpServletRequest request)
	{
		Map<String, String> map = new HashMap<String, String>();
		try
		{
				Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
				String queryString = scanner.hasNext() ?
				scanner.useDelimiter("\\A").next() : "";
				scanner.close();
				String[] params = queryString.split("&");
				for (String param : params)
				{
					String[] p = param.split("=");
					map.put(p[0], p[1]);
				}
		}
		catch (Exception e)
		{
		}
		return map;
	}

}
