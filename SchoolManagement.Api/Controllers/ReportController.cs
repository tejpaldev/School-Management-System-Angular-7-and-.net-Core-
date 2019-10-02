using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Business.Interface;
using SchoolManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SchoolManagement.Api.Controllers
{
    /// <summary>
    /// Controller to generate report
    /// </summary>
    [Route("report")]
    public class ReportController : BaseController
    {
        private IReportBusiness _reportBusiness;
        private IStudentBusiness _studentBusiness;
        private IFeeBusiness _feeBusiness;
        /// <summary>
        /// Constructor
        /// </summary>
        public ReportController(IReportBusiness reportBusiness, IStudentBusiness studentBusiness, IFeeBusiness feeBusiness)
        {
            _reportBusiness = reportBusiness;
            _studentBusiness = studentBusiness;
            _feeBusiness = feeBusiness;
        }

        /// <summary>
        /// Report generation for fee
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpPost("feereport")]
        public IActionResult FeeReports([FromBody]ReportFilter filter)
        {
            try
            {
                var report = _reportBusiness.FeeReports(filter);
                return Ok(report);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Report generation for fee collection
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpPost("feecollection")]
        public IActionResult FeeCollection([FromBody]ReportFilter filter)
        {
            try
            {
                var report = _feeBusiness.FeeCollection(filter);
                return Ok(report);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Report generation for defaulter student
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpPost("defaulterstudent")]
        public IActionResult DefaulterStudent([FromBody]ReportFilter filter)
        {
            try
            {
                var report = _feeBusiness.FeeDefaulter(filter);
                return Ok(report);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Report generation for defaulter student
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpPost("studentprofile")]
        public IActionResult StudentProfile([FromBody]ReportFilter filter)
        {
            try
            {
                var report = _studentBusiness.StudentProfile(filter);
                return Ok(report);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Report generation for Admission
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpPost("admission")]
        public IActionResult Admission([FromBody]ReportFilter filter)
        {
            try
            {
                //var report = _reportBusiness.FeeReports(filter);
                //return Ok(report);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
