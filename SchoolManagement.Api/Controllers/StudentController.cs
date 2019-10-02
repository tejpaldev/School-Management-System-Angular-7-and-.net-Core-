using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Business.Interface;
using SchoolManagement.Model;
using System;
using System.Collections.Generic;

namespace SchoolManagement.Api.Controllers
{
    /// <summary>
    /// Student related operations
    /// </summary>
    [Route("student")]
    public class StudentController : BaseController
    {
        private IStudentBusiness _studentBusiness;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="studentBusiness"></param>
        public StudentController(IStudentBusiness studentBusiness)
        {
            _studentBusiness = studentBusiness;
        }

        /// <summary>
        /// Student admission
        /// </summary>
        /// <param name="student"></param>
        /// <returns></returns>
        [HttpPost("register")]
        public IActionResult Register([FromBody]Student student)
        {
            try
            {
                var result = _studentBusiness.Register(student);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Search student
        /// </summary>
        /// <param name="searchForm"></param>
        /// <returns></returns>
        [HttpPost("search")]
        public IActionResult Search([FromBody]SearchForm searchForm)
        {
            try
            {
                var result = new List<Student>();
                result = _studentBusiness.Search(searchForm);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Re-Admission of student
        /// </summary>
        /// <param name="student"></param>
        /// <returns></returns>
        [HttpPost("readmission")]
        public IActionResult ReAdmission([FromBody]Student student)
        {
            try
            {
                var result = _studentBusiness.ReAdmission(student);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Get all student types
        /// </summary>
        /// <returns></returns>
        [HttpGet("studenttype")]
        public IActionResult StudentType()
        {
            try
            {
                var result = _studentBusiness.StudentType();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Add student type
        /// </summary>
        /// <param name="studentType"></param>
        /// <returns></returns>
        [HttpPost("addstutype")]
        public IActionResult AddStudentType([FromBody]StudentType studentType)
        {
            try
            {
                var result = _studentBusiness.AddStudentType(studentType);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Edit student type
        /// </summary>
        /// <param name="studentType"></param>
        /// <returns></returns>
        [HttpPost("editstutype")]
        public IActionResult EditStudentType([FromBody]StudentType studentType)
        {
            try
            {
                var result = _studentBusiness.EditStudentType(studentType);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Delete student type
        /// </summary>
        /// <param name="studentType"></param>
        /// <returns></returns>
        [HttpPost("deletestutype")]
        public IActionResult DeleteStudentType([FromBody]StudentType studentType)
        {
            try
            {
                var result = _studentBusiness.DeleteStudentType(studentType);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Get all student type fee discount
        /// </summary>
        /// <returns></returns>
        [HttpGet("feediscount")]
        public IActionResult StudentFeeDiscount()
        {
            try
            {
                var result = _studentBusiness.StudentFeeDiscount();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Add Student type fee discount
        /// </summary>
        /// <param name="stuFeeDiscount"></param>
        /// <returns></returns>
        [HttpPost("addfeediscount")]
        public IActionResult AddStudentFeeDiscount([FromBody]StudentFeeDiscount stuFeeDiscount)
        {
            try
            {
                var result = _studentBusiness.AddStudentFeeDiscount(stuFeeDiscount);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Edit student type fee discount
        /// </summary>
        /// <param name="stuFeeDiscount"></param>
        /// <returns></returns>
        [HttpPost("editfeediscount")]
        public IActionResult EditStudentFeeDiscount([FromBody]StudentFeeDiscount stuFeeDiscount)
        {
            try
            {
                var result = _studentBusiness.EditStudentFeeDiscount(stuFeeDiscount);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Delete student fee discount
        /// </summary>
        /// <param name="stuFeeDiscount"></param>
        /// <returns></returns>
        [HttpPost("deletefeediscount")]
        public IActionResult DeleteStudentFeeDiscount([FromBody]StudentFeeDiscount stuFeeDiscount)
        {
            try
            {
                var result = _studentBusiness.DeleteStudentFeeDiscount(stuFeeDiscount);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
