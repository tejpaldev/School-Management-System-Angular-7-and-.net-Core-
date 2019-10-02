using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Business.Interface;
using SchoolManagement.Model;
using System;

namespace SchoolManagement.Api.Controllers
{
    /// <summary>
    /// Transport related operations
    /// </summary>
    [Route("transport")]
    public class TransportController : BaseController
    {
        private ITransportBusiness _transportBusiness;
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="transportBusiness"></param>
        public TransportController(ITransportBusiness transportBusiness)
        {
            _transportBusiness = transportBusiness;
        }

        /// <summary>
        /// Get all active locations
        /// </summary>
        /// <returns></returns>
        [HttpGet("location")]
        public IActionResult Location()
        {
            try
            {
                var result = _transportBusiness.Location();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }

        /// <summary>
        /// Get bus route
        /// </summary>
        /// <param name="locationId"></param>
        /// <returns></returns>
        [HttpGet("busroute/{locationId:Guid}")]
        public IActionResult BusRoute(Guid locationId)
        {
            try
            {
                var result = _transportBusiness.SearchBusrouteByLocationId(locationId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Search location
        /// </summary>
        /// <param name="location"></param>
        /// <returns></returns>
        [HttpPost("searchlocation")]
        public IActionResult SearchLocation([FromBody]Location location)
        {
            try
            {
                var result = _transportBusiness.SearchLocation(location);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Add new location
        /// </summary>
        /// <param name="location"></param>
        /// <returns></returns>
        [HttpPost("addlocation")]
        public IActionResult AddLocation([FromBody]Location location)
        {
            try
            {
                var result = _transportBusiness.AddLocation(location);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Edit location
        /// </summary>
        /// <param name="location"></param>
        /// <returns></returns>
        [HttpPost("editlocation")]
        public IActionResult EditLocation([FromBody]Location location)
        {
            try
            {
                var result = _transportBusiness.EditLocation(location);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Delete location
        /// </summary>
        /// <param name="location"></param>
        /// <returns></returns>
        [HttpPost("deletelocation")]
        public IActionResult DeleteLocation([FromBody]Location location)
        {
            try
            {
                var result = _transportBusiness.DeleteLocation(location);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Search bus route
        /// </summary>
        /// <param name="busroute"></param>
        /// <returns></returns>
        [HttpPost("searchbusroute")]
        public IActionResult SearchBusroute([FromBody]Busroute busroute)
        {
            try
            {
                var result = _transportBusiness.SearchBusroute(busroute);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Add new bus route
        /// </summary>
        /// <param name="busroute"></param>
        /// <returns></returns>
        [HttpPost("addbusroute")]
        public IActionResult AddBusroute([FromBody]Busroute busroute)
        {
            try
            {
                var result = _transportBusiness.AddBusroute(busroute);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// edit bus route
        /// </summary>
        /// <param name="busroute"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("editbusroute")]
        public IActionResult EditBusroute([FromBody]Busroute busroute)
        {
            try
            {
                var result = _transportBusiness.EditBusroute(busroute);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Delete bus route
        /// </summary>
        /// <param name="busroute"></param>
        /// <returns></returns>
        [HttpPost("deletebusroute")]
        public IActionResult DeleteBusroute([FromBody]Busroute busroute)
        {
            try
            {
                var result = _transportBusiness.DeleteBusroute(busroute);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
