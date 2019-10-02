using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Business.Interface;
using SchoolManagement.Model;
using System;
using System.Collections.Generic;

namespace SchoolManagement.Api.Controllers
{
    /// <summary>
    /// This class is used for operations on class
    /// </summary>
    [Route("class")]
    public class ClassController : BaseController
    {
        private IClassBusiness _classBusiness;

        /// <summary>
        /// Constructor for class
        /// </summary>
        /// <param name="classBusiness"></param>
        public ClassController(IClassBusiness classBusiness)
        {
            _classBusiness = classBusiness;
        }

        /// <summary>
        /// Get all list of active class
        /// </summary>
        /// <returns></returns>
        [HttpGet("class")]
        public IActionResult Class()
        {
            var result = new List<Class>();
            try
            {
                result = _classBusiness.Class();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Get all list of active sections
        /// </summary>
        /// <param name="classId"></param>
        /// <returns></returns>
        [HttpGet("section/{classId:Guid?}")]
        public IActionResult Section(Guid? classId = null)
        {
            try
            {
                var result = _classBusiness.Section(classId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Get all list of active streams
        /// </summary>
        /// <param name="classId"></param>
        /// <param name="sectionId"></param>
        /// <returns></returns>
        [HttpGet("stream/{classId:Guid?}/{sectionId:Guid?}")]
        public IActionResult Stream(Guid? classId = null, Guid? sectionId = null)
        {
            try
            {
                var result = _classBusiness.Stream(classId, sectionId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Get all list of section in classes
        /// </summary>
        /// <param name="classId"></param>
        /// <param name="sectionId"></param>
        /// <returns></returns>
        [HttpGet("classsection/{classId:Guid?}/{sectionId:Guid?}")]
        public IActionResult ClassSection(Guid? classId = null, Guid? sectionId = null)
        {
            try
            {
                var result = _classBusiness.ClassSection(classId, sectionId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Get all list of stream in classes
        /// </summary>
        /// <param name="classId"></param>
        /// <param name="sectionId"></param>
        /// <param name="streamId"></param>
        /// <returns></returns>
        [HttpGet("classstream/{classId:Guid?}/{sectionId:Guid?}/{streamId:Guid?}")]
        public IActionResult ClassStream(Guid? classId = null, Guid? sectionId = null, Guid? streamId = null)
        {
            try
            {
                var result = _classBusiness.ClassStream(classId, sectionId, streamId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Add new class
        /// </summary>
        /// <param name="classes"></param>
        /// <returns></returns>
        [HttpPost("add")]
        public IActionResult Add([FromBody]Class classes)
        {
            try
            {
                var result = false;
                result = _classBusiness.Add(classes);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Delete existing class
        /// </summary>
        /// <param name="classes"></param>
        /// <returns></returns>
        [HttpPost("delete")]
        public IActionResult Delete([FromBody]Class classes)
        {
            try
            {
                var result = false;
                result = _classBusiness.Delete(classes.Id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Add new section
        /// </summary>
        /// <param name="section"></param>
        /// <returns></returns>
        [HttpPost("addsection")]
        public IActionResult AddSection([FromBody]Section section)
        {
            try
            {
                var result = false;
                result = _classBusiness.AddSection(section);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Delete existing section
        /// </summary>
        /// <param name="section"></param>
        /// <returns></returns>
        [HttpPost("deletesection")]
        public IActionResult DeleteSection([FromBody]Section section)
        {
            try
            {
                var result = false;
                result = _classBusiness.DeleteSection(section.Id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Add new stream
        /// </summary>
        /// <param name="stream"></param>
        /// <returns></returns>
        [HttpPost("addstream")]
        public IActionResult AddStream([FromBody]Stream stream)
        {
            try
            {
                var result = false;
                result = _classBusiness.AddStream(stream);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Delete existing stream
        /// </summary>
        /// <param name="stream"></param>
        /// <returns></returns>
        [HttpPost("deletestream")]
        public IActionResult DeleteStream([FromBody]Stream stream)
        {
            try
            {
                var result = false;
                result = _classBusiness.DeleteStream(stream.Id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Add section to class
        /// </summary>
        /// <param name="classSection"></param>
        /// <returns></returns>
        [HttpPost("addclasssection")]
        public IActionResult AddClassSection([FromBody]ClassSection classSection)
        {
            try
            {
                var result = false;
                result = _classBusiness.AddClassSection(classSection);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Delete section from class
        /// </summary>
        /// <param name="classSection"></param>
        /// <returns></returns>
        [HttpPost("deleteclasssection")]
        public IActionResult DeleteClassSection([FromBody]ClassSection classSection)
        {
            try
            {
                var result = false;
                result = _classBusiness.DeleteClassSection(classSection.Id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Add Stream to class
        /// </summary>
        /// <param name="classStream"></param>
        /// <returns></returns>
        [HttpPost("addclassstream")]
        public IActionResult AddClassStream([FromBody]ClassStream classStream)
        {
            try
            {
                var result = false;
                result = _classBusiness.AddClassStream(classStream);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Delete stream from class
        /// </summary>
        /// <param name="classStream"></param>
        /// <returns></returns>
        [HttpPost("deleteclassstream")]
        public IActionResult DeleteClassStream([FromBody]ClassStream classStream)
        {
            try
            {
                var result = false;
                result = _classBusiness.DeleteClassStream(classStream.Id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
