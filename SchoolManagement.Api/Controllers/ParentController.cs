using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Business.Interface;
using SchoolManagement.Model;
using System;
using System.Collections.Generic;

namespace SchoolManagement.Api.Controllers
{
    /// <summary>
    /// Parent related operations
    /// </summary>
    [Route("parent")]
    public class ParentController : BaseController
    {
        private IParentBusiness _parentBusiness;
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="parentBusiness"></param>
        public ParentController(IParentBusiness parentBusiness)
        {
            _parentBusiness = parentBusiness;
        }

        /// <summary>
        /// Add student parents
        /// </summary>
        /// <param name="parent"></param>
        /// <returns></returns>
        [HttpPost("register")]
        public IActionResult Register([FromBody]List<Parent> parent)
        {
            try
            {
                var result = new List<Guid>();
                result = _parentBusiness.Register(parent);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
