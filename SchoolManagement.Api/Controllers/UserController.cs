using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Business.Interface;
using SchoolManagement.Model;
using System;

namespace SchoolManagement.Api.Controllers
{
    /// <summary>
    /// User related operations
    /// </summary>
    [Route("user")]
    public class UserController : BaseController
    {
        private IUserBusiness _userBusiness;
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="userBusiness"></param>
        public UserController(IUserBusiness userBusiness)
        {
            _userBusiness = userBusiness;
        }

        /// <summary>
        /// Register new user(not in use)
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody]User user)
        {
            var result = false;
            try
            {
                //result = _userBusiness.Add(user);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Reset password(not in use)
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("forgetpwd")]
        public IActionResult ForgetPassword([FromBody]User user)
        {
            var result = false;
            try
            {
                //result = _userBusiness.ForgetPassword(user.Email);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Add new user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [Authorize(Roles = "ADMIN")]
        [HttpPost("add")]
        public IActionResult Add([FromBody]User user)
        {
            try
            {
                var result = false;
                result = _userBusiness.Add(user);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Update user details
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [Authorize(Roles = "ADMIN")]
        [HttpPost("update")]
        public IActionResult Update([FromBody]User user)
        {
            try
            {
                var result = _userBusiness.Update(user);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Delete user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [Authorize(Roles = "ADMIN")]
        [HttpPost("delete")]
        public IActionResult Delete([FromBody]User user)
        {
            try
            {
                var result = _userBusiness.Delete(user.Id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Search user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost("search")]
        public IActionResult Search([FromBody]User user)
        {
            try
            {
                var result = _userBusiness.Search(user);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]User user)
        {
            try
            {
                var usr = _userBusiness.Authenticate(user.Username, user.Password);
                if (usr == null)
                    return BadRequest(new { message = "Username or password is incorrect" });
                return Ok(usr);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
