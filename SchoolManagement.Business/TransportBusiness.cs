using System;
using System.Collections.Generic;
using SchoolManagement.Business.Interface;
using SchoolManagement.Model;
using SchoolManagement.DataAccess.Interface;
using System.Linq;
using DbModel = SchoolManagement.DataAccess.Models;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace SchoolManagement.Business
{
    public class TransportBusiness : ITransportBusiness
    {
        private ITransportDataAccess _transportDataAccess;
        private string _username;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TransportBusiness(ITransportDataAccess transportDataAccess, IHttpContextAccessor httpContextAccessor)
        {
            _transportDataAccess = transportDataAccess;
            _httpContextAccessor = httpContextAccessor;
            var result = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            _username = result == null ? "SYSTEM" : result.Value;
        }

        public List<Busroute> SearchBusrouteByLocationId(Guid locationId)
        {
            try
            {
                var busroute = _transportDataAccess.BusRoute(locationId).Select(x => new Busroute
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description
                }).ToList();
                return busroute;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Location> Location()
        {
            try
            {
                var location = _transportDataAccess.Location().Select(x => new Location
                {
                    Id = x.Id,
                    Name = x.Name,

                    Description = x.Description
                }).ToList();
                return location;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Busroute SearchBusroute(Busroute busroute)
        {
            try
            {
                var result = new DbModel.BusRoute();
                if (busroute.Id != Guid.Empty)
                {
                    result = _transportDataAccess.SearchBusRouteById(busroute.Id);
                }
                else if (!string.IsNullOrWhiteSpace(busroute.Name))
                {
                    result = _transportDataAccess.SearchBusRouteByName(busroute.Name);
                }
                else
                {
                    result = null;
                }
                if (result != null)
                {
                    var returnValue = new Busroute
                    {
                        Id = result.Id,
                        Name = result.Name,
                        Description = result.Description
                    };
                    return returnValue;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Location SearchLocation(Location location)
        {
            try
            {
                var result = new DbModel.Location();
                if (location.Id != Guid.Empty)
                {
                    result = _transportDataAccess.SearchLocationById(location.Id);
                }
                else if (!string.IsNullOrWhiteSpace(location.Name))
                {
                    result = _transportDataAccess.SearchLocationByName(location.Name);
                }
                else
                {
                    result = null;
                }
                if (result != null)
                {
                    var returnValue = new Location
                    {
                        Id = result.Id,
                        Name = result.Name,
                        Description = result.Description
                    };
                    return returnValue;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool AddLocation(Location location)
        {
            try
            {
                var loc = new DbModel.Location
                {
                    Id = Guid.NewGuid(),
                    Name = location.Name,
                    Description = location.Description,
                    StatusId = location.StatusId,
                    CreatedDate = DateTime.UtcNow,
                    CreatedBy = _username
                };
                var result = _transportDataAccess.AddLocation(loc);
                var returnValue = result > 0 ? true : false;
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool EditLocation(Location location)
        {
            try
            {
                var loc = _transportDataAccess.SearchLocationById(location.Id);
                if (loc != null)
                {
                    loc.Name = location.Name;
                    loc.Description = location.Description;
                    loc.ModifiedDate = DateTime.UtcNow;
                    loc.ModifiedBy = _username;
                    var result = _transportDataAccess.EditLocation(loc);
                    var returnValue = result > 0 ? true : false;
                    return returnValue;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool DeleteLocation(Location location)
        {
            try
            {
                var loc = _transportDataAccess.SearchLocationById(location.Id);
                if (loc != null)
                {
                    loc.StatusId = Guid.Parse(Helper.Constants.INACTIVESTATUS);
                    loc.ModifiedBy = _username;
                    loc.ModifiedDate = DateTime.UtcNow;
                    var result = _transportDataAccess.DeleteLocation(loc);
                    var returnValue = result > 0 ? true : false;
                    return returnValue;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool DeleteBusroute(Busroute busroute)
        {
            try
            {
                var bus = _transportDataAccess.SearchBusRouteById(busroute.Id);
                if (bus != null)
                {
                    bus.StatusId = Guid.Parse(Helper.Constants.INACTIVESTATUS);
                    bus.ModifiedBy = _username;
                    bus.ModifiedDate = DateTime.UtcNow;
                    var result = _transportDataAccess.DeleteBusroute(bus);
                    var returnValue = result > 0 ? true : false;
                    return returnValue;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool EditBusroute(Busroute busroute)
        {
            try
            {
                var bus = _transportDataAccess.SearchBusRouteById(busroute.Id);
                if (bus != null)
                {
                    bus.Name = busroute.Name;
                    bus.Description = busroute.Description;
                    bus.LocationId = busroute.LocationId;
                    bus.ModifiedDate = DateTime.UtcNow;
                    bus.ModifiedBy = _username;
                    var result = _transportDataAccess.EditBusroute(bus);
                    var returnValue = result > 0 ? true : false;
                    return returnValue;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool AddBusroute(Busroute busroute)
        {
            try
            {
                var bus = new DbModel.BusRoute
                {
                    Id = Guid.NewGuid(),
                    Name = busroute.Name,
                    Description = busroute.Description,
                    LocationId = busroute.LocationId,
                    StatusId = busroute.StatusId,
                    CreatedDate = DateTime.UtcNow,
                    CreatedBy = _username
                };
                var result = _transportDataAccess.AddBusroute(bus);
                var returnValue = result > 0 ? true : false;
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}