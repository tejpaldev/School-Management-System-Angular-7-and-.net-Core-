using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Business.Interface;
using SchoolManagement.Model;
using System;
using System.Collections.Generic;

namespace SchoolManagement.Api.Controllers
{
    /// <summary>
    /// All master data related operations
    /// </summary>
    [Route("master")]
    public class MasterController : BaseController
    {
        private IMasterBusiness _masterBusiness;
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="masterBusiness"></param>
        public MasterController(IMasterBusiness masterBusiness)
        {
            _masterBusiness = masterBusiness;
        }

        /// <summary>
        /// Get gender list
        /// </summary>
        /// <returns></returns>
        [HttpGet("gender")]
        public IActionResult Gender()
        {
            try
            {
                var result = _masterBusiness.Gender();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Get blood group list
        /// </summary>
        /// <returns></returns>
        [HttpGet("bloodgroup")]
        public IActionResult Bloodgroup()
        {
            try
            {
                var result = _masterBusiness.Bloodgroup();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Get religion list
        /// </summary>
        /// <returns></returns>
        [HttpGet("religion")]
        public IActionResult Religion()
        {
            try
            {
                var result = _masterBusiness.Religion();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Get category list
        /// </summary>
        /// <returns></returns>
        [HttpGet("category")]
        public IActionResult Category()
        {
            try
            {
                var result = new List<Category>();
                result = _masterBusiness.Category();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }            
        }

        /// <summary>
        /// Get parent type list
        /// </summary>
        /// <returns></returns>
        [HttpGet("parenttype")]
        public IActionResult ParentType()
        {
            try
            {
                var result = _masterBusiness.Parenttype();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Get status list
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("status")]
        public IActionResult Status()
        {
            try
            {
                var result = _masterBusiness.Status();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
