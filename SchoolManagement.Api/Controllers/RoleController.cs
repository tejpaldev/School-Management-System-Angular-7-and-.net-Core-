using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Business.Interface;
using SchoolManagement.Model;
using System;

namespace SchoolManagement.Api.Controllers
{
    /// <summary>
    /// Role related operations
    /// </summary>
    [Route("role")]
    public class RoleController : BaseController
    {
        private IRoleBusiness _roleBusiness;
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="roleBusiness"></param>
        public RoleController(IRoleBusiness roleBusiness)
        {
            _roleBusiness = roleBusiness;
        }
        
        /// <summary>
        /// Add new role
        /// </summary>
        /// <param name="role"></param>
        /// <returns></returns>
        [HttpPost("add")]
        public IActionResult Add([FromBody]Role role)
        {
            try
            {
                var result = _roleBusiness.Add(role);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Get all list of active roles
        /// </summary>
        /// <returns></returns>
        [HttpGet("roles")]
        public IActionResult Roles()
        {
            try
            {
                var result = _roleBusiness.Roles();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Delete role
        /// </summary>
        /// <param name="role"></param>
        /// <returns></returns>
        [HttpPost("delete")]
        public IActionResult Delete([FromBody]Role role)
        {
            try
            {
                var result = _roleBusiness.Delete(role.Id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Search active role
        /// </summary>
        /// <param name="role"></param>
        /// <returns></returns>
        [HttpPost("search")]
        public IActionResult Search([FromBody]Role role)
        {
            try
            {
                var result = _roleBusiness.Search(role);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
