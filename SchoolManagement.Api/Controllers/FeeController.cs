using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Business.Interface;
using SchoolManagement.Model;
using System;
using System.Collections.Generic;

namespace SchoolManagement.Api.Controllers
{
    /// <summary>
    /// All fee related operations
    /// </summary>
    [Route("fee")]
    public class FeeController : BaseController
    {
        private IFeeBusiness _feeBusiness;
        /// <summary>
        /// Constructor for fee
        /// </summary>
        /// <param name="feeBusiness"></param>
        public FeeController(IFeeBusiness feeBusiness)
        {
            _feeBusiness = feeBusiness;
        }

        /// <summary>
        /// Get all list of active fee type
        /// </summary>
        /// <returns></returns>
        [HttpGet("types/{classId:guid?}")]
        public IActionResult Types(Guid? classId = null)
        {
            try
            {
                var result = new List<FeeType>();
                result = _feeBusiness.Types(classId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Get all list of fee periods
        /// </summary>
        /// <returns></returns>
        [HttpGet("feeperiod")]
        public IActionResult Period()
        {
            try
            {
                var result = new List<FeePeriod>();
                result = _feeBusiness.Period();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Get all list of payment mode available
        /// </summary>
        /// <returns></returns>
        [HttpGet("paymentmode")]
        public IActionResult PaymentMode()
        {
            try
            {
                var result = new List<PaymentMode>();
                result = _feeBusiness.PaymentMode();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Pay student all relevant fee
        /// </summary>
        /// <param name="fees"></param>
        /// <returns></returns>
        [HttpPost("pay")]
        public IActionResult Pay([FromBody]List<Fee> fees)
        {
            try
            {
                var result = false;
                result = _feeBusiness.Pay(fees);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Get student fee details
        /// </summary>
        /// <param name="studentId"></param>
        /// <param name="classId"></param>
        /// <returns></returns>
        [HttpGet("details/{studentId:guid}/{classId:guid}")]
        public IActionResult FeeDetails(Guid studentId, Guid classId)
        {
            try
            {
                var result = new FeeDetails();
                result = _feeBusiness.FeeDetails(studentId, classId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Add new fee type
        /// </summary>
        /// <param name="feetype"></param>
        /// <returns></returns>
        [HttpPost("addtype")]
        public IActionResult AddTypes([FromBody]FeeType feetype)
        {
            try
            {
                var result = false;
                result = _feeBusiness.AddTypes(feetype);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Delete fee type
        /// </summary>
        /// <param name="feetype"></param>
        /// <returns></returns>
        [HttpPost("deletetype")]
        public IActionResult DeleteTypes([FromBody]FeeType feetype)
        {
            try
            {
                var result = false;
                result = _feeBusiness.DeleteTypes(feetype.Id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Get class fee list
        /// </summary>
        /// <param name="feetypeId"></param>
        /// <param name="classId"></param>
        /// <returns></returns>
        [HttpGet("classfee/{feetypeId:guid?}/{classId:guid?}")]
        public IActionResult ClassFee(Guid? feetypeId = null, Guid? classId = null)
        {
            try
            {
                var result = _feeBusiness.ClassFee(feetypeId, classId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Class Fee by class fee id
        /// </summary>
        /// <param name="classfeeId"></param>
        /// <returns></returns>
        [HttpGet("classfeebyid/{classfeeId:guid}")]
        public IActionResult ClassFee(Guid classfeeId)
        {
            try
            {
                var result = _feeBusiness.ClassFee(classfeeId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Define new fee to a class
        /// </summary>
        /// <param name="classFee"></param>
        /// <returns></returns>
        [HttpPost("addclassfee")]
        public IActionResult AddClassFee([FromBody]ClassFee classFee)
        {
            try
            {
                var result = _feeBusiness.AddClassFee(classFee);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Edit class fee
        /// </summary>
        /// <param name="classFee"></param>
        /// <returns></returns>
        [HttpPost("editclassfee")]
        public IActionResult EditClassFee([FromBody]ClassFee classFee)
        {
            try
            {
                var result = _feeBusiness.EditClassFee(classFee);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Delete fee from class
        /// </summary>
        /// <param name="classFee"></param>
        /// <returns></returns>
        [HttpPost("deleteclassfee")]
        public IActionResult DeleteClassFee([FromBody]ClassFee classFee)
        {
            try
            {
                var result = _feeBusiness.DeleteClassFee(classFee.Id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
